import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextArea from './TextArea.vue'

describe('TextArea', () => {
  it('renders with label', () => {
    const wrapper = mount(TextArea, {
      props: {
        label: 'Description',
      },
    })
    expect(wrapper.text()).toContain('Description')
  })

  it('renders placeholder', () => {
    const wrapper = mount(TextArea, {
      props: {
        placeholder: 'Enter text...',
      },
    })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text...')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(TextArea)
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello World')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello World'])
  })

  it('displays hint text', () => {
    const wrapper = mount(TextArea, {
      props: {
        hint: 'This is a hint',
      },
    })
    expect(wrapper.text()).toContain('This is a hint')
  })

  it('displays error message', () => {
    const wrapper = mount(TextArea, {
      props: {
        error: 'This field is required',
      },
    })
    expect(wrapper.text()).toContain('This field is required')
  })

  it('respects rows prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        rows: 5,
      },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('respects maxLength prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        maxLength: 100,
      },
    })
    expect(wrapper.find('textarea').attributes('maxlength')).toBe('100')
  })

  it('shows character count when showCount is true', () => {
    const wrapper = mount(TextArea, {
      props: {
        modelValue: 'Hello',
        showCount: true,
      },
    })
    expect(wrapper.text()).toContain('5')
  })

  it('shows character count with max when maxLength is set', () => {
    const wrapper = mount(TextArea, {
      props: {
        modelValue: 'Hello',
        maxLength: 100,
      },
    })
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('100')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(TextArea, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('is readonly when readonly prop is true', () => {
    const wrapper = mount(TextArea, {
      props: {
        readonly: true,
      },
    })
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  })

  it('applies resize-none class when resize is none', () => {
    const wrapper = mount(TextArea, {
      props: {
        resize: 'none',
      },
    })
    expect(wrapper.find('textarea').classes()).toContain('resize-none')
  })

  it('applies resize-y class when resize is vertical', () => {
    const wrapper = mount(TextArea, {
      props: {
        resize: 'vertical',
      },
    })
    expect(wrapper.find('textarea').classes()).toContain('resize-y')
  })
})
