import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'

describe('NumberInput', () => {
  it('renders a number input', () => {
    const wrapper = mount(NumberInput)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 5,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('5')
  })

  it('shows stepper buttons by default', () => {
    const wrapper = mount(NumberInput)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('hides stepper buttons when showStepper is false', () => {
    const wrapper = mount(NumberInput, {
      props: { showStepper: false },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('increments value on plus button click', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 5,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // Plus button

    expect(wrapper.props('modelValue')).toBe(6)
  })

  it('decrements value on minus button click', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 5,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // Minus button

    expect(wrapper.props('modelValue')).toBe(4)
  })

  it('respects min constraint', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 0,
        min: 0,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click') // Try to decrement below min

    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('respects max constraint', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 10,
        max: 10,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // Try to increment above max

    expect(wrapper.props('modelValue')).toBe(10)
  })

  it('uses custom step', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 0,
        step: 5,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.props('modelValue')).toBe(5)
  })

  it('disables minus button at min value', () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 0,
        min: 0,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('disables plus button at max value', () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 10,
        max: 10,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('applies disabled state to all elements', () => {
    const wrapper = mount(NumberInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(NumberInput, {
      props: { name: 'quantity' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('quantity')
  })

  it('sets required attribute', () => {
    const wrapper = mount(NumberInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('handles null value', () => {
    const wrapper = mount(NumberInput, {
      props: { modelValue: null },
    })

    expect(wrapper.find('input').element.value).toBe('')
  })

  it('starts from 0 when incrementing null value', async () => {
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.props('modelValue')).toBe(1)
  })
})
