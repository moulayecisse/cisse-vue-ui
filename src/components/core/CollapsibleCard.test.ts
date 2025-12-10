import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CollapsibleCard from './CollapsibleCard.vue'

describe('CollapsibleCard', () => {
  it('renders title', () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Collapsible Title' },
    })

    expect(wrapper.text()).toContain('Collapsible Title')
  })

  it('renders description', () => {
    const wrapper = mount(CollapsibleCard, {
      props: {
        title: 'Title',
        description: 'Card description',
      },
    })

    expect(wrapper.text()).toContain('Card description')
  })

  it('renders content in default slot', () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Title' },
      slots: {
        default: '<p class="card-content">Content here</p>',
      },
    })

    expect(wrapper.find('.card-content').exists()).toBe(true)
  })

  it('is expanded by default', () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Title' },
      slots: { default: '<span id="content">Content</span>' },
    })

    const content = wrapper.find('#content')
    expect(content.isVisible()).toBe(true)
  })

  it('respects defaultExpanded=false', () => {
    const wrapper = mount(CollapsibleCard, {
      props: {
        title: 'Title',
        defaultExpanded: false,
      },
      slots: { default: '<span id="content">Content</span>' },
    })

    // Content parent should have display: none
    const contentWrapper = wrapper.find('#content').element.parentElement?.parentElement
    expect(contentWrapper?.style.display).toBe('none')
  })

  it('toggles content visibility on button click', async () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Title' },
      slots: { default: '<span id="content">Content</span>' },
    })

    // Initially expanded
    let contentWrapper = wrapper.find('#content').element.parentElement?.parentElement
    expect(contentWrapper?.style.display).not.toBe('none')

    // Click toggle button
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Now collapsed
    contentWrapper = wrapper.find('#content').element.parentElement?.parentElement
    expect(contentWrapper?.style.display).toBe('none')
  })

  it('toggles back to expanded', async () => {
    const wrapper = mount(CollapsibleCard, {
      props: {
        title: 'Title',
        defaultExpanded: false,
      },
      slots: { default: '<span id="content">Content</span>' },
    })

    // Initially collapsed
    let contentWrapper = wrapper.find('#content').element.parentElement?.parentElement
    expect(contentWrapper?.style.display).toBe('none')

    // Click toggle button
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Now expanded
    contentWrapper = wrapper.find('#content').element.parentElement?.parentElement
    expect(contentWrapper?.style.display).not.toBe('none')
  })

  it('renders actions slot', () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Title' },
      slots: {
        actions: '<button class="custom-action">Action</button>',
      },
    })

    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })

  it('has toggle button', () => {
    const wrapper = mount(CollapsibleCard, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
