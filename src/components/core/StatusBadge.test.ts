import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from './StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(StatusBadge, {
      slots: {
        default: 'Active',
      },
    })

    expect(wrapper.text()).toBe('Active')
  })

  it('applies default variant styling', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.classes().some(c => c.includes('gray'))).toBe(true)
  })

  it('applies success variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'success' },
      slots: { default: 'Success' },
    })

    expect(wrapper.classes().some(c => c.includes('green'))).toBe(true)
  })

  it('applies error variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'error' },
      slots: { default: 'Error' },
    })

    expect(wrapper.classes().some(c => c.includes('red'))).toBe(true)
  })

  it('applies warning variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'warning' },
      slots: { default: 'Warning' },
    })

    expect(wrapper.classes().some(c => c.includes('yellow'))).toBe(true)
  })

  it('applies info variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'info' },
      slots: { default: 'Info' },
    })

    expect(wrapper.classes().some(c => c.includes('blue'))).toBe(true)
  })

  it('applies blue variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'blue' },
      slots: { default: 'Blue' },
    })

    expect(wrapper.classes().some(c => c.includes('blue'))).toBe(true)
  })

  it('applies orange variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'orange' },
      slots: { default: 'Orange' },
    })

    expect(wrapper.classes().some(c => c.includes('orange'))).toBe(true)
  })

  it('applies purple variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'purple' },
      slots: { default: 'Purple' },
    })

    expect(wrapper.classes().some(c => c.includes('purple'))).toBe(true)
  })

  it('applies pink variant', () => {
    const wrapper = mount(StatusBadge, {
      props: { variant: 'pink' },
      slots: { default: 'Pink' },
    })

    expect(wrapper.classes().some(c => c.includes('pink'))).toBe(true)
  })

  it('renders as span element', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('has rounded-full class for pill shape', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('has inline-flex display', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.classes()).toContain('inline-flex')
  })

  it('has small text size', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.classes()).toContain('text-xs')
  })

  it('has semibold font weight', () => {
    const wrapper = mount(StatusBadge, {
      slots: { default: 'Status' },
    })

    expect(wrapper.classes()).toContain('font-semibold')
  })
})
