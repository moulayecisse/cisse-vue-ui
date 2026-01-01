import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsGrid from './StatsGrid.vue'

describe('StatsGrid', () => {
  const defaultStats = [
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
    { label: 'C', value: 3 },
  ]

  it('renders all stats', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats },
    })

    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('B')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('C')
    expect(wrapper.text()).toContain('3')
  })

  it('renders correct number of StatsCard components', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats },
    })

    const cards = wrapper.findAllComponents({ name: 'StatsCard' })
    expect(cards.length).toBe(3)
  })

  it('applies grid-cols-3 for 3 stats by default', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats },
    })

    expect(wrapper.find('.grid-cols-3').exists()).toBe(true)
  })

  it('applies grid-cols-2 for 2 stats by default', () => {
    const wrapper = mount(StatsGrid, {
      props: {
        stats: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ],
      },
    })

    expect(wrapper.find('.grid-cols-2').exists()).toBe(true)
  })

  it('respects forced cols prop', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats, cols: 2 },
    })

    expect(wrapper.find('.grid-cols-2').exists()).toBe(true)
  })

  it('passes variant to StatsCard', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats, variant: 'glass' },
    })

    const cards = wrapper.findAllComponents({ name: 'StatsCard' })
    cards.forEach(card => {
      expect(card.props('variant')).toBe('glass')
    })
  })

  it('passes color to StatsCard', () => {
    const wrapper = mount(StatsGrid, {
      props: { stats: defaultStats, color: 'success' },
    })

    const cards = wrapper.findAllComponents({ name: 'StatsCard' })
    cards.forEach(card => {
      expect(card.props('color')).toBe('success')
    })
  })

  it('passes stat properties to StatsCard', () => {
    const stats = [
      { label: 'Users', value: 100, icon: 'heroicons:users', change: 5 },
    ]

    const wrapper = mount(StatsGrid, {
      props: { stats },
    })

    const card = wrapper.findComponent({ name: 'StatsCard' })
    expect(card.props('label')).toBe('Users')
    expect(card.props('value')).toBe(100)
    expect(card.props('icon')).toBe('heroicons:users')
    expect(card.props('change')).toBe(5)
  })
})
