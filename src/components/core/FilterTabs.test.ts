import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterTabs from './FilterTabs.vue'

describe('FilterTabs', () => {
  const defaultOptions = [
    { key: 'a', label: 'Option A' },
    { key: 'b', label: 'Option B' },
    { key: 'c', label: 'Option C' },
  ]

  it('renders all options', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a' },
    })

    expect(wrapper.text()).toContain('Option A')
    expect(wrapper.text()).toContain('Option B')
    expect(wrapper.text()).toContain('Option C')
  })

  it('renders correct number of buttons', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
  })

  it('highlights active option', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'b' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('bg-primary-500')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a' },
    })

    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['c'])
  })

  it('renders icons when provided', () => {
    const options = [
      { key: 'a', label: 'A', icon: 'heroicons:home' },
    ]

    const wrapper = mount(FilterTabs, {
      props: { options, modelValue: 'a' },
    })

    expect(wrapper.find('.size-4').exists()).toBe(true)
  })

  it('renders counts when provided', () => {
    const options = [
      { key: 'a', label: 'A', count: 42 },
    ]

    const wrapper = mount(FilterTabs, {
      props: { options, modelValue: 'a' },
    })

    expect(wrapper.text()).toContain('42')
  })

  it('disables button when option is disabled', () => {
    const options = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B', disabled: true },
    ]

    const wrapper = mount(FilterTabs, {
      props: { options, modelValue: 'a' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('does not emit on disabled option click', async () => {
    const options = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B', disabled: true },
    ]

    const wrapper = mount(FilterTabs, {
      props: { options, modelValue: 'a' },
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('applies pills variant by default', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a' },
    })

    expect(wrapper.find('.rounded-2xl').exists()).toBe(true)
  })

  it('applies underline variant', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a', variant: 'underline' },
    })

    expect(wrapper.find('.border-b').exists()).toBe(true)
  })

  it('applies boxed variant', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a', variant: 'boxed' },
    })

    expect(wrapper.find('.bg-gray-100').exists()).toBe(true)
  })

  it('applies small size', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a', size: 'sm' },
    })

    expect(wrapper.find('.text-xs').exists()).toBe(true)
  })

  it('applies large size', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a', size: 'lg' },
    })

    expect(wrapper.find('.text-base').exists()).toBe(true)
  })

  it('applies full width', () => {
    const wrapper = mount(FilterTabs, {
      props: { options: defaultOptions, modelValue: 'a', fullWidth: true },
    })

    expect(wrapper.find('.w-full').exists()).toBe(true)
  })
})
