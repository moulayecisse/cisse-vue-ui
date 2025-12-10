import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationComponent from './NotificationComponent.vue'

const mockNotification = {
  id: 'notif-1',
  type: 'info' as const,
  title: 'Info Title',
  message: 'Info message content',
}

describe('NotificationComponent', () => {

  it('renders notification title', () => {
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    expect(wrapper.text()).toContain('Info Title')
  })

  it('renders notification message', () => {
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    expect(wrapper.text()).toContain('Info message content')
  })

  it('does not render title when not provided', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: { id: '1', type: 'info' as const, message: 'Message only' },
      },
    })

    expect(wrapper.find('h4').exists()).toBe(false)
    expect(wrapper.text()).toContain('Message only')
  })

  it('does not render message when not provided', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: { id: '1', type: 'info' as const, title: 'Title only', message: '' },
      },
    })

    expect(wrapper.text()).toContain('Title only')
  })

  describe('notification types', () => {
    it('shows success icon and colors', () => {
      const wrapper = mount(NotificationComponent, {
        props: {
          notification: { ...mockNotification, type: 'success' },
        },
      })

      expect(wrapper.find('.text-green-600').exists()).toBe(true)
    })

    it('shows error icon and colors', () => {
      const wrapper = mount(NotificationComponent, {
        props: {
          notification: { ...mockNotification, type: 'error' },
        },
      })

      expect(wrapper.find('.text-red-600').exists()).toBe(true)
    })

    it('shows warning icon and colors', () => {
      const wrapper = mount(NotificationComponent, {
        props: {
          notification: { ...mockNotification, type: 'warning' },
        },
      })

      expect(wrapper.find('.text-yellow-600').exists()).toBe(true)
    })

    it('shows info icon and colors', () => {
      const wrapper = mount(NotificationComponent, {
        props: {
          notification: { ...mockNotification, type: 'info' },
        },
      })

      expect(wrapper.find('.text-blue-600').exists()).toBe(true)
    })
  })

  it('emits dismiss when close button clicked', async () => {
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('dismiss')).toBeTruthy()
    expect(wrapper.emitted('dismiss')![0]).toEqual(['notif-1'])
  })

  it('mounts without error', () => {
    // Tests that auto-dismiss timer is set up without throwing
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts custom duration prop', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: mockNotification,
        duration: 3000,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts duration in notification object', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: { ...mockNotification, duration: 2000 },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts autoDismiss=false prop', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: mockNotification,
        autoDismiss: false,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts duration=0 in notification', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: { ...mockNotification, duration: 0 },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('has close button', () => {
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has shadow and rounded corners', () => {
    const wrapper = mount(NotificationComponent, {
      props: { notification: mockNotification },
    })

    expect(wrapper.find('.shadow-lg').exists()).toBe(true)
    expect(wrapper.find('.rounded-lg').exists()).toBe(true)
  })
})
