import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberType from './NumberType.vue'

describe('NumberType', () => {
  it('renders span element', () => {
    const wrapper = mount(NumberType, {
      props: { value: 123 },
    })

    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('renders formatted number', () => {
    const wrapper = mount(NumberType, {
      props: { value: 1234567 },
    })

    // Default locale is en-US
    expect(wrapper.text()).toBe('1,234,567')
  })

  it('renders number with custom locale', () => {
    const wrapper = mount(NumberType, {
      props: {
        value: 1234567.89,
        locale: 'de-DE',
      },
    })

    // German locale uses . for thousands and , for decimals
    expect(wrapper.text()).toContain('1.234.567')
  })

  it('renders empty string for null', () => {
    const wrapper = mount(NumberType, {
      props: { value: null },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders empty string for undefined', () => {
    const wrapper = mount(NumberType, {
      props: { value: undefined },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders string number as formatted number', () => {
    const wrapper = mount(NumberType, {
      props: { value: '9876543' },
    })

    expect(wrapper.text()).toBe('9,876,543')
  })

  it('renders non-numeric string as-is', () => {
    const wrapper = mount(NumberType, {
      props: { value: 'not a number' },
    })

    expect(wrapper.text()).toBe('not a number')
  })

  it('renders zero', () => {
    const wrapper = mount(NumberType, {
      props: { value: 0 },
    })

    expect(wrapper.text()).toBe('0')
  })

  it('renders negative number', () => {
    const wrapper = mount(NumberType, {
      props: { value: -1234 },
    })

    expect(wrapper.text()).toBe('-1,234')
  })

  it('renders decimal number', () => {
    const wrapper = mount(NumberType, {
      props: { value: 1234.56 },
    })

    expect(wrapper.text()).toBe('1,234.56')
  })
})
