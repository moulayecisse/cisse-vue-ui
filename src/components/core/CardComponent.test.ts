import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardComponent from './CardComponent.vue'

describe('CardComponent', () => {
  it('renders slot content', () => {
    const wrapper = mount(CardComponent, {
      slots: {
        default: '<p class="content">Card content</p>',
      },
    })

    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Card content')
  })

  it('renders title when provided', () => {
    const wrapper = mount(CardComponent, {
      props: {
        title: 'Card Title',
      },
    })

    expect(wrapper.text()).toContain('Card Title')
  })

  it('renders description when provided', () => {
    const wrapper = mount(CardComponent, {
      props: {
        description: 'Card description text',
      },
    })

    expect(wrapper.text()).toContain('Card description text')
  })

  it('renders both title and description', () => {
    const wrapper = mount(CardComponent, {
      props: {
        title: 'My Title',
        description: 'My Description',
      },
    })

    expect(wrapper.text()).toContain('My Title')
    expect(wrapper.text()).toContain('My Description')
  })

  it('renders title slot', () => {
    const wrapper = mount(CardComponent, {
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
      },
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('renders description slot', () => {
    const wrapper = mount(CardComponent, {
      slots: {
        description: '<span class="custom-desc">Custom Description</span>',
      },
    })

    expect(wrapper.find('.custom-desc').exists()).toBe(true)
  })

  it('renders actions slot', () => {
    const wrapper = mount(CardComponent, {
      props: { title: 'Title' },
      slots: {
        actions: '<button class="action-btn">Action</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('does not render header when no title/description/slots', () => {
    const wrapper = mount(CardComponent, {
      slots: {
        default: 'Just content',
      },
    })

    // Header has border-b class
    expect(wrapper.find('.border-b').exists()).toBe(false)
  })

  it('renders header when title is provided', () => {
    const wrapper = mount(CardComponent, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('.border-b').exists()).toBe(true)
  })

  it('has rounded corners', () => {
    const wrapper = mount(CardComponent)
    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('has shadow', () => {
    const wrapper = mount(CardComponent)
    expect(wrapper.classes()).toContain('shadow-md')
  })

  it('has white background', () => {
    const wrapper = mount(CardComponent)
    expect(wrapper.classes()).toContain('bg-white')
  })
})
