import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableFooter from './TableFooter.vue'

describe('TableFooter', () => {
  it('renders tr element', () => {
    const wrapper = mount(TableFooter, {
      props: { colSpan: 3 },
    })
    expect(wrapper.find('tr').exists()).toBe(true)
  })

  it('renders td element', () => {
    const wrapper = mount(TableFooter, {
      props: { colSpan: 5 },
    })

    const td = wrapper.find('td')
    expect(td.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(TableFooter, {
      props: { colSpan: 3 },
      slots: {
        default: '<span class="footer-content">Total: 100</span>',
      },
    })

    expect(wrapper.find('.footer-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Total: 100')
  })

  it('renders without colSpan prop', () => {
    const wrapper = mount(TableFooter)

    const td = wrapper.find('td')
    expect(td.exists()).toBe(true)
  })

  it('applies centered text by default', () => {
    const wrapper = mount(TableFooter, {
      props: { colSpan: 3 },
    })

    const td = wrapper.find('td')
    expect(td.classes()).toContain('text-center')
  })

  it('can render complex slot content', () => {
    const wrapper = mount(TableFooter, {
      props: { colSpan: 4 },
      slots: {
        default: `
          <div class="pagination">
            <button>Previous</button>
            <span>Page 1 of 10</span>
            <button>Next</button>
          </div>
        `,
      },
    })

    expect(wrapper.find('.pagination').exists()).toBe(true)
    expect(wrapper.text()).toContain('Page 1 of 10')
  })
})
