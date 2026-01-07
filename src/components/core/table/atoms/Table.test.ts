import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table, { TableContextKey } from './Table.vue'
import { inject, defineComponent, h } from 'vue'

// Helper component to test context injection
const ContextConsumer = defineComponent({
  setup() {
    const context = inject(TableContextKey)
    return { context }
  },
  render() {
    return h('div', { class: 'context-consumer' }, JSON.stringify(this.context))
  },
})

describe('Table', () => {
  it('renders table element', () => {
    const wrapper = mount(Table)
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Table, {
      slots: {
        default: '<tr><td>Content</td></tr>',
      },
    })
    expect(wrapper.text()).toContain('Content')
  })

  it('applies default classes', () => {
    const wrapper = mount(Table)
    const table = wrapper.find('table')
    expect(table.classes()).toContain('w-full')
    expect(table.classes()).toContain('text-left')
  })

  it('applies bordered class when bordered=true', () => {
    const wrapper = mount(Table, {
      props: { bordered: true },
    })
    const table = wrapper.find('table')
    expect(table.classes()).toContain('border')
  })

  it('applies sticky header wrapper when stickyHeader=true', () => {
    const wrapper = mount(Table, {
      props: { stickyHeader: true },
    })
    const wrapperDiv = wrapper.find('div')
    expect(wrapperDiv.classes()).toContain('max-h-[600px]')
    expect(wrapperDiv.classes()).toContain('overflow-y-auto')
  })

  it('provides context to children', () => {
    const wrapper = mount(Table, {
      props: {
        striped: true,
        bordered: true,
        hover: false,
        compact: true,
        stickyHeader: true,
      },
      slots: {
        default: () => h(ContextConsumer),
      },
    })

    const contextText = wrapper.find('.context-consumer').text()
    const context = JSON.parse(contextText)

    expect(context.striped).toBe(true)
    expect(context.bordered).toBe(true)
    expect(context.hover).toBe(false)
    expect(context.compact).toBe(true)
    expect(context.stickyHeader).toBe(true)
  })

  it('uses default values for props', () => {
    const wrapper = mount(Table, {
      slots: {
        default: () => h(ContextConsumer),
      },
    })

    const contextText = wrapper.find('.context-consumer').text()
    const context = JSON.parse(contextText)

    expect(context.striped).toBe(false)
    expect(context.bordered).toBe(false)
    expect(context.hover).toBe(true) // default is true
    expect(context.compact).toBe(false)
    expect(context.stickyHeader).toBe(false)
  })

  it('wraps table in scrollable container', () => {
    const wrapper = mount(Table)
    expect(wrapper.find('.overflow-x-auto').exists()).toBe(true)
  })
})
