import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ResponsiveList from './ResponsiveList.vue'

// Mock @vueuse/core breakpoints
vi.mock('@vueuse/core', () => ({
  useBreakpoints: () => ({
    greaterOrEqual: () => ({ value: true }), // Always desktop by default
  }),
}))

const mockItems = [
  { id: 1, name: 'John', email: 'john@test.com' },
  { id: 2, name: 'Jane', email: 'jane@test.com' },
]

const mockColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
]

describe('ResponsiveList', () => {
  it('renders container div', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
    })

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders DataTable in desktop view', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
    })

    // Desktop view shows DataTable inside CardComponent
    expect(wrapper.findComponent({ name: 'DataTable' }).exists()).toBe(true)
  })

  it('passes items to table', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
    })

    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('Jane')
  })

  it('renders column headers', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
  })

  it('renders actions slot', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
      slots: {
        actions: '<button class="action-btn">Edit</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('renders empty slot when no items', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: [],
        columns: mockColumns,
      },
      slots: {
        empty: '<div class="empty-state">No data</div>',
      },
    })

    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  describe('selection', () => {
    it('enables selection when selectable=true', () => {
      const wrapper = mount(ResponsiveList, {
        props: {
          items: mockItems,
          columns: mockColumns,
          selectable: true,
        },
      })

      // Should have checkboxes
      expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBeGreaterThan(0)
    })

    it('emits select event', async () => {
      const wrapper = mount(ResponsiveList, {
        props: {
          items: mockItems,
          columns: mockColumns,
          selectable: true,
        },
      })

      const table = wrapper.findComponent({ name: 'DataTable' })
      await table.vm.$emit('select', '1')

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')![0]).toEqual(['1'])
    })

    it('emits selectAll event', async () => {
      const wrapper = mount(ResponsiveList, {
        props: {
          items: mockItems,
          columns: mockColumns,
          selectable: true,
        },
      })

      const table = wrapper.findComponent({ name: 'DataTable' })
      await table.vm.$emit('selectAll')

      expect(wrapper.emitted('selectAll')).toBeTruthy()
    })
  })

  it('supports column name alias for key', () => {
    const columnsWithName = [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
    ]

    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: columnsWithName,
      },
    })

    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('john@test.com')
  })

  it('uses custom keyField', () => {
    const customItems = [
      { id: 'a', customId: 'a', name: 'Item A' },
      { id: 'b', customId: 'b', name: 'Item B' },
    ]

    const wrapper = mount(ResponsiveList, {
      props: {
        items: customItems,
        columns: [{ key: 'name', label: 'Name' }],
        keyField: 'customId',
      },
    })

    expect(wrapper.text()).toContain('Item A')
    expect(wrapper.text()).toContain('Item B')
  })

  it('wraps table in CardComponent', () => {
    const wrapper = mount(ResponsiveList, {
      props: {
        items: mockItems,
        columns: mockColumns,
      },
    })

    expect(wrapper.findComponent({ name: 'CardComponent' }).exists()).toBe(true)
  })
})
