import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormSection from './FormSection.vue'

describe('FormSection', () => {
  it('renders title', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Section Title' },
    })

    expect(wrapper.find('h2').text()).toBe('Section Title')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', subtitle: 'Subtitle text' },
    })

    expect(wrapper.text()).toContain('Subtitle text')
  })

  it('does not render subtitle when not provided', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
    })

    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('renders icon when provided', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', icon: 'heroicons:user' },
    })

    expect(wrapper.find('.size-10').exists()).toBe(true)
  })

  it('does not render icon container when no icon', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('.size-10').exists()).toBe(false)
  })

  it('applies border by default', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('.border').exists()).toBe(true)
  })

  it('removes border when bordered is false', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', bordered: false },
    })

    expect(wrapper.find('.border').exists()).toBe(false)
  })

  it('is not collapsible by default', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows collapse button when collapsible', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', collapsible: true },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits update:collapsed when toggle button is clicked', async () => {
    const wrapper = mount(FormSection, {
      props: {
        title: 'Title',
        collapsible: true,
        collapsed: false,
      },
      slots: {
        default: '<div class="content">Content</div>',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:collapsed')).toBeTruthy()
    expect(wrapper.emitted('update:collapsed')![0]).toEqual([true])
  })

  it('renders content container that can be controlled by collapsed prop', () => {
    const wrapper = mount(FormSection, {
      props: {
        title: 'Title',
        collapsible: true,
        collapsed: false,
      },
      slots: {
        default: '<div class="content">Content</div>',
      },
    })

    // Content container exists with v-show binding
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('Content')
  })

  it('renders default slot content', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
      slots: {
        default: '<div class="my-content">Custom Content</div>',
      },
    })

    expect(wrapper.find('.my-content').exists()).toBe(true)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
      slots: {
        footer: '<div class="my-footer">Footer Content</div>',
      },
    })

    expect(wrapper.find('.my-footer').exists()).toBe(true)
  })

  it('renders title slot', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Default' },
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
      },
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('renders header-actions slot', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title' },
      slots: {
        'header-actions': '<button class="action-btn">Action</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('applies primary icon color by default', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', icon: 'heroicons:user' },
    })

    expect(wrapper.find('.bg-primary-100').exists()).toBe(true)
  })

  it('applies success icon color', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', icon: 'heroicons:check', iconColor: 'success' },
    })

    expect(wrapper.find('.bg-emerald-100').exists()).toBe(true)
  })

  it('applies danger icon color', () => {
    const wrapper = mount(FormSection, {
      props: { title: 'Title', icon: 'heroicons:trash', iconColor: 'danger' },
    })

    expect(wrapper.find('.bg-red-100').exists()).toBe(true)
  })
})
