import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextType from './TextType.vue'

describe('TextType', () => {
  it('renders span element', () => {
    const wrapper = mount(TextType, {
      props: { value: 'test' },
    })

    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('renders string value', () => {
    const wrapper = mount(TextType, {
      props: { value: 'Hello World' },
    })

    expect(wrapper.text()).toBe('Hello World')
  })

  it('renders number value as string', () => {
    const wrapper = mount(TextType, {
      props: { value: 123 },
    })

    expect(wrapper.text()).toBe('123')
  })

  it('renders empty string for null', () => {
    const wrapper = mount(TextType, {
      props: { value: null },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders empty string for undefined', () => {
    const wrapper = mount(TextType, {
      props: { value: undefined },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders boolean true as string', () => {
    const wrapper = mount(TextType, {
      props: { value: true },
    })

    expect(wrapper.text()).toBe('true')
  })

  it('renders boolean false as string', () => {
    const wrapper = mount(TextType, {
      props: { value: false },
    })

    expect(wrapper.text()).toBe('false')
  })

  it('renders object as string', () => {
    const wrapper = mount(TextType, {
      props: { value: { foo: 'bar' } },
    })

    // Vue renders objects as JSON
    expect(wrapper.text()).toContain('foo')
  })

  it('renders array as string', () => {
    const wrapper = mount(TextType, {
      props: { value: [1, 2, 3] },
    })

    // Vue renders arrays as JSON
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })
})
