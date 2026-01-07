import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatItem from './StatItem.vue'

describe('StatItem', () => {
  it('renders label and value', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
    })

    expect(wrapper.text()).toContain('Users')
    expect(wrapper.text()).toContain('100')
  })

  it('renders string value', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Revenue', value: '$1,234' },
    })

    expect(wrapper.text()).toContain('$1,234')
  })

  it('renders icon when provided', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users' },
    })

    // Icon wrapper should exist
    expect(wrapper.find('.rounded-xl').exists()).toBe(true)
  })

  it('does not render icon when not provided', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
    })

    // No icon-specific classes should be present on a child div
    const iconWrapper = wrapper.findAll('.size-10').filter(el => el.classes().includes('rounded-xl'))
    expect(iconWrapper.length).toBe(0)
  })

  it('renders positive change indicator', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, change: 12 },
    })

    expect(wrapper.text()).toContain('+12%')
  })

  it('renders negative change indicator', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, change: -5 },
    })

    expect(wrapper.text()).toContain('-5%')
  })

  it('renders change label when provided', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, change: 10, changeLabel: 'vs last month' },
    })

    expect(wrapper.text()).toContain('vs last month')
  })

  it('renders value slot content', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
      slots: {
        value: '<span class="custom-value">Custom</span>',
      },
    })

    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  it('renders label slot content', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
      },
    })

    expect(wrapper.find('.custom-label').exists()).toBe(true)
  })

  // New tests for additional features

  it('renders with small size', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, size: 'sm' },
    })

    expect(wrapper.find('.text-xl').exists()).toBe(true)
  })

  it('renders with large size', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, size: 'lg' },
    })

    expect(wrapper.find('.text-3xl').exists()).toBe(true)
  })

  it('renders icon on the left', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', iconPosition: 'left' },
    })

    expect(wrapper.find('.flex-row').exists()).toBe(true)
  })

  it('renders icon on the right', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', iconPosition: 'right' },
    })

    expect(wrapper.find('.flex-row-reverse').exists()).toBe(true)
  })

  it('renders with explicit trend', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, trend: 'up' },
    })

    expect(wrapper.find('.text-emerald-500').exists()).toBe(true)
  })

  it('renders trend only without percentage', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, change: 12, trendOnly: true },
    })

    expect(wrapper.text()).not.toContain('+12%')
  })

  it('applies different colors', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', color: 'success' },
    })

    expect(wrapper.find('.bg-emerald-100').exists()).toBe(true)
  })

  it('passes clickable prop to CardWrapper', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, clickable: true },
    })

    const cardWrapper = wrapper.findComponent({ name: 'CardWrapper' })
    expect(cardWrapper.props('clickable')).toBe(true)
  })

  it('renders extra slot content', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
      slots: {
        extra: '<div class="extra-content">Extra</div>',
      },
    })

    expect(wrapper.find('.extra-content').exists()).toBe(true)
  })

  // Tests for new props

  it('renders with prefix', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Revenue', value: '1,234', prefix: '$' },
    })

    expect(wrapper.text()).toContain('$')
    expect(wrapper.text()).toContain('1,234')
  })

  it('renders with suffix', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, suffix: 'active' },
    })

    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('active')
  })

  it('renders description when provided', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, description: 'Total registered users' },
    })

    expect(wrapper.text()).toContain('Total registered users')
  })

  it('renders with xs size', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, size: 'xs' },
    })

    expect(wrapper.find('.text-lg').exists()).toBe(true)
  })

  it('renders with xl size', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, size: 'xl' },
    })

    expect(wrapper.find('.text-4xl').exists()).toBe(true)
  })

  it('renders icon at bottom', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', iconPosition: 'bottom' },
    })

    expect(wrapper.find('.flex-col-reverse').exists()).toBe(true)
  })

  it('renders with labelFirst', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Label First', value: 100, labelFirst: true },
    })

    // Label should appear in the DOM before value
    const text = wrapper.text()
    expect(text.indexOf('Label First')).toBeLessThan(text.indexOf('100'))
  })

  it('inverts trend colors', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Churn', value: 100, change: 5, invertTrendColors: true },
    })

    // With inverted colors, positive change should show red
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })

  it('hides trend icon', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, change: 10, hideTrendIcon: true },
    })

    expect(wrapper.text()).toContain('+10%')
    // The trend icon should not be rendered
    const trendContainer = wrapper.find('.text-emerald-500')
    expect(trendContainer.findComponent({ name: 'Icon' }).exists()).toBe(false)
  })

  it('renders with solid variant', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, variant: 'solid', color: 'primary' },
    })

    expect(wrapper.find('.bg-primary-500').exists()).toBe(true)
  })

  it('renders with round icon', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', iconRounded: 'full' },
    })

    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('hides icon background', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, icon: 'heroicons:users', hideIconBg: true },
    })

    expect(wrapper.find('.bg-primary-100').exists()).toBe(false)
  })

  it('renders loading state', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, loading: true },
    })

    expect(wrapper.findComponent({ name: 'Skeleton' }).exists()).toBe(true)
  })

  it('applies custom card class', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, cardClass: 'my-custom-class' },
    })

    expect(wrapper.find('.my-custom-class').exists()).toBe(true)
  })

  it('renders description slot content', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100 },
      slots: {
        description: '<span class="custom-desc">Custom description</span>',
      },
    })

    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  it('passes accent prop to CardWrapper', () => {
    const wrapper = mount(StatItem, {
      props: { label: 'Users', value: 100, accent: 'primary' },
    })

    const cardWrapper = wrapper.findComponent({ name: 'CardWrapper' })
    expect(cardWrapper.props('accent')).toBe('primary')
  })
})
