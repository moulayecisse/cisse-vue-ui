import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormLabel from './FormLabel.vue'

describe('FormLabel', () => {
  it('renders label element', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Username' },
    })

    expect(wrapper.find('label').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Email Address' },
    })

    expect(wrapper.text()).toBe('Email Address')
  })

  it('sets for attribute from htmlFor prop', () => {
    const wrapper = mount(FormLabel, {
      props: { htmlFor: 'email-input' },
      slots: { default: 'Email' },
    })

    expect(wrapper.find('label').attributes('for')).toBe('email-input')
  })

  it('has empty for attribute when htmlFor not provided', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Email' },
    })

    expect(wrapper.find('label').attributes('for')).toBe('')
  })

  it('applies error styling when error is true', () => {
    const wrapper = mount(FormLabel, {
      props: { error: true },
      slots: { default: 'Field' },
    })

    expect(wrapper.find('label').attributes('data-error')).toBe('true')
  })

  it('applies error styling when error is string', () => {
    const wrapper = mount(FormLabel, {
      props: { error: 'This field is required' },
      slots: { default: 'Field' },
    })

    expect(wrapper.find('label').attributes('data-error')).toBe('true')
  })

  it('does not apply error styling when no error', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Field' },
    })

    expect(wrapper.find('label').attributes('data-error')).toBe('false')
  })

  it('has proper text styling classes', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Field' },
    })

    expect(wrapper.find('label').classes()).toContain('text-sm')
    expect(wrapper.find('label').classes()).toContain('font-medium')
  })

  it('has block display', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Field' },
    })

    expect(wrapper.find('label').classes()).toContain('block')
  })
})
