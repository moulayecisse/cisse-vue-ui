import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stats from './Stats.vue'
import StatItem from './StatItem.vue'

describe('Stats', () => {
  const sampleStats = [
    { label: 'Users', value: '1,234', icon: 'heroicons:users' },
    { label: 'Revenue', value: '$45,678', icon: 'heroicons:banknotes' },
    { label: 'Orders', value: '567', icon: 'heroicons:shopping-cart' },
    { label: 'Growth', value: '12%', icon: 'heroicons:arrow-trending-up' },
  ]

  it('renders stats from props', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats },
    })

    expect(wrapper.text()).toContain('Users')
    expect(wrapper.text()).toContain('1,234')
    expect(wrapper.text()).toContain('Revenue')
    expect(wrapper.text()).toContain('$45,678')
  })

  it('renders correct number of StatItem components', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items.length).toBe(4)
  })

  it('auto-calculates columns for 2 items', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats.slice(0, 2) },
    })

    expect(wrapper.find('.grid-cols-2').exists()).toBe(true)
  })

  it('auto-calculates columns for 3 items', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats.slice(0, 3) },
    })

    expect(wrapper.find('.grid-cols-3').exists()).toBe(true)
  })

  it('applies explicit column count', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats, cols: 2 },
    })

    // Should have grid-cols-2 class
    expect(wrapper.classes()).toContain('grid-cols-2')
  })

  it('applies gap sizes', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats, gap: 'lg' },
    })

    expect(wrapper.find('.gap-4').exists()).toBe(true)
  })

  it('passes variant to StatItem components', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats, variant: 'glass' },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items[0].props('variant')).toBe('glass')
  })

  it('passes size to StatItem components', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats, size: 'sm' },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items[0].props('size')).toBe('sm')
  })

  it('passes iconPosition to StatItem components', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats, iconPosition: 'left' },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items[0].props('iconPosition')).toBe('left')
  })

  it('renders slot content', () => {
    const wrapper = mount(Stats, {
      slots: {
        default: '<div class="custom-stat">Custom</div>',
      },
    })

    expect(wrapper.find('.custom-stat').exists()).toBe(true)
  })

  it('renders both stats prop and slot content', () => {
    const wrapper = mount(Stats, {
      props: { stats: sampleStats.slice(0, 2) },
      slots: {
        default: '<div class="custom-stat">Custom</div>',
      },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items.length).toBe(2)
    expect(wrapper.find('.custom-stat').exists()).toBe(true)
  })

  it('uses per-item color when provided', () => {
    const statsWithColors = [
      { label: 'Users', value: '1,234', color: 'success' as const },
      { label: 'Revenue', value: '$45,678', color: 'warning' as const },
    ]

    const wrapper = mount(Stats, {
      props: { stats: statsWithColors },
    })

    const items = wrapper.findAllComponents(StatItem)
    expect(items[0].props('color')).toBe('success')
    expect(items[1].props('color')).toBe('warning')
  })
})
