import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardSkeleton from './CardSkeleton.vue'

describe('CardSkeleton', () => {
  it('renders with default props', () => {
    const wrapper = mount(CardSkeleton)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders content lines by default', () => {
    const wrapper = mount(CardSkeleton)
    const lines = wrapper.findAll('.animate-pulse')
    expect(lines.length).toBeGreaterThanOrEqual(3)
  })

  it('does not show avatar by default', () => {
    const wrapper = mount(CardSkeleton)
    expect(wrapper.find('.rounded-full').exists()).toBe(false)
  })

  it('shows avatar when showAvatar is true', () => {
    const wrapper = mount(CardSkeleton, {
      props: { showAvatar: true },
    })
    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('does not show actions by default', () => {
    const wrapper = mount(CardSkeleton)
    const actions = wrapper.findAll('.h-8.w-20')
    expect(actions.length).toBe(0)
  })

  it('shows actions when showActions is true', () => {
    const wrapper = mount(CardSkeleton, {
      props: { showActions: true },
    })
    const actions = wrapper.findAll('.h-8.w-20')
    expect(actions.length).toBe(2)
  })

  it('renders custom number of lines', () => {
    const wrapper = mount(CardSkeleton, {
      props: { lines: 5 },
    })
    const contentLines = wrapper.findAll('.space-y-2 .h-4')
    expect(contentLines.length).toBe(5)
  })

  it('has card styling', () => {
    const wrapper = mount(CardSkeleton)
    expect(wrapper.find('.rounded-lg').exists()).toBe(true)
    expect(wrapper.find('.shadow-md').exists()).toBe(true)
  })

  it('has animate-pulse class for skeleton effect', () => {
    const wrapper = mount(CardSkeleton)
    expect(wrapper.findAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('supports dark mode classes', () => {
    const wrapper = mount(CardSkeleton)
    expect(wrapper.html()).toContain('dark:')
  })
})
