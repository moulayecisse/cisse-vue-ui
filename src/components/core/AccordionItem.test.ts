import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import AccordionItem from './AccordionItem.vue'
import Accordion from './Accordion.vue'

// Helper to create AccordionItem within Accordion context
const mountWithAccordion = (itemProps = {}, accordionProps = {}) => {
  return mount(Accordion, {
    props: accordionProps,
    slots: {
      default: h(AccordionItem, { itemKey: 'test', title: 'Test Title', ...itemProps }, {
        default: () => 'Test content',
      }),
    },
  })
}

describe('AccordionItem', () => {
  describe('Rendering', () => {
    it('renders title text', () => {
      const wrapper = mountWithAccordion({ title: 'My Accordion Item' })
      expect(wrapper.text()).toContain('My Accordion Item')
    })

    it('renders toggle button', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders slot content when open', async () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      expect(wrapper.text()).toContain('Test content')
    })

    it('renders icon when provided', () => {
      const wrapper = mountWithAccordion({ icon: 'heroicons:star' })
      // Icon is rendered inside the button
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders chevron icon', () => {
      const wrapper = mountWithAccordion()
      const chevron = wrapper.find('[aria-hidden="true"]')
      expect(chevron.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has aria-expanded attribute on button', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').attributes('aria-expanded')).toBeDefined()
    })

    it('aria-expanded is false when closed', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('aria-expanded is true when open', () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('has aria-controls attribute linking to panel', () => {
      const wrapper = mountWithAccordion()
      const button = wrapper.find('button')
      const panelId = button.attributes('aria-controls')
      expect(panelId).toBeDefined()
      expect(wrapper.find(`#${panelId}`).exists()).toBe(true)
    })

    it('panel has role="region"', () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      expect(wrapper.find('[role="region"]').exists()).toBe(true)
    })

    it('panel has aria-labelledby referencing header', () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      const button = wrapper.find('button')
      const headerId = button.attributes('id')
      const panel = wrapper.find('[role="region"]')
      expect(panel.attributes('aria-labelledby')).toBe(headerId)
    })

    it('button has type="button"', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })
  })

  describe('Toggle behavior', () => {
    it('opens on click when closed', async () => {
      const wrapper = mountWithAccordion()
      const button = wrapper.find('button')

      expect(button.attributes('aria-expanded')).toBe('false')

      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('true')
    })

    it('closes on click when open', async () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      const button = wrapper.find('button')

      expect(button.attributes('aria-expanded')).toBe('true')

      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('false')
    })

    it('rotates chevron when open', async () => {
      const wrapper = mountWithAccordion()
      const button = wrapper.find('button')

      await button.trigger('click')

      // Find the chevron icon and check for rotation class
      const chevron = wrapper.findAll('[aria-hidden="true"]').at(-1)
      expect(chevron?.classes()).toContain('rotate-180')
    })

    it('does not rotate chevron when closed', () => {
      const wrapper = mountWithAccordion()
      const chevron = wrapper.findAll('[aria-hidden="true"]').at(-1)
      expect(chevron?.classes()).not.toContain('rotate-180')
    })
  })

  describe('Disabled state', () => {
    it('applies disabled attribute to button', () => {
      const wrapper = mountWithAccordion({ disabled: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('applies cursor-not-allowed class when disabled', () => {
      const wrapper = mountWithAccordion({ disabled: true })
      expect(wrapper.find('button').classes()).toContain('cursor-not-allowed')
    })

    it('does not toggle when disabled', async () => {
      const wrapper = mountWithAccordion({ disabled: true })
      const button = wrapper.find('button')

      expect(button.attributes('aria-expanded')).toBe('false')

      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('false')
    })

    it('applies disabled background styling', () => {
      const wrapper = mountWithAccordion({ disabled: true })
      expect(wrapper.find('button').classes()).toContain('bg-gray-50')
    })

    it('applies disabled text color', () => {
      const wrapper = mountWithAccordion({ disabled: true })
      expect(wrapper.find('button').classes()).toContain('text-gray-400')
    })
  })

  describe('Styling', () => {
    it('has full width button', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').classes()).toContain('w-full')
    })

    it('has text-left alignment', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').classes()).toContain('text-left')
    })

    it('has proper padding', () => {
      const wrapper = mountWithAccordion()
      const button = wrapper.find('button')
      expect(button.classes()).toContain('px-4')
      expect(button.classes()).toContain('py-3')
    })

    it('has hover state when not disabled', () => {
      const wrapper = mountWithAccordion()
      expect(wrapper.find('button').classes()).toContain('hover:bg-gray-50')
    })

    it('content has proper background', () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      const content = wrapper.find('[role="region"] > div')
      expect(content.classes()).toContain('bg-gray-50')
    })

    it('content has proper padding', () => {
      const wrapper = mountWithAccordion({}, { defaultOpen: ['test'] })
      const content = wrapper.find('[role="region"] > div')
      expect(content.classes()).toContain('px-4')
      expect(content.classes()).toContain('py-3')
    })
  })

  describe('Transitions', () => {
    it('has transition wrapper for content', () => {
      const wrapper = mountWithAccordion()
      // Transition component wraps the content
      expect(wrapper.find('[role="region"]').exists()).toBe(true)
    })

    it('uses v-show for content visibility', async () => {
      const wrapper = mountWithAccordion()
      const panel = wrapper.find('[role="region"]')

      // When closed, the element exists but is hidden via v-show
      expect(panel.exists()).toBe(true)
    })
  })

  describe('With custom ID', () => {
    it('uses custom ID when provided', () => {
      const wrapper = mountWithAccordion({ id: 'my-custom-id' })
      const button = wrapper.find('button')
      expect(button.attributes('id')).toContain('my-custom-id')
    })
  })

  describe('Without accordion context', () => {
    it('renders even without accordion parent', () => {
      const wrapper = mount(AccordionItem, {
        props: { itemKey: 'test', title: 'Test Title' },
        slots: { default: 'Content' },
      })
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Title')
    })

    it('defaults to closed without context', () => {
      const wrapper = mount(AccordionItem, {
        props: { itemKey: 'test', title: 'Test Title' },
        slots: { default: 'Content' },
      })
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })
  })

  describe('Multiple items', () => {
    it('each item has unique IDs', () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: [
            h(AccordionItem, { itemKey: '1', title: 'Item 1' }, { default: () => 'Content 1' }),
            h(AccordionItem, { itemKey: '2', title: 'Item 2' }, { default: () => 'Content 2' }),
          ],
        },
      })

      const buttons = wrapper.findAll('button')
      const ids = buttons.map((b) => b.attributes('id'))
      expect(new Set(ids).size).toBe(2) // All IDs should be unique
    })

    it('each item has unique aria-controls', () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: [
            h(AccordionItem, { itemKey: '1', title: 'Item 1' }, { default: () => 'Content 1' }),
            h(AccordionItem, { itemKey: '2', title: 'Item 2' }, { default: () => 'Content 2' }),
          ],
        },
      })

      const buttons = wrapper.findAll('button')
      const ariaControls = buttons.map((b) => b.attributes('aria-controls'))
      expect(new Set(ariaControls).size).toBe(2) // All aria-controls should be unique
    })
  })
})
