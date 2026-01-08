import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from './Select.vue'
import Option from './Option.vue'

describe('Select', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  it('renders with default props', () => {
    const wrapper = mount(Select)

    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders options from props', () => {
    const wrapper = mount(Select, {
      props: { options: defaultOptions },
    })

    const options = wrapper.findAll('option')
    // +1 for placeholder option
    expect(options.length).toBe(defaultOptions.length + 1)
  })

  it('renders placeholder option', () => {
    const wrapper = mount(Select, {
      props: { placeholder: 'Select something' },
    })

    const placeholder = wrapper.find('option[disabled]')
    expect(placeholder.exists()).toBe(true)
    expect(placeholder.text()).toBe('Select something')
  })

  it('updates v-model on selection', async () => {
    let currentValue: string | number | null | undefined = null
    const wrapper = mount(Select, {
      props: {
        options: defaultOptions,
        modelValue: currentValue,
        'onUpdate:modelValue': (value: string | number | null | undefined) => {
          currentValue = value
          wrapper.setProps({ modelValue: value })
        },
      },
    })

    await wrapper.find('select').setValue('option2')

    expect(wrapper.props('modelValue')).toBe('option2')
  })

  it('applies disabled state', () => {
    const wrapper = mount(Select, {
      props: { disabled: true },
    })

    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })

  it('applies required state', () => {
    const wrapper = mount(Select, {
      props: { required: true },
    })

    expect(wrapper.find('select').attributes('required')).toBeDefined()
  })

  it('applies name attribute', () => {
    const wrapper = mount(Select, {
      props: { name: 'mySelect' },
    })

    expect(wrapper.find('select').attributes('name')).toBe('mySelect')
  })

  it('applies id attribute', () => {
    const wrapper = mount(Select, {
      props: { id: 'mySelectId' },
    })

    expect(wrapper.find('select').attributes('id')).toBe('mySelectId')
  })

  it('renders slot content instead of options prop', () => {
    const wrapper = mount(Select, {
      slots: {
        default: `
          <option value="custom1">Custom Option 1</option>
          <option value="custom2">Custom Option 2</option>
        `,
      },
    })

    expect(wrapper.text()).toContain('Custom Option 1')
    expect(wrapper.text()).toContain('Custom Option 2')
  })

  it('renders disabled options', () => {
    const optionsWithDisabled = [
      { value: 'enabled', label: 'Enabled' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ]

    const wrapper = mount(Select, {
      props: { options: optionsWithDisabled },
    })

    const disabledOption = wrapper.find('option[value="disabled"]')
    expect(disabledOption.attributes('disabled')).toBeDefined()
  })

  it('applies custom class', () => {
    const wrapper = mount(Select, {
      props: { class: 'my-custom-class' },
    })

    expect(wrapper.find('select').classes()).toContain('my-custom-class')
  })

  it('shows chevron icon', () => {
    const wrapper = mount(Select)

    // Should have an icon (SVG or Icon component)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})

describe('Option', () => {
  it('renders with default props', () => {
    const wrapper = mount(Option, {
      slots: { default: 'Option text' },
    })

    expect(wrapper.find('option').exists()).toBe(true)
    expect(wrapper.text()).toBe('Option text')
  })

  it('applies value attribute', () => {
    const wrapper = mount(Option, {
      props: { value: 'myValue' },
      slots: { default: 'Option' },
    })

    expect(wrapper.find('option').attributes('value')).toBe('myValue')
  })

  it('applies disabled attribute', () => {
    const wrapper = mount(Option, {
      props: { disabled: true },
      slots: { default: 'Option' },
    })

    expect(wrapper.find('option').attributes('disabled')).toBeDefined()
  })

  it('applies selected attribute', () => {
    const wrapper = mount(Option, {
      props: { selected: true },
      slots: { default: 'Option' },
    })

    expect(wrapper.find('option').attributes('selected')).toBeDefined()
  })

  it('applies custom class', () => {
    const wrapper = mount(Option, {
      props: { class: 'my-option-class' },
      slots: { default: 'Option' },
    })

    expect(wrapper.find('option').classes()).toContain('my-option-class')
  })

  it('renders slot content', () => {
    const wrapper = mount(Option, {
      slots: { default: '<span>Complex content</span>' },
    })

    expect(wrapper.text()).toContain('Complex content')
  })
})
