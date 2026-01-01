import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormInput from './FormInput.vue'

describe('FormInput', () => {
  it('renders an input element', () => {
    const wrapper = mount(FormInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('has text type by default', () => {
    const wrapper = mount(FormInput)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('accepts different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url']

    types.forEach((type) => {
      const wrapper = mount(FormInput, {
        props: { type },
      })
      expect(wrapper.find('input').attributes('type')).toBe(type)
    })
  })

  it('binds v-model correctly', async () => {
    let currentValue = 'initial'
    const wrapper = mount(FormInput, {
      props: {
        modelValue: currentValue,
        'onUpdate:modelValue': (value: string | undefined) => {
          currentValue = value ?? ''
          wrapper.setProps({ modelValue: currentValue })
        },
      },
    })

    expect(wrapper.find('input').element.value).toBe('initial')

    await wrapper.find('input').setValue('updated')
    expect(wrapper.props('modelValue')).toBe('updated')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(FormInput)

    await wrapper.find('input').setValue('test value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test value'])
  })

  it('sets placeholder attribute', () => {
    const wrapper = mount(FormInput, {
      props: {
        placeholder: 'Enter your name',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your name')
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(FormInput, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets id attribute from id prop', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'custom-id',
      },
    })

    expect(wrapper.find('input').attributes('id')).toBe('custom-id')
  })

  it('sets id attribute from name prop when id is not provided', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'field-name',
      },
    })

    expect(wrapper.find('input').attributes('id')).toBe('field-name')
  })

  it('prefers id over name for id attribute', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'custom-id',
        name: 'field-name',
      },
    })

    expect(wrapper.find('input').attributes('id')).toBe('custom-id')
  })

  it('sets name attribute', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'field-name',
      },
    })

    expect(wrapper.find('input').attributes('name')).toBe('field-name')
  })

  it('passes through additional attributes', () => {
    const wrapper = mount(FormInput, {
      attrs: {
        'aria-label': 'Test input',
        'data-testid': 'input-test',
        maxlength: '100',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-label')).toBe('Test input')
    expect(input.attributes('data-testid')).toBe('input-test')
    expect(input.attributes('maxlength')).toBe('100')
  })

  it('applies base styling classes', () => {
    const wrapper = mount(FormInput)
    const input = wrapper.find('input')

    expect(input.classes()).toContain('w-full')
    expect(input.classes()).toContain('rounded-xl')
    expect(input.classes()).toContain('border')
  })

  it('input element is focusable', () => {
    const wrapper = mount(FormInput)

    const input = wrapper.find('input')

    // Input should exist and not be disabled by default
    expect(input.exists()).toBe(true)
    expect(input.attributes('disabled')).toBeUndefined()
  })

  it('handles empty string value', async () => {
    const wrapper = mount(FormInput, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.find('input').element.value).toBe('')
  })
})
