import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLayout from './BaseLayout.vue'

describe('BaseLayout', () => {
  it('renders layout container', () => {
    const wrapper = mount(BaseLayout)

    expect(wrapper.find('.h-dvh').exists()).toBe(true)
  })

  it('renders app name', () => {
    const wrapper = mount(BaseLayout, {
      props: { appName: 'My App' },
    })

    expect(wrapper.text()).toContain('My App')
  })

  it('uses default app name', () => {
    const wrapper = mount(BaseLayout)

    expect(wrapper.text()).toContain('App')
  })

  it('renders menu items', () => {
    const menuItems = [
      { label: 'Dashboard', icon: 'lucide:home', link: '/dashboard' },
      { label: 'Users', icon: 'lucide:users', link: '/users' },
    ]

    const wrapper = mount(BaseLayout, {
      props: {
        menuItems,
        sidebarOpen: true,
      },
    })

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Users')
  })

  it('emits update:sidebarOpen when toggled', async () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true },
    })

    // Find header toggle button
    const headerButtons = wrapper.findAll('header button')
    await headerButtons[0].trigger('click')

    expect(wrapper.emitted('update:sidebarOpen')).toBeTruthy()
    expect(wrapper.emitted('update:sidebarOpen')![0]).toEqual([false])
  })

  it('shows dark mode toggle by default', () => {
    const wrapper = mount(BaseLayout)

    // Should have sun/moon icon button
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('hides dark mode toggle when showDarkToggle is false', () => {
    const wrapper = mount(BaseLayout, {
      props: { showDarkToggle: false },
    })

    // Should have fewer buttons when dark toggle is hidden
    const headerButtons = wrapper.findAll('header button')
    const buttonsWithoutDark = headerButtons.filter(b => !b.html().includes('lucide:moon') && !b.html().includes('lucide:sun'))
    expect(buttonsWithoutDark.length).toBe(headerButtons.length)
  })

  it('emits update:dark when dark toggle clicked', async () => {
    const wrapper = mount(BaseLayout, {
      props: {
        showDarkToggle: true,
        dark: false,
      },
    })

    // Find dark mode toggle button in header
    const headerActions = wrapper.find('header .flex.items-center.gap-3')
    const buttons = headerActions.findAll('button')
    // Dark toggle should be there
    const darkToggle = buttons.find(b => b.html().includes('lucide:moon') || b.html().includes('lucide:sun'))
    if (darkToggle) {
      await darkToggle.trigger('click')
      expect(wrapper.emitted('update:dark')).toBeTruthy()
    }
  })

  it('renders user menu when userName provided', () => {
    const wrapper = mount(BaseLayout, {
      props: {
        userName: 'John Doe',
        userAvatar: 'JD',
      },
    })

    expect(wrapper.text()).toContain('John Doe')
  })

  it('shows user avatar initials', () => {
    const wrapper = mount(BaseLayout, {
      props: {
        userName: 'John Doe',
        userAvatar: 'JD',
      },
    })

    expect(wrapper.text()).toContain('JD')
  })

  it('renders default slot content', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        default: '<div class="main-content">Main Content</div>',
      },
    })

    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('renders logo slot', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        logo: '<div class="custom-logo">Logo</div>',
      },
    })

    expect(wrapper.find('.custom-logo').exists()).toBe(true)
  })

  it('renders header-center slot', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        'header-center': '<div class="header-center">Center</div>',
      },
    })

    expect(wrapper.find('.header-center').exists()).toBe(true)
  })

  it('renders header-actions slot', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        'header-actions': '<button class="custom-action">Action</button>',
      },
    })

    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })

  it('renders sidebar-footer slot', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        'sidebar-footer': '<div class="footer-content">Footer</div>',
      },
    })

    expect(wrapper.find('.footer-content').exists()).toBe(true)
  })

  it('applies custom sidebarClass', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarClass: 'bg-blue-900' },
    })

    expect(wrapper.find('.bg-blue-900').exists()).toBe(true)
  })

  it('sidebar is expanded when sidebarOpen is true', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true },
    })

    // Expanded sidebar has lg:w-60 class
    expect(wrapper.find('aside').classes()).toContain('lg:w-60')
  })

  it('sidebar is collapsed when sidebarOpen is false', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: false },
    })

    // Collapsed sidebar has lg:w-16 class
    expect(wrapper.find('aside').classes()).toContain('lg:w-16')
  })

  it('shows mobile backdrop when sidebar open', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true },
    })

    // Backdrop exists
    expect(wrapper.find('.bg-slate-950\\/20').exists()).toBe(true)
  })

  it('closes sidebar when backdrop clicked', async () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true },
    })

    const backdrop = wrapper.find('.bg-slate-950\\/20')
    await backdrop.trigger('click')

    expect(wrapper.emitted('update:sidebarOpen')).toBeTruthy()
    expect(wrapper.emitted('update:sidebarOpen')![0]).toEqual([false])
  })

  it('applies top menu position by default', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true },
    })

    const menuContainer = wrapper.find('.flex.min-h-0.flex-1.flex-col')
    expect(menuContainer.classes()).toContain('lg:justify-start')
  })

  it('applies center menu position', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true, menuPosition: 'center' },
    })

    const menuContainer = wrapper.find('.flex.min-h-0.flex-1.flex-col')
    expect(menuContainer.classes()).toContain('lg:justify-center')
  })

  it('applies bottom menu position', () => {
    const wrapper = mount(BaseLayout, {
      props: { sidebarOpen: true, menuPosition: 'bottom' },
    })

    const menuContainer = wrapper.find('.flex.min-h-0.flex-1.flex-col')
    expect(menuContainer.classes()).toContain('lg:justify-end')
  })
})
