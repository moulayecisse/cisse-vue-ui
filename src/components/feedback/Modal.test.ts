import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'

describe('Modal', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders slot content', () => {
    const wrapper = mount(Modal, {
      slots: {
        default: 'Modal content',
      },
    })

    expect(wrapper.text()).toContain('Modal content')
  })

  it('renders title when provided', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Modal Title',
      },
    })

    expect(wrapper.text()).toContain('Modal Title')
  })

  it('renders header slot', () => {
    const wrapper = mount(Modal, {
      slots: {
        header: 'Custom Header',
      },
    })

    expect(wrapper.text()).toContain('Custom Header')
  })

  it('renders footer slot', () => {
    const wrapper = mount(Modal, {
      slots: {
        footer: '<button>Save</button>',
      },
    })

    expect(wrapper.text()).toContain('Save')
  })

  it('emits close on close button click', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
      },
    })

    // Find the close button (in header)
    const closeButton = wrapper.find('button[type="button"]')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close on backdrop click by default', async () => {
    const wrapper = mount(Modal)

    // Click the backdrop (the outer div)
    await wrapper.find('.fixed').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close on backdrop click when closeOnBackdrop is false', async () => {
    const wrapper = mount(Modal, {
      props: {
        closeOnBackdrop: false,
      },
    })

    await wrapper.find('.fixed').trigger('click')

    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('does not emit close when clicking modal content', async () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test',
      },
      slots: {
        default: '<div class="content">Content</div>',
      },
    })

    // Click the modal content, not the backdrop
    await wrapper.find('.bg-white').trigger('click')

    // Should not emit because click was not on backdrop
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'default', 'lg', 'xl', 'full'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Modal, {
        props: { size },
      })

      expect(wrapper.find('.bg-white').classes().some((c) => c.includes('max-w'))).toBe(true)
    })
  })

  it('locks body scroll on mount', () => {
    mount(Modal)

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('has close button with sr-only label for accessibility', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test',
        closeButtonLabel: 'Fermer',
      },
    })

    expect(wrapper.find('.sr-only').text()).toBe('Fermer')
  })

  it('emits close on Escape key', async () => {
    const wrapper = mount(Modal)

    // Simulate Escape key
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close on Escape when closeOnEscape is false', () => {
    const wrapper = mount(Modal, {
      props: {
        closeOnEscape: false,
      },
    })

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(wrapper.emitted('close')).toBeUndefined()
  })
})
