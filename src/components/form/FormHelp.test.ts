import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormHelp from './FormHelp.vue'

describe('FormHelp', () => {
  it('renders paragraph element', () => {
    const wrapper = mount(FormHelp, {
      slots: { default: 'Help text' },
    })

    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(FormHelp, {
      slots: { default: 'Enter your email address' },
    })

    expect(wrapper.text()).toBe('Enter your email address')
  })

  it('renders text prop when no slot', () => {
    const wrapper = mount(FormHelp, {
      props: { text: 'Help text from prop' },
    })

    expect(wrapper.text()).toBe('Help text from prop')
  })

  it('prefers slot content over text prop', () => {
    const wrapper = mount(FormHelp, {
      props: { text: 'Prop text' },
      slots: { default: 'Slot text' },
    })

    expect(wrapper.text()).toBe('Slot text')
  })

  it('applies error styling when error is true', () => {
    const wrapper = mount(FormHelp, {
      props: { error: true },
      slots: { default: 'Error message' },
    })

    expect(wrapper.find('p').attributes('data-error')).toBe('true')
  })

  it('does not apply error styling when error is false', () => {
    const wrapper = mount(FormHelp, {
      props: { error: false },
      slots: { default: 'Help text' },
    })

    expect(wrapper.find('p').attributes('data-error')).toBe('false')
  })

  it('has small text size', () => {
    const wrapper = mount(FormHelp, {
      slots: { default: 'Help' },
    })

    expect(wrapper.find('p').classes()).toContain('text-sm')
  })

  it('has top margin', () => {
    const wrapper = mount(FormHelp, {
      slots: { default: 'Help' },
    })

    expect(wrapper.find('p').classes()).toContain('mt-2')
  })

  it('renders empty string when no content', () => {
    const wrapper = mount(FormHelp)

    expect(wrapper.text()).toBe('')
  })
})
