import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageLayout from './PageLayout.vue'

describe('PageLayout', () => {
  it('renders container div', () => {
    const wrapper = mount(PageLayout)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(PageLayout, {
      props: { title: 'Page Title' },
    })

    expect(wrapper.find('h1').text()).toBe('Page Title')
  })

  it('does not render title when not provided', () => {
    const wrapper = mount(PageLayout)

    expect(wrapper.find('h1').exists()).toBe(false)
  })

  it('renders description when provided', () => {
    const wrapper = mount(PageLayout, {
      props: { description: 'Page description text' },
    })

    expect(wrapper.text()).toContain('Page description text')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(PageLayout)

    // Only the flex-1 slot container should be present
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('renders breadcrumbs when provided', () => {
    const breadcrumbs = [
      { label: 'Home', link: '/' },
      { label: 'Users', link: '/users' },
      { label: 'Details', link: '/users/1' },
    ]

    const wrapper = mount(PageLayout, {
      props: { breadcrumbs },
    })

    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Users')
    expect(wrapper.text()).toContain('Details')
  })

  it('does not render nav when no breadcrumbs', () => {
    const wrapper = mount(PageLayout)

    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('renders breadcrumb separators', () => {
    const breadcrumbs = [
      { label: 'Home', link: '/' },
      { label: 'Page', link: '/page' },
    ]

    const wrapper = mount(PageLayout, {
      props: { breadcrumbs },
    })

    expect(wrapper.text()).toContain('/')
  })

  it('renders breadcrumbs as anchor tags', () => {
    const breadcrumbs = [
      { label: 'Home', link: '/' },
    ]

    const wrapper = mount(PageLayout, {
      props: { breadcrumbs },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/')
  })

  it('renders default slot content', () => {
    const wrapper = mount(PageLayout, {
      slots: {
        default: '<div class="page-content">Content</div>',
      },
    })

    expect(wrapper.find('.page-content').exists()).toBe(true)
  })

  it('renders title slot', () => {
    const wrapper = mount(PageLayout, {
      props: { title: 'Default Title' },
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
      },
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('renders description slot', () => {
    const wrapper = mount(PageLayout, {
      props: { description: 'Default desc' },
      slots: {
        description: '<span class="custom-desc">Custom Description</span>',
      },
    })

    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  it('renders actions slot', () => {
    const wrapper = mount(PageLayout, {
      slots: {
        actions: '<button class="action-btn">Action</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('has aria-label on breadcrumb nav', () => {
    const breadcrumbs = [{ label: 'Home', link: '/' }]

    const wrapper = mount(PageLayout, {
      props: { breadcrumbs },
    })

    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
  })

  it('applies different styling to last breadcrumb', () => {
    const breadcrumbs = [
      { label: 'Home', link: '/' },
      { label: 'Current', link: '/current' },
    ]

    const wrapper = mount(PageLayout, {
      props: { breadcrumbs },
    })

    const links = wrapper.findAll('a')
    // Last breadcrumb should have muted color
    expect(links[1].classes().some(c => c.includes('gray-400'))).toBe(true)
  })
})
