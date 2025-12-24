import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastContainer from './ToastContainer.vue'

const mockToasts = [
  { id: '1', message: 'First toast', type: 'success' as const },
  { id: '2', message: 'Second toast', type: 'error' as const },
  { id: '3', message: 'Third toast', type: 'info' as const },
]

// ToastContainer uses Teleport, so we need to test with attachTo: document.body
// and query document.body for teleported content
describe('ToastContainer', () => {
  it('renders toasts via teleport', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: mockToasts,
      },
      attachTo: document.body,
    })

    // Content is teleported to body
    expect(document.body.textContent).toContain('First toast')
    expect(document.body.textContent).toContain('Second toast')
    expect(document.body.textContent).toContain('Third toast')

    wrapper.unmount()
  })

  it('renders correct number of toasts', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: mockToasts,
      },
      attachTo: document.body,
    })

    const toastElements = document.body.querySelectorAll('[role="alert"]')
    expect(toastElements.length).toBe(3)

    wrapper.unmount()
  })

  it('renders empty when no toasts', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [],
      },
      attachTo: document.body,
    })

    const toastElements = document.body.querySelectorAll('[role="alert"]')
    expect(toastElements.length).toBe(0)

    wrapper.unmount()
  })

  it('emits close with toast id when toast is closed', async () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [{ id: 'test-id', message: 'Test' }],
      },
      attachTo: document.body,
    })

    const closeButton = document.body.querySelector('[role="alert"] button')
    closeButton?.dispatchEvent(new Event('click'))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')![0]).toEqual(['test-id'])

    wrapper.unmount()
  })

  describe('positions', () => {
    it('applies top-right position by default', () => {
      const wrapper = mount(ToastContainer, {
        props: { toasts: [] },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('right-4')).toBe(true)

      wrapper.unmount()
    })

    it('applies top-left position', () => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position: 'top-left',
        },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('left-4')).toBe(true)

      wrapper.unmount()
    })

    it('applies bottom-right position', () => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position: 'bottom-right',
        },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('bottom-4')).toBe(true)
      expect(container?.classList.contains('right-4')).toBe(true)

      wrapper.unmount()
    })

    it('applies bottom-left position', () => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position: 'bottom-left',
        },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('bottom-4')).toBe(true)
      expect(container?.classList.contains('left-4')).toBe(true)

      wrapper.unmount()
    })

    it('applies top-center position', () => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position: 'top-center',
        },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('left-1/2')).toBe(true)
      expect(container?.classList.contains('-translate-x-1/2')).toBe(true)

      wrapper.unmount()
    })

    it('applies bottom-center position', () => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position: 'bottom-center',
        },
        attachTo: document.body,
      })

      const container = document.body.querySelector('.fixed')
      expect(container?.classList.contains('bottom-4')).toBe(true)
      expect(container?.classList.contains('left-1/2')).toBe(true)
      expect(container?.classList.contains('-translate-x-1/2')).toBe(true)

      wrapper.unmount()
    })
  })

  it('has high z-index for visibility', () => {
    const wrapper = mount(ToastContainer, {
      props: { toasts: [] },
      attachTo: document.body,
    })

    const container = document.body.querySelector('.fixed')
    expect(container?.classList.contains('z-9999')).toBe(true)

    wrapper.unmount()
  })

  it('passes correct props to Toast components', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [
          {
            id: '1',
            message: 'Test message',
            type: 'warning' as const,
            title: 'Warning Title',
            duration: 3000,
          },
        ],
      },
      attachTo: document.body,
    })

    // Verify toast content is rendered correctly
    expect(document.body.textContent).toContain('Test message')
    expect(document.body.textContent).toContain('Warning Title')

    // Verify warning type styling (yellow)
    const toast = document.body.querySelector('[role="alert"]')
    expect(toast?.classList.toString()).toContain('yellow')

    wrapper.unmount()
  })
})
