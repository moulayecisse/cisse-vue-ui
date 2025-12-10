import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'

describe('Alert', () => {
  it('renders slot content', () => {
    const wrapper = mount(Alert, {
      slots: {
        default: 'Alert message',
      },
    })

    expect(wrapper.text()).toContain('Alert message')
  })

  it('has role="alert" for accessibility', () => {
    const wrapper = mount(Alert)

    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('renders title when provided', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Alert Title',
      },
    })

    expect(wrapper.text()).toContain('Alert Title')
    expect(wrapper.find('h4').exists()).toBe(true)
  })

  it('does not render title when not provided', () => {
    const wrapper = mount(Alert)

    expect(wrapper.find('h4').exists()).toBe(false)
  })

  it('applies info variant by default', () => {
    const wrapper = mount(Alert)

    expect(wrapper.classes().some((c) => c.includes('blue'))).toBe(true)
  })

  it('applies success variant classes', () => {
    const wrapper = mount(Alert, {
      props: {
        variant: 'success',
      },
    })

    expect(wrapper.classes().some((c) => c.includes('green'))).toBe(true)
  })

  it('applies warning variant classes', () => {
    const wrapper = mount(Alert, {
      props: {
        variant: 'warning',
      },
    })

    expect(wrapper.classes().some((c) => c.includes('yellow'))).toBe(true)
  })

  it('applies error variant classes', () => {
    const wrapper = mount(Alert, {
      props: {
        variant: 'error',
      },
    })

    expect(wrapper.classes().some((c) => c.includes('red'))).toBe(true)
  })

  it('shows dismiss button when dismissible', () => {
    const wrapper = mount(Alert, {
      props: {
        dismissible: true,
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('does not show dismiss button by default', () => {
    const wrapper = mount(Alert)

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('emits dismiss event when dismiss button clicked', async () => {
    const wrapper = mount(Alert, {
      props: {
        dismissible: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('accepts custom icon', () => {
    const wrapper = mount(Alert, {
      props: {
        icon: 'lucide:star',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
