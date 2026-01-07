import { describe, it, expect } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import { reactive } from 'vue'
import ExpandableRow from './ExpandableRow.vue'
import { TableContextKey, type TableContext } from '../atoms/Table.vue'

type ExpandableRowProps = InstanceType<typeof ExpandableRow>['$props']

// Helper to wrap component with TableContext provider
function mountWithContext(
  options: Omit<MountingOptions<ExpandableRowProps>, 'global'> & {
    props?: Partial<ExpandableRowProps> & { colspan: number }
    slots?: Record<string, string>
    attrs?: Record<string, unknown>
  }
) {
  return mount(ExpandableRow, {
    ...options,
    global: {
      provide: {
        [TableContextKey as symbol]: reactive<TableContext>({
          striped: false,
          bordered: false,
          hover: true,
          compact: false,
          stickyHeader: false,
        }),
      },
    },
  })
}

describe('ExpandableRow', () => {
  const defaultProps = {
    colspan: 3,
  }

  it('renders main row with expand button', () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: { row: '<td>Cell Content</td>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').attributes('aria-label')).toBe('Toggle row details')
  })

  it('starts collapsed by default', () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).not.toContain('Expanded content')
  })

  it('respects defaultExpanded prop', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, defaultExpanded: true },
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Expanded content')
  })

  it('toggles expanded state on button click', async () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Expanded content')

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).not.toContain('Expanded content')
  })

  it('emits update:expanded when toggled', async () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: { row: '<td>Cell</td>' },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:expanded')).toBeTruthy()
    expect(wrapper.emitted('update:expanded')![0]).toEqual([true])
  })

  it('supports controlled expanded state', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, expanded: true },
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Expanded content')
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, disabled: true },
      slots: { row: '<td>Cell</td>' },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.emitted('update:expanded')).toBeFalsy()
  })

  it('disables button when row is disabled', () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, disabled: true },
      slots: { row: '<td>Cell</td>' },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('expands on row click when expandOnRowClick is true', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, expandOnRowClick: true },
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })

    // Click on the tr element
    await wrapper.find('tr').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })

  it('emits click event when row is clicked', async () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: { row: '<td>Cell</td>' },
    })

    await wrapper.find('tr').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies correct colspan to expanded content', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, colspan: 5, defaultExpanded: true },
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div>Expanded content</div>',
      },
    })
    await wrapper.vm.$nextTick()

    // Second row contains the expanded content
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBe(2)
    const expandedTd = rows[1].find('td')
    expect(expandedTd.attributes('colspan')).toBe('6') // colspan + 1 for expand button column
  })

  it('exposes toggle method and isExpanded', () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: { row: '<td>Cell</td>' },
    })

    const vm = wrapper.vm as unknown as { toggle: () => void; isExpanded: boolean }
    expect(typeof vm.toggle).toBe('function')
    expect(vm.isExpanded).toBe(false)
  })

  it('renders row slot content', () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      slots: { row: '<td class="custom-cell">Custom Content</td>' },
    })
    expect(wrapper.find('.custom-cell').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Content')
  })

  it('renders expanded slot content when expanded', async () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, defaultExpanded: true },
      slots: {
        row: '<td>Cell</td>',
        expanded: '<div class="expanded-content">Details here</div>',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.expanded-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Details here')
  })

  it('passes through additional attributes', () => {
    const wrapper = mountWithContext({
      props: defaultProps,
      attrs: { 'data-row-id': '123' },
      slots: { row: '<td>Cell</td>' },
    })
    expect(wrapper.find('tr').attributes('data-row-id')).toBe('123')
  })

  it('applies selected state to main row', () => {
    const wrapper = mountWithContext({
      props: { ...defaultProps, selected: true },
      slots: { row: '<td>Cell</td>' },
    })
    expect(wrapper.find('tr').classes()).toContain('bg-primary-50')
  })
})
