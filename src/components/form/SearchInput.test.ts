import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'

describe('SearchInput', () => {
  it('renders input element', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('has type="text"', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('shows default placeholder', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('shows custom placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: { placeholder: 'Search users...' },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search users...')
  })

  it('displays modelValue', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'test query' },
    })

    expect(wrapper.find('input').element.value).toBe('test query')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    })

    await wrapper.find('input').setValue('search text')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['search text'])
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(SearchInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('has search icon', () => {
    const wrapper = mount(SearchInput)

    // Icon exists in the component
    expect(wrapper.find('.h-5').exists()).toBe(true)
  })

  it('has relative container', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('.relative').exists()).toBe(true)
  })

  it('has left padding for icon', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').classes()).toContain('pl-10')
  })

  it('has rounded corners', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').classes()).toContain('rounded-lg')
  })

  it('has border', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').classes()).toContain('border')
  })

  it('has full width', () => {
    const wrapper = mount(SearchInput)

    expect(wrapper.find('input').classes()).toContain('w-full')
  })
})
