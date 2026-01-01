import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PercentInput from './PercentInput.vue'

describe('PercentInput', () => {
  it('renders a number input', () => {
    const wrapper = mount(PercentInput)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('shows percent symbol', () => {
    const wrapper = mount(PercentInput)
    expect(wrapper.text()).toContain('%')
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(PercentInput, {
      props: {
        modelValue: 50,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('50')
  })

  it('respects default min of 0', async () => {
    const wrapper = mount(PercentInput, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('-10')

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('respects default max of 100', async () => {
    const wrapper = mount(PercentInput, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('150')

    expect(wrapper.props('modelValue')).toBe(100)
  })

  it('allows custom min/max', async () => {
    const wrapper = mount(PercentInput, {
      props: {
        modelValue: null,
        min: 10,
        max: 90,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('5')
    expect(wrapper.props('modelValue')).toBe(10)

    await input.setValue('95')
    expect(wrapper.props('modelValue')).toBe(90)
  })

  it('handles empty value', async () => {
    const wrapper = mount(PercentInput, {
      props: {
        modelValue: 50,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('')

    expect(wrapper.props('modelValue')).toBe(null)
  })

  it('applies disabled state', () => {
    const wrapper = mount(PercentInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(PercentInput, {
      props: { name: 'discount' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('discount')
  })

  it('sets required attribute', () => {
    const wrapper = mount(PercentInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('aligns text to the right', () => {
    const wrapper = mount(PercentInput)
    expect(wrapper.find('input').classes()).toContain('text-right')
  })

  it('has decimal inputmode', () => {
    const wrapper = mount(PercentInput)
    expect(wrapper.find('input').attributes('inputmode')).toBe('decimal')
  })
})
