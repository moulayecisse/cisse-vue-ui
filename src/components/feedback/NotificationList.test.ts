import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationList from './NotificationList.vue'

const mockNotifications = [
  { id: '1', type: 'success' as const, title: 'Success', message: 'Operation successful' },
  { id: '2', type: 'error' as const, title: 'Error', message: 'Something went wrong' },
  { id: '3', type: 'info' as const, title: 'Info', message: 'FYI' },
]

describe('NotificationList', () => {

  it('renders all notifications', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    expect(wrapper.text()).toContain('Success')
    expect(wrapper.text()).toContain('Error')
    expect(wrapper.text()).toContain('Info')
  })

  it('renders empty when no notifications', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: [] },
    })

    expect(wrapper.findAllComponents({ name: 'NotificationComponent' }).length).toBe(0)
  })

  it('emits dismiss when notification dismissed', async () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    // Click dismiss on first notification
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('dismiss')).toBeTruthy()
    expect(wrapper.emitted('dismiss')![0]).toEqual(['1'])
  })

  it('accepts autoDismiss prop', () => {
    const wrapper = mount(NotificationList, {
      props: {
        notifications: mockNotifications,
        autoDismiss: false,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts duration prop', () => {
    const wrapper = mount(NotificationList, {
      props: {
        notifications: [mockNotifications[0]],
        duration: 2000,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('has fixed positioning', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('positions in top right', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    expect(wrapper.find('.top-5').exists()).toBe(true)
    expect(wrapper.find('.right-5').exists()).toBe(true)
  })

  it('has high z-index', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    expect(wrapper.find('.z-50').exists()).toBe(true)
  })

  it('has vertical flex layout with gap', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    expect(wrapper.find('.flex-col').exists()).toBe(true)
    expect(wrapper.find('.gap-3').exists()).toBe(true)
  })

  it('renders NotificationComponent for each notification', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: mockNotifications },
    })

    const components = wrapper.findAllComponents({ name: 'NotificationComponent' })
    expect(components.length).toBe(3)
  })
})
