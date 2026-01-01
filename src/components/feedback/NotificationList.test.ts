import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationList from './NotificationList.vue'

const mockNotifications = [
  { id: '1', type: 'success' as const, title: 'Success', message: 'Operation successful' },
  { id: '2', type: 'error' as const, title: 'Error', message: 'Something went wrong' },
  { id: '3', type: 'info' as const, title: 'Info', message: 'FYI' },
]

describe('NotificationList', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders all notifications', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Success')
    expect(document.body.textContent).toContain('Error')
    expect(document.body.textContent).toContain('Info')
  })

  it('renders empty when no notifications', () => {
    mount(NotificationList, {
      props: { notifications: [] },
      attachTo: document.body,
    })

    // Teleported content should have no notification components
    const container = document.body.querySelector('.fixed')
    expect(container?.querySelectorAll('.max-w-md').length ?? 0).toBe(0)
  })

  it('emits dismiss when notification dismissed', async () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    // Click dismiss on first notification (in teleported content)
    const button = document.body.querySelector('button')
    button?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('dismiss')).toBeTruthy()
    expect(wrapper.emitted('dismiss')![0]).toEqual(['1'])
  })

  it('accepts autoDismiss prop', () => {
    const wrapper = mount(NotificationList, {
      props: {
        notifications: mockNotifications,
        autoDismiss: false,
      },
      attachTo: document.body,
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts duration prop', () => {
    const wrapper = mount(NotificationList, {
      props: {
        notifications: [mockNotifications[0]],
        duration: 2000,
      },
      attachTo: document.body,
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('has fixed positioning', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    expect(document.body.querySelector('.fixed')).not.toBeNull()
  })

  it('positions in top right', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    const container = document.body.querySelector('.fixed')
    expect(container?.classList.contains('top-5')).toBe(true)
    expect(container?.classList.contains('right-5')).toBe(true)
  })

  it('has high z-index', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    const container = document.body.querySelector('.fixed')
    expect(container?.classList.contains('z-50')).toBe(true)
  })

  it('has vertical flex layout with gap', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    const container = document.body.querySelector('.fixed')
    expect(container?.classList.contains('flex-col')).toBe(true)
    expect(container?.classList.contains('gap-3')).toBe(true)
  })

  it('renders NotificationComponent for each notification', () => {
    mount(NotificationList, {
      props: { notifications: mockNotifications },
      attachTo: document.body,
    })

    // Check for notification components in teleported content
    const notifications = document.body.querySelectorAll('.max-w-md')
    expect(notifications.length).toBe(3)
  })
})
