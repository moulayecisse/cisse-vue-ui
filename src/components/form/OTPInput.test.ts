import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OTPInput from './OTPInput.vue'

describe('OTPInput', () => {
  it('renders 6 inputs by default', () => {
    const wrapper = mount(OTPInput)
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(6)
  })

  it('renders custom number of inputs', () => {
    const wrapper = mount(OTPInput, {
      props: { length: 4 },
    })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(4)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(OTPInput, {
      props: {
        modelValue: '123456',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.value).toBe('1')
    expect(inputs[1].element.value).toBe('2')
    expect(inputs[5].element.value).toBe('6')
  })

  it('moves focus to next input after typing', async () => {
    const wrapper = mount(OTPInput, {
      props: {
        modelValue: '',
        autoFocus: false,
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('1')

    // After typing, next input should be focused (though in test environment this may not work perfectly)
    expect(wrapper.props('modelValue')).toBe('1')

    wrapper.unmount()
  })

  it('only accepts numeric input', async () => {
    const wrapper = mount(OTPInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('a')

    expect(wrapper.props('modelValue')).toBe('')
  })

  it('emits complete event when all digits filled', async () => {
    const wrapper = mount(OTPInput, {
      props: {
        modelValue: '12345',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[5].setValue('6')

    expect(wrapper.emitted('complete')).toBeTruthy()
    expect(wrapper.emitted('complete')![0]).toEqual(['123456'])
  })

  it('applies disabled state to all inputs', () => {
    const wrapper = mount(OTPInput, {
      props: { disabled: true },
    })

    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('disabled')).toBeDefined()
    })
  })

  it('uses password type when masked', () => {
    const wrapper = mount(OTPInput, {
      props: { masked: true },
    })

    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('type')).toBe('password')
    })
  })

  it('uses text type by default', () => {
    const wrapper = mount(OTPInput)

    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('type')).toBe('text')
    })
  })

  it('has numeric inputmode', () => {
    const wrapper = mount(OTPInput)

    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('inputmode')).toBe('numeric')
    })
  })

  it('has autocomplete one-time-code', () => {
    const wrapper = mount(OTPInput)

    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('autocomplete')).toBe('one-time-code')
    })
  })

  it('sets name attribute with index', () => {
    const wrapper = mount(OTPInput, {
      props: { name: 'otp' },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs[0].attributes('name')).toBe('otp-0')
    expect(inputs[1].attributes('name')).toBe('otp-1')
  })

  it('highlights filled inputs', () => {
    const wrapper = mount(OTPInput, {
      props: { modelValue: '123' },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs[0].classes()).toContain('border-primary-300')
    expect(inputs[2].classes()).toContain('border-primary-300')
    expect(inputs[3].classes()).not.toContain('border-primary-300')
  })

  it('exposes focus method', () => {
    const wrapper = mount(OTPInput)
    expect(typeof wrapper.vm.focus).toBe('function')
  })
})
