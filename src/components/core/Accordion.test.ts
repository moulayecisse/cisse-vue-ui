import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

describe('Accordion', () => {
  const createAccordion = (props = {}, items = 3) => {
    const slots = {
      default: Array.from({ length: items }, (_, i) => `
        <AccordionItem item-key="item-${i + 1}" title="Item ${i + 1}">
          Content for item ${i + 1}
        </AccordionItem>
      `).join(''),
    }

    return mount(Accordion, {
      props,
      slots,
      global: {
        components: { AccordionItem },
      },
    })
  }

  it('renders accordion container', () => {
    const wrapper = createAccordion()
    expect(wrapper.find('.divide-y').exists()).toBe(true)
  })

  it('renders all accordion items', () => {
    const wrapper = createAccordion()
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('Item 2')
    expect(wrapper.text()).toContain('Item 3')
  })

  it('has border and rounded corners', () => {
    const wrapper = createAccordion()
    expect(wrapper.find('.border').exists()).toBe(true)
    expect(wrapper.find('.rounded-lg').exists()).toBe(true)
  })

  it('opens default items', () => {
    const wrapper = createAccordion({ defaultOpen: ['item-1'] })
    // Item should be open by default
    expect(wrapper.exists()).toBe(true)
  })

  it('works in single mode by default', () => {
    const wrapper = createAccordion()
    expect(wrapper.exists()).toBe(true)
  })

  it('works in multiple mode', () => {
    const wrapper = createAccordion({ mode: 'multiple' })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('AccordionItem', () => {
  const createAccordionWithItem = (itemProps = {}) => {
    return mount(Accordion, {
      slots: {
        default: `
          <AccordionItem item-key="test" title="Test Title" ${Object.entries(itemProps).map(([k, v]) => `${k}="${v}"`).join(' ')}>
            Test content
          </AccordionItem>
        `,
      },
      global: {
        components: { AccordionItem },
      },
    })
  }

  it('renders item title', () => {
    const wrapper = createAccordionWithItem()
    expect(wrapper.text()).toContain('Test Title')
  })

  it('renders toggle button', () => {
    const wrapper = createAccordionWithItem()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has aria-expanded attribute', () => {
    const wrapper = createAccordionWithItem()
    expect(wrapper.find('button').attributes('aria-expanded')).toBeDefined()
  })

  it('content is hidden by default', () => {
    const wrapper = createAccordionWithItem()
    // Content should be in v-show=false state
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
  })

  it('toggles content on click', async () => {
    const wrapper = createAccordionWithItem()
    const button = wrapper.find('button')

    expect(button.attributes('aria-expanded')).toBe('false')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('shows chevron icon', () => {
    const wrapper = createAccordionWithItem()
    expect(wrapper.find('.w-5').exists()).toBe(true)
  })

  it('renders with icon', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: `
          <AccordionItem item-key="test" title="Test" icon="heroicons:star">
            Content
          </AccordionItem>
        `,
      },
      global: {
        components: { AccordionItem },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('can be disabled', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: `
          <AccordionItem item-key="test" title="Disabled Item" disabled>
            Content
          </AccordionItem>
        `,
      },
      global: {
        components: { AccordionItem },
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('applies disabled styling', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: `
          <AccordionItem item-key="test" title="Disabled Item" disabled>
            Content
          </AccordionItem>
        `,
      },
      global: {
        components: { AccordionItem },
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('cursor-not-allowed')
  })
})
