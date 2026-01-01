import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BooleanType from './BooleanType.vue'

describe('BooleanType', () => {
  it('renders span element', () => {
    const wrapper = mount(BooleanType, {
      props: { value: true },
    })

    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('renders Yes for true', () => {
    const wrapper = mount(BooleanType, {
      props: { value: true },
    })

    expect(wrapper.text()).toBe('Yes')
  })

  it('renders No for false', () => {
    const wrapper = mount(BooleanType, {
      props: { value: false },
    })

    expect(wrapper.text()).toBe('No')
  })

  it('uses custom trueLabel', () => {
    const wrapper = mount(BooleanType, {
      props: {
        value: true,
        trueLabel: 'Active',
      },
    })

    expect(wrapper.text()).toBe('Active')
  })

  it('uses custom falseLabel', () => {
    const wrapper = mount(BooleanType, {
      props: {
        value: false,
        falseLabel: 'Inactive',
      },
    })

    expect(wrapper.text()).toBe('Inactive')
  })

  it('applies green color for true', () => {
    const wrapper = mount(BooleanType, {
      props: { value: true },
    })

    expect(wrapper.classes().some(c => c.includes('green'))).toBe(true)
  })

  it('applies red color for false', () => {
    const wrapper = mount(BooleanType, {
      props: { value: false },
    })

    expect(wrapper.classes().some(c => c.includes('red'))).toBe(true)
  })

  it('shows icon only when display="icon"', () => {
    const wrapper = mount(BooleanType, {
      props: {
        value: true,
        display: 'icon',
      },
    })

    // Should have icon but no text label
    expect(wrapper.find('.size-4').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
  })

  it('shows text only when display="text"', () => {
    const wrapper = mount(BooleanType, {
      props: {
        value: true,
        display: 'text',
      },
    })

    expect(wrapper.text()).toBe('Yes')
    // Icon should not be rendered
    expect(wrapper.find('.size-4').exists()).toBe(false)
  })

  it('shows both icon and text when display="both"', () => {
    const wrapper = mount(BooleanType, {
      props: {
        value: true,
        display: 'both',
      },
    })

    expect(wrapper.text()).toBe('Yes')
    expect(wrapper.find('.size-4').exists()).toBe(true)
  })

  it('treats truthy values as true', () => {
    const wrapper = mount(BooleanType, {
      props: { value: 'yes' },
    })

    expect(wrapper.text()).toBe('Yes')
    expect(wrapper.classes().some(c => c.includes('green'))).toBe(true)
  })

  it('treats falsy values as false', () => {
    const wrapper = mount(BooleanType, {
      props: { value: 0 },
    })

    expect(wrapper.text()).toBe('No')
    expect(wrapper.classes().some(c => c.includes('red'))).toBe(true)
  })

  it('treats null as false', () => {
    const wrapper = mount(BooleanType, {
      props: { value: null },
    })

    expect(wrapper.text()).toBe('No')
  })

  it('has inline-flex display', () => {
    const wrapper = mount(BooleanType, {
      props: { value: true },
    })

    expect(wrapper.classes()).toContain('inline-flex')
  })
})
