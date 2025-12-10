import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from './Toast.vue'

describe('Toast', () => {
  it('renders toast message', () => {
    const wrapper = mount(Toast, {
      props: {
        message: 'Test message',
      },
    })

    expect(wrapper.text()).toContain('Test message')
  })

  it('renders title when provided', () => {
    const wrapper = mount(Toast, {
      props: {
        message: 'Message',
        title: 'Toast Title',
      },
    })

    expect(wrapper.text()).toContain('Toast Title')
    expect(wrapper.text()).toContain('Message')
  })

  it('has role="alert"', () => {
    const wrapper = mount(Toast, {
      props: { message: 'Alert' },
    })

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('renders close button by default', () => {
    const wrapper = mount(Toast, {
      props: { message: 'Test' },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('hides close button when closable is false', () => {
    const wrapper = mount(Toast, {
      props: {
        message: 'Test',
        closable: false,
      },
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('emits close when close button clicked', async () => {
    const wrapper = mount(Toast, {
      props: {
        message: 'Test',
        closable: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')!.length).toBe(1)
  })

  describe('types', () => {
    it('applies success styling', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Success!',
          type: 'success',
        },
      })

      const container = wrapper.find('[role="alert"]')
      expect(container.classes().some(c => c.includes('green'))).toBe(true)
    })

    it('applies error styling', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Error!',
          type: 'error',
        },
      })

      const container = wrapper.find('[role="alert"]')
      expect(container.classes().some(c => c.includes('red'))).toBe(true)
    })

    it('applies warning styling', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Warning!',
          type: 'warning',
        },
      })

      const container = wrapper.find('[role="alert"]')
      expect(container.classes().some(c => c.includes('yellow'))).toBe(true)
    })

    it('applies info styling (default)', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Info',
          type: 'info',
        },
      })

      const container = wrapper.find('[role="alert"]')
      expect(container.classes().some(c => c.includes('blue'))).toBe(true)
    })

    it('defaults to info type', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Default',
        },
      })

      const container = wrapper.find('[role="alert"]')
      expect(container.classes().some(c => c.includes('blue'))).toBe(true)
    })
  })

  describe('auto-close', () => {
    it('emits close after duration', async () => {
      vi.useFakeTimers()

      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          duration: 3000,
        },
      })

      expect(wrapper.emitted('close')).toBeFalsy()

      vi.advanceTimersByTime(3000)

      expect(wrapper.emitted('close')).toBeTruthy()

      vi.useRealTimers()
    })

    it('uses default duration of 5000ms', async () => {
      vi.useFakeTimers()

      const wrapper = mount(Toast, {
        props: { message: 'Test' },
      })

      vi.advanceTimersByTime(4999)
      expect(wrapper.emitted('close')).toBeFalsy()

      vi.advanceTimersByTime(1)
      expect(wrapper.emitted('close')).toBeTruthy()

      vi.useRealTimers()
    })

    it('does not auto-close when duration is 0', async () => {
      vi.useFakeTimers()

      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          duration: 0,
        },
      })

      vi.advanceTimersByTime(10000)

      expect(wrapper.emitted('close')).toBeFalsy()

      vi.useRealTimers()
    })
  })
})
