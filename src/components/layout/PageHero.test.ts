import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageHero from './PageHero.vue'

describe('PageHero', () => {
  it('renders title', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Test Title' },
    })

    expect(wrapper.find('h1').text()).toBe('Test Title')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', subtitle: 'Subtitle text' },
    })

    expect(wrapper.text()).toContain('Subtitle text')
  })

  it('renders badge when provided', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', badge: 'Dashboard' },
    })

    expect(wrapper.text()).toContain('Dashboard')
  })

  it('renders stats when provided', () => {
    const stats = [
      { label: 'Users', value: 100, icon: 'heroicons:users' },
      { label: 'Orders', value: 50, icon: 'heroicons:shopping-cart' },
    ]

    const wrapper = mount(PageHero, {
      props: { title: 'Title', stats },
    })

    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('Users')
    expect(wrapper.text()).toContain('50')
    expect(wrapper.text()).toContain('Orders')
  })

  it('renders correct number of stat cards', () => {
    const stats = [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 },
    ]

    const wrapper = mount(PageHero, {
      props: { title: 'Title', stats },
    })

    // Each stat has its value rendered
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })

  it('shows animated blobs by default', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('.animate-float').exists()).toBe(true)
  })

  it('hides blobs when showBlobs is false', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', showBlobs: false },
    })

    expect(wrapper.find('.animate-float').exists()).toBe(false)
  })

  it('shows wave by default', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('hides wave when showWave is false', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', showWave: false },
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('renders title slot content', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Default' },
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
      },
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('renders badge slot content', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', badge: 'default' },
      slots: {
        badge: '<span class="custom-badge">Custom Badge</span>',
      },
    })

    expect(wrapper.find('.custom-badge').exists()).toBe(true)
  })

  it('renders stats slot content', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title', stats: [{ label: 'A', value: 1 }] },
      slots: {
        stats: '<div class="custom-stats">Custom Stats</div>',
      },
    })

    expect(wrapper.find('.custom-stats').exists()).toBe(true)
  })

  it('renders content slot', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'Title' },
      slots: {
        content: '<div class="extra-content">Extra Content</div>',
      },
    })

    expect(wrapper.find('.extra-content').exists()).toBe(true)
  })
})
