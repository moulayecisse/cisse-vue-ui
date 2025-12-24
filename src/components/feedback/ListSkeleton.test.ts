import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ListSkeleton from './ListSkeleton.vue'

describe('ListSkeleton', () => {
  it('renders with default props', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders 5 items by default', () => {
    const wrapper = mount(ListSkeleton)
    const items = wrapper.findAll('.py-4')
    expect(items.length).toBe(5)
  })

  it('renders custom number of items', () => {
    const wrapper = mount(ListSkeleton, {
      props: { items: 3 },
    })
    const items = wrapper.findAll('.py-4')
    expect(items.length).toBe(3)
  })

  it('shows avatar by default', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('hides avatar when showAvatar is false', () => {
    const wrapper = mount(ListSkeleton, {
      props: { showAvatar: false },
    })
    expect(wrapper.find('.rounded-full').exists()).toBe(false)
  })

  it('shows secondary text by default', () => {
    const wrapper = mount(ListSkeleton)
    const secondaryLines = wrapper.findAll('.h-3')
    expect(secondaryLines.length).toBeGreaterThan(0)
  })

  it('hides secondary text when showSecondary is false', () => {
    const wrapper = mount(ListSkeleton, {
      props: { showSecondary: false },
    })
    const secondaryLines = wrapper.findAll('.h-3')
    expect(secondaryLines.length).toBe(0)
  })

  it('does not show action by default', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.find('.w-8.h-8').exists()).toBe(false)
  })

  it('shows action when showAction is true', () => {
    const wrapper = mount(ListSkeleton, {
      props: { showAction: true },
    })
    expect(wrapper.find('.w-8.h-8').exists()).toBe(true)
  })

  it('has dividers between items', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.find('.divide-y').exists()).toBe(true)
  })

  it('has animate-pulse class for skeleton effect', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.findAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('supports dark mode classes', () => {
    const wrapper = mount(ListSkeleton)
    expect(wrapper.html()).toContain('dark:')
  })
})
