import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Caption from './Caption.vue'

describe('Caption', () => {
  it('renders caption element', () => {
    const wrapper = mount(Caption, {
      slots: { default: 'Table Caption' },
    })
    expect(wrapper.find('caption').exists()).toBe(true)
    expect(wrapper.text()).toBe('Table Caption')
  })

  it('defaults to top position', () => {
    const wrapper = mount(Caption, {
      slots: { default: 'Caption' },
    })
    expect(wrapper.find('caption').classes()).toContain('caption-top')
  })

  it('supports bottom position', () => {
    const wrapper = mount(Caption, {
      props: { position: 'bottom' },
      slots: { default: 'Caption' },
    })
    expect(wrapper.find('caption').classes()).toContain('caption-bottom')
  })

  it('applies sr-only class when srOnly is true', () => {
    const wrapper = mount(Caption, {
      props: { srOnly: true },
      slots: { default: 'Caption' },
    })
    expect(wrapper.find('caption').classes()).toContain('sr-only')
  })

  it('applies visible styling when srOnly is false', () => {
    const wrapper = mount(Caption, {
      props: { srOnly: false },
      slots: { default: 'Caption' },
    })
    const classes = wrapper.find('caption').classes()
    expect(classes).toContain('py-2')
    expect(classes).toContain('text-sm')
  })

  it('passes through additional attributes', () => {
    const wrapper = mount(Caption, {
      props: { srOnly: false },
      attrs: { id: 'table-caption', 'data-testid': 'caption' },
      slots: { default: 'Caption' },
    })
    expect(wrapper.find('caption').attributes('id')).toBe('table-caption')
    expect(wrapper.find('caption').attributes('data-testid')).toBe('caption')
  })
})
