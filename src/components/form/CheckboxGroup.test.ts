import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckboxGroup from './CheckboxGroup.vue'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('CheckboxGroup', () => {
  it('renders with label', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        label: 'Select options',
        options,
      },
    })
    expect(wrapper.text()).toContain('Select options')
  })

  it('renders all options', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
      },
    })
    expect(wrapper.text()).toContain('Option A')
    expect(wrapper.text()).toContain('Option B')
    expect(wrapper.text()).toContain('Option C')
  })

  it('checks selected values', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        modelValue: ['a', 'c'],
      },
    })
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
    expect(checkboxes[0].props('modelValue')).toBe(true)
    expect(checkboxes[1].props('modelValue')).toBe(false)
    expect(checkboxes[2].props('modelValue')).toBe(true)
  })

  it('emits update:modelValue when checkbox is toggled', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        modelValue: ['a'],
      },
    })
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
    await checkboxes[1].vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b']])
  })

  it('removes value when checkbox is unchecked', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        modelValue: ['a', 'b'],
      },
    })
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
    await checkboxes[0].vm.$emit('update:modelValue', false)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['b']])
  })

  it('displays hint text', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        hint: 'Select all that apply',
      },
    })
    expect(wrapper.text()).toContain('Select all that apply')
  })

  it('displays error message', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        error: 'Please select at least one option',
      },
    })
    expect(wrapper.text()).toContain('Please select at least one option')
  })

  it('disables all checkboxes when disabled prop is true', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        disabled: true,
      },
    })
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
    checkboxes.forEach((checkbox) => {
      expect(checkbox.props('disabled')).toBe(true)
    })
  })

  it('disables individual options with disabled flag', () => {
    const optionsWithDisabled = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true },
      { value: 'c', label: 'Option C' },
    ]
    const wrapper = mount(CheckboxGroup, {
      props: {
        options: optionsWithDisabled,
      },
    })
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
    expect(checkboxes[0].props('disabled')).toBeFalsy()
    expect(checkboxes[1].props('disabled')).toBe(true)
    expect(checkboxes[2].props('disabled')).toBeFalsy()
  })

  it('applies inline layout when inline prop is true', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options,
        inline: true,
      },
    })
    expect(wrapper.find('.flex.flex-wrap').exists()).toBe(true)
  })
})
