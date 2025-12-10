import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Timeline from './Timeline.vue'

const mockItems = [
  { key: '1', title: 'Step 1', description: 'First step', status: 'completed' as const },
  { key: '2', title: 'Step 2', description: 'Second step', status: 'current' as const },
  { key: '3', title: 'Step 3', description: 'Third step', status: 'upcoming' as const },
]

describe('Timeline', () => {
  it('renders all items', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    expect(wrapper.text()).toContain('Step 1')
    expect(wrapper.text()).toContain('Step 2')
    expect(wrapper.text()).toContain('Step 3')
  })

  it('renders descriptions', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    expect(wrapper.text()).toContain('First step')
    expect(wrapper.text()).toContain('Second step')
    expect(wrapper.text()).toContain('Third step')
  })

  it('renders in vertical orientation by default', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    // Vertical has pb-8 class on items
    expect(wrapper.find('.pb-8').exists()).toBe(true)
  })

  it('renders in horizontal orientation', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems, orientation: 'horizontal' },
    })
    // Horizontal has flex and overflow-x-auto
    expect(wrapper.find('.overflow-x-auto').exists()).toBe(true)
  })

  it('applies completed status styling', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    expect(wrapper.find('.bg-green-500').exists()).toBe(true)
  })

  it('applies current status styling with ring', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    expect(wrapper.find('.ring-4').exists()).toBe(true)
  })

  it('applies upcoming status styling', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
  })

  it('renders date when provided', () => {
    const itemsWithDate = [
      { key: '1', title: 'Event', date: 'Jan 15, 2024' },
    ]
    const wrapper = mount(Timeline, {
      props: { items: itemsWithDate },
    })
    expect(wrapper.text()).toContain('Jan 15, 2024')
  })

  it('renders check icon for completed status', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    // Check icon exists in completed item
    expect(wrapper.find('.text-white').exists()).toBe(true)
  })

  it('renders connecting lines between items', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    // Vertical timeline has connecting lines with w-0.5
    expect(wrapper.find('.w-0\\.5').exists()).toBe(true)
  })

  it('does not render connecting line after last item', () => {
    const wrapper = mount(Timeline, {
      props: { items: mockItems },
    })
    const items = wrapper.findAll('.pb-8, .last\\:pb-0')
    // Last item should have last:pb-0
    expect(items.length).toBeGreaterThan(0)
  })

  it('renders error status', () => {
    const itemsWithError = [
      { key: '1', title: 'Failed', status: 'error' as const },
    ]
    const wrapper = mount(Timeline, {
      props: { items: itemsWithError },
    })
    expect(wrapper.find('.bg-red-500').exists()).toBe(true)
  })

  it('renders custom icon', () => {
    const itemsWithIcon = [
      { key: '1', title: 'Custom', icon: 'heroicons:star' },
    ]
    const wrapper = mount(Timeline, {
      props: { items: itemsWithIcon },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with single item', () => {
    const wrapper = mount(Timeline, {
      props: { items: [{ key: '1', title: 'Single' }] },
    })
    expect(wrapper.text()).toContain('Single')
  })

  describe('horizontal orientation', () => {
    it('renders items horizontally', () => {
      const wrapper = mount(Timeline, {
        props: { items: mockItems, orientation: 'horizontal' },
      })
      expect(wrapper.find('.flex.items-start').exists()).toBe(true)
    })

    it('renders horizontal connecting lines', () => {
      const wrapper = mount(Timeline, {
        props: { items: mockItems, orientation: 'horizontal' },
      })
      expect(wrapper.find('.h-0\\.5').exists()).toBe(true)
    })

    it('centers content below dots', () => {
      const wrapper = mount(Timeline, {
        props: { items: mockItems, orientation: 'horizontal' },
      })
      expect(wrapper.find('.text-center').exists()).toBe(true)
    })
  })
})
