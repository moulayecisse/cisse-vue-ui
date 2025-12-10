import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('is unchecked by default', () => {
    const wrapper = mount(Checkbox)
    const input = wrapper.find('input')
    expect(input.element.checked).toBe(false)
  })

  it('reflects modelValue state', () => {
    const wrapperChecked = mount(Checkbox, {
      props: { modelValue: true },
    })
    expect(wrapperChecked.find('input').element.checked).toBe(true)

    const wrapperUnchecked = mount(Checkbox, {
      props: { modelValue: false },
    })
    expect(wrapperUnchecked.find('input').element.checked).toBe(false)
  })

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
    })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits false when unchecked', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true },
    })

    await wrapper.find('input').setValue(false)

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('renders label when provided', () => {
    const wrapper = mount(Checkbox, {
      props: {
        label: 'Accept terms',
      },
    })

    expect(wrapper.text()).toContain('Accept terms')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Checkbox, {
      props: {
        description: 'I agree to the terms and conditions',
      },
    })

    expect(wrapper.text()).toContain('I agree to the terms and conditions')
  })

  it('renders both label and description', () => {
    const wrapper = mount(Checkbox, {
      props: {
        label: 'Subscribe',
        description: 'Get weekly newsletter',
      },
    })

    expect(wrapper.text()).toContain('Subscribe')
    expect(wrapper.text()).toContain('Get weekly newsletter')
  })

  it('does not render label container when no label or description', () => {
    const wrapper = mount(Checkbox)
    const labelDivs = wrapper.findAll('.flex-col')
    expect(labelDivs.length).toBe(0)
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies disabled styling to label', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: true },
    })

    expect(wrapper.find('label').classes()).toContain('cursor-not-allowed')
    expect(wrapper.find('label').classes()).toContain('opacity-50')
  })

  it('applies cursor-pointer when not disabled', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: false },
    })

    expect(wrapper.find('label').classes()).toContain('cursor-pointer')
  })

  it('supports indeterminate state', () => {
    const wrapper = mount(Checkbox, {
      props: { indeterminate: true },
    })

    expect(wrapper.find('input').element.indeterminate).toBe(true)
  })

  it('indeterminate does not affect checked state', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        indeterminate: true,
      },
    })

    expect(wrapper.find('input').element.checked).toBe(false)
    expect(wrapper.find('input').element.indeterminate).toBe(true)
  })

  it('clicking label toggles checkbox', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Click me',
      },
    })

    await wrapper.find('input').trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('applies styling classes', () => {
    const wrapper = mount(Checkbox)
    const input = wrapper.find('input')

    expect(input.classes()).toContain('rounded')
    expect(input.classes()).toContain('border-gray-300')
  })
})
