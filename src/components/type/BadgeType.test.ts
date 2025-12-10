import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BadgeType from './BadgeType.vue'

describe('BadgeType', () => {
  it('renders StatusBadge component', () => {
    const wrapper = mount(BadgeType, {
      props: { value: 'Active' },
    })

    expect(wrapper.findComponent({ name: 'StatusBadge' }).exists()).toBe(true)
  })

  it('renders value as text', () => {
    const wrapper = mount(BadgeType, {
      props: { value: 'Pending' },
    })

    expect(wrapper.text()).toBe('Pending')
  })

  it('uses default variant', () => {
    const wrapper = mount(BadgeType, {
      props: { value: 'Status' },
    })

    // Default variant is 'default' which uses gray colors
    expect(wrapper.find('span').classes().some(c => c.includes('gray'))).toBe(true)
  })

  it('applies success variant', () => {
    const wrapper = mount(BadgeType, {
      props: {
        value: 'Active',
        variant: 'success',
      },
    })

    expect(wrapper.find('span').classes().some(c => c.includes('green'))).toBe(true)
  })

  it('applies error variant', () => {
    const wrapper = mount(BadgeType, {
      props: {
        value: 'Error',
        variant: 'error',
      },
    })

    expect(wrapper.find('span').classes().some(c => c.includes('red'))).toBe(true)
  })

  it('applies warning variant', () => {
    const wrapper = mount(BadgeType, {
      props: {
        value: 'Warning',
        variant: 'warning',
      },
    })

    expect(wrapper.find('span').classes().some(c => c.includes('yellow'))).toBe(true)
  })

  it('applies info variant', () => {
    const wrapper = mount(BadgeType, {
      props: {
        value: 'Info',
        variant: 'info',
      },
    })

    expect(wrapper.find('span').classes().some(c => c.includes('blue'))).toBe(true)
  })

  it('uses formatter function', () => {
    const wrapper = mount(BadgeType, {
      props: {
        value: 'active',
        formatter: (v: unknown) => String(v).toUpperCase(),
      },
    })

    expect(wrapper.text()).toBe('ACTIVE')
  })

  it('renders empty string for null', () => {
    const wrapper = mount(BadgeType, {
      props: { value: null },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders empty string for undefined', () => {
    const wrapper = mount(BadgeType, {
      props: { value: undefined },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders number as string', () => {
    const wrapper = mount(BadgeType, {
      props: { value: 123 },
    })

    expect(wrapper.text()).toBe('123')
  })

  it('renders boolean as string', () => {
    const wrapper = mount(BadgeType, {
      props: { value: true },
    })

    expect(wrapper.text()).toBe('true')
  })
})
