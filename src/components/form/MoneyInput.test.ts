import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoneyInput from './MoneyInput.vue'

describe('MoneyInput', () => {
  it('renders a text input with decimal inputmode', () => {
    const wrapper = mount(MoneyInput)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('inputmode')).toBe('decimal')
  })

  it('shows EUR symbol by default', () => {
    const wrapper = mount(MoneyInput)
    expect(wrapper.text()).toContain('€')
  })

  it('shows USD symbol when currency is USD', () => {
    const wrapper = mount(MoneyInput, {
      props: { currency: 'USD' },
    })
    expect(wrapper.text()).toContain('$')
  })

  it('shows CFA symbol when currency is XOF', () => {
    const wrapper = mount(MoneyInput, {
      props: { currency: 'XOF' },
    })
    expect(wrapper.text()).toContain('CFA')
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: 1234.56,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    // Value should be formatted
    const input = wrapper.find('input')
    expect(input.element.value).toContain('1')
    expect(input.element.value).toContain('234')
  })

  it('formats value on blur', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('1234.56')
    await input.trigger('blur')

    expect(wrapper.props('modelValue')).toBe(1234.56)
  })

  it('handles empty value', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: 100,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('blur')

    expect(wrapper.props('modelValue')).toBe(null)
  })

  it('respects min constraint', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: null,
        min: 10,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('5')
    await input.trigger('blur')

    expect(wrapper.props('modelValue')).toBe(10)
  })

  it('respects max constraint', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: null,
        max: 100,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('150')
    await input.trigger('blur')

    expect(wrapper.props('modelValue')).toBe(100)
  })

  it('applies disabled state', () => {
    const wrapper = mount(MoneyInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(MoneyInput, {
      props: { name: 'amount' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('amount')
  })

  it('sets required attribute', () => {
    const wrapper = mount(MoneyInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('aligns text to the right', () => {
    const wrapper = mount(MoneyInput)
    expect(wrapper.find('input').classes()).toContain('text-right')
  })

  it('uses custom decimal places', async () => {
    const wrapper = mount(MoneyInput, {
      props: {
        modelValue: 100,
        decimals: 0,
        'onUpdate:modelValue': (val: number | null) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    // Should not show decimal places
    expect(input.element.value).toBe('100')
  })
})
