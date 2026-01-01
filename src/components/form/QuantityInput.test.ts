import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantityInput from './QuantityInput.vue'

describe('QuantityInput', () => {
  it('renders with default value of 1', () => {
    const wrapper = mount(QuantityInput)
    expect(wrapper.find('input').element.value).toBe('1')
  })

  it('renders increment and decrement buttons', () => {
    const wrapper = mount(QuantityInput)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 5,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('5')
  })

  it('increments value on plus button click', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 3,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // Plus button

    expect(wrapper.props('modelValue')).toBe(4)
  })

  it('decrements value on minus button click', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 3,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // Minus button

    expect(wrapper.props('modelValue')).toBe(2)
  })

  it('respects min constraint (default 1)', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 1,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // Try to decrement below min

    expect(wrapper.props('modelValue')).toBe(1)
  })

  it('respects max constraint', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 10,
        max: 10,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // Try to increment above max

    expect(wrapper.props('modelValue')).toBe(10)
  })

  it('disables minus button at min value', () => {
    const wrapper = mount(QuantityInput, {
      props: { modelValue: 1, min: 1 },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('disables plus button at max value', () => {
    const wrapper = mount(QuantityInput, {
      props: { modelValue: 10, max: 10 },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('applies disabled state to all elements', () => {
    const wrapper = mount(QuantityInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('uses custom step', async () => {
    const wrapper = mount(QuantityInput, {
      props: {
        modelValue: 5,
        step: 5,
        min: 0,
        'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.props('modelValue')).toBe(10)
  })

  it('sets name attribute', () => {
    const wrapper = mount(QuantityInput, {
      props: { name: 'qty' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('qty')
  })

  it('hides native number input spinners', () => {
    const wrapper = mount(QuantityInput)
    const input = wrapper.find('input')
    expect(input.classes().some((c) => c.includes('appearance-none'))).toBe(true)
  })
})
