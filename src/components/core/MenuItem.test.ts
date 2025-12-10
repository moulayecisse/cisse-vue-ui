import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuItem from './MenuItem.vue'

const mockMenuItem = {
  label: 'Dashboard',
  icon: 'lucide:home',
  link: '/dashboard',
}

describe('MenuItem', () => {
  it('renders menu item label when expanded', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
      },
    })

    expect(wrapper.text()).toContain('Dashboard')
  })

  it('hides label when not expanded', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: false,
      },
    })

    // Label should not be visible (v-if="expanded")
    expect(wrapper.find('span.text-sm').exists()).toBe(false)
  })

  it('renders as anchor tag without vue-router', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('/dashboard')
  })

  it('applies active state when active prop is true', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
        active: true,
      },
    })

    // Active state has 'text-white' class
    expect(wrapper.html()).toContain('text-white')
  })

  it('applies inactive state when active prop is false', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
        active: false,
      },
    })

    // Inactive state has 'text-white/50' class
    expect(wrapper.html()).toContain('text-white/50')
  })

  it('shows notification indicator when notification is true', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: { ...mockMenuItem, notification: true },
        expanded: true,
      },
    })

    // Red notification dot
    expect(wrapper.find('.bg-red-600').exists()).toBe(true)
  })

  it('hides notification indicator when notification is false', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: { ...mockMenuItem, notification: false },
        expanded: true,
      },
    })

    expect(wrapper.find('.bg-red-600').exists()).toBe(false)
  })

  it('applies flex-row layout when expanded', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
      },
    })

    expect(wrapper.find('a').classes()).toContain('flex-row')
  })

  it('applies flex-col layout when collapsed', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: false,
      },
    })

    expect(wrapper.find('a').classes()).toContain('flex-col')
  })

  it('detects active state from currentPath prop', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
        currentPath: '/dashboard',
      },
    })

    // Should be active
    expect(wrapper.html()).toContain('text-white')
  })

  it('detects active state for nested routes', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
        currentPath: '/dashboard/settings',
      },
    })

    // Should be active for nested route
    expect(wrapper.html()).toContain('text-white')
  })

  it('home route only active for exact match', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: { ...mockMenuItem, link: '/' },
        expanded: true,
        currentPath: '/other',
      },
    })

    // Should NOT be active
    expect(wrapper.html()).toContain('text-white/50')
  })

  it('has larger icon when collapsed', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: false,
      },
    })

    expect(wrapper.find('.size-8').exists()).toBe(true)
  })

  it('has smaller icon when expanded', () => {
    const wrapper = mount(MenuItem, {
      props: {
        menuItem: mockMenuItem,
        expanded: true,
      },
    })

    expect(wrapper.find('.size-6').exists()).toBe(true)
  })
})
