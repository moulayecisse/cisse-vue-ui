import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsCard from './StatsCard.vue'

describe('StatsCard', () => {
  it('renders label and value', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100 },
    })

    expect(wrapper.text()).toContain('Users')
    expect(wrapper.text()).toContain('100')
  })

  it('renders string value', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Revenue', value: '$1,234' },
    })

    expect(wrapper.text()).toContain('$1,234')
  })

  it('renders icon when provided', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users' },
    })

    expect(wrapper.find('.size-10').exists()).toBe(true)
  })

  it('does not render icon when not provided', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100 },
    })

    // Only the container should exist, no icon wrapper
    expect(wrapper.find('.size-10').exists()).toBe(false)
  })

  it('renders positive change indicator', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, change: 12 },
    })

    expect(wrapper.text()).toContain('+12%')
  })

  it('renders negative change indicator', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, change: -5 },
    })

    expect(wrapper.text()).toContain('-5%')
  })

  it('renders change label when provided', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, change: 10, changeLabel: 'vs last month' },
    })

    expect(wrapper.text()).toContain('vs last month')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100 },
    })

    expect(wrapper.find('.bg-white').exists()).toBe(true)
  })

  it('applies glass variant classes', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, variant: 'glass' },
    })

    expect(wrapper.find('.backdrop-blur-sm').exists()).toBe(true)
  })

  it('applies solid variant classes', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, variant: 'solid', color: 'primary' },
    })

    expect(wrapper.find('.bg-primary-500').exists()).toBe(true)
  })

  it('applies outline variant classes', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100, variant: 'outline' },
    })

    expect(wrapper.find('.border-2').exists()).toBe(true)
  })

  it('renders value slot content', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100 },
      slots: {
        value: '<span class="custom-value">Custom</span>',
      },
    })

    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  it('renders label slot content', () => {
    const wrapper = mount(StatsCard, {
      props: { label: 'Users', value: 100 },
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
      },
    })

    expect(wrapper.find('.custom-label').exists()).toBe(true)
  })
})
