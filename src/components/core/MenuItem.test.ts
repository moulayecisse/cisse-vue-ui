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

    expect(wrapper.find('.size-5').exists()).toBe(true)
  })

  describe('Submenu', () => {
    const menuItemWithChildren = {
      label: 'Settings',
      icon: 'lucide:settings',
      link: '/settings',
      children: [
        { label: 'Profile', icon: 'lucide:user', link: '/settings/profile' },
        { label: 'Security', icon: 'lucide:shield', link: '/settings/security' },
      ],
    }

    it('renders as button when has children', () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: true,
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('shows chevron icon when has children and expanded', () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: true,
        },
      })

      // Chevron icon for submenu
      expect(wrapper.find('.size-4').exists()).toBe(true)
    })

    it('hides chevron icon when collapsed', () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: false,
        },
      })

      // Chevron should not be visible when sidebar collapsed
      expect(wrapper.find('.size-4').exists()).toBe(false)
    })

    it('toggles submenu on click', async () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: true,
        },
      })

      // Initially submenu is closed
      expect(wrapper.findAll('.size-5').length).toBe(1) // Only parent icon

      // Click to open submenu
      await wrapper.find('button').trigger('click')

      // Submenu should now show children
      expect(wrapper.text()).toContain('Profile')
      expect(wrapper.text()).toContain('Security')
    })

    it('applies active state to parent when child is active', () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: true,
          currentPath: '/settings/security',
        },
      })

      // Parent should be highlighted when child is active
      expect(wrapper.find('button').html()).toContain('text-white')
    })

    it('renders children with increased depth', async () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: menuItemWithChildren,
          expanded: true,
        },
      })

      // Open submenu
      await wrapper.find('button').trigger('click')

      // Children should be rendered (findAllComponents doesn't include root)
      const childItems = wrapper.findAllComponents(MenuItem)
      expect(childItems.length).toBe(2) // 2 children
    })

    it('supports deep nesting', async () => {
      const deepMenuItem = {
        label: 'Admin',
        icon: 'lucide:settings',
        link: '/admin',
        children: [
          {
            label: 'Users',
            icon: 'lucide:users',
            link: '/admin/users',
            children: [
              { label: 'List', icon: 'lucide:list', link: '/admin/users/list' },
            ],
          },
        ],
      }

      const wrapper = mount(MenuItem, {
        props: {
          menuItem: deepMenuItem,
          expanded: true,
        },
      })

      // Open first level
      await wrapper.find('button').trigger('click')

      // Should show first level child
      expect(wrapper.text()).toContain('Users')
    })

    it('renders as button when submenu slot is provided', () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: { label: 'Options', icon: 'lucide:more', link: '/options' },
          expanded: true,
        },
        slots: {
          submenu: '<div class="custom-submenu">Custom Content</div>',
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('shows submenu slot content when clicked', async () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: { label: 'Options', icon: 'lucide:more', link: '/options' },
          expanded: true,
        },
        slots: {
          submenu: '<div class="custom-submenu">Custom Content</div>',
        },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.find('.custom-submenu').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Content')
    })

    it('passes slot props to submenu slot', async () => {
      const wrapper = mount(MenuItem, {
        props: {
          menuItem: { label: 'Options', icon: 'lucide:more', link: '/options' },
          expanded: true,
          currentPath: '/test',
          depth: 1,
        },
        slots: {
          submenu: `<template #submenu="{ depth, expanded, currentPath }">
            <div class="slot-data">depth:{{ depth }},expanded:{{ expanded }},path:{{ currentPath }}</div>
          </template>`,
        },
      })

      await wrapper.find('button').trigger('click')

      const slotContent = wrapper.find('.slot-data')
      expect(slotContent.exists()).toBe(true)
      expect(slotContent.text()).toContain('depth:2')
      expect(slotContent.text()).toContain('expanded:true')
      expect(slotContent.text()).toContain('path:/test')
    })
  })
})
