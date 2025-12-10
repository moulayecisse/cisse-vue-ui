import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormGroup from './FormGroup.vue'

describe('FormGroup', () => {
  it('renders container div', () => {
    const wrapper = mount(FormGroup)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(FormGroup, {
      props: { label: 'Username' },
    })

    expect(wrapper.text()).toContain('Username')
  })

  it('renders FormInput by default', () => {
    const wrapper = mount(FormGroup, {
      props: { label: 'Email' },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders FormSelect when select=true', () => {
    const wrapper = mount(FormGroup, {
      props: {
        label: 'Country',
        select: true,
        options: [{ value: 'us', label: 'USA' }],
      },
    })

    // FormSelect renders a button trigger
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows error message when error is string', () => {
    const wrapper = mount(FormGroup, {
      props: {
        label: 'Field',
        error: 'This field is required',
      },
    })

    expect(wrapper.text()).toContain('This field is required')
  })

  it('does not show error when error is boolean', () => {
    const wrapper = mount(FormGroup, {
      props: {
        label: 'Field',
        error: true,
      },
    })

    // FormHelp should not render for boolean error
    expect(wrapper.findComponent({ name: 'FormHelp' }).exists()).toBe(false)
  })

  it('applies grid column span', () => {
    const wrapper = mount(FormGroup, {
      props: { cols: 4 },
    })

    expect(wrapper.element.style.gridColumn).toBe('span 4 / span 4')
  })

  it('uses default cols of 6', () => {
    const wrapper = mount(FormGroup)

    expect(wrapper.element.style.gridColumn).toBe('span 6 / span 6')
  })

  it('can be hidden', () => {
    const wrapper = mount(FormGroup, {
      props: { hidden: true },
    })

    expect(wrapper.attributes('hidden')).toBeDefined()
  })

  it('renders slot content instead of default', () => {
    const wrapper = mount(FormGroup, {
      slots: {
        default: '<div class="custom-content">Custom</div>',
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  it('renders label slot', () => {
    const wrapper = mount(FormGroup, {
      slots: {
        label: '<span class="custom-label">Custom Label</span>',
      },
    })

    expect(wrapper.find('.custom-label').exists()).toBe(true)
  })

  it('renders input slot', () => {
    const wrapper = mount(FormGroup, {
      props: { label: 'Field' },
      slots: {
        input: '<input class="custom-input" />',
      },
    })

    expect(wrapper.find('.custom-input').exists()).toBe(true)
  })

  it('passes id to label htmlFor', () => {
    const wrapper = mount(FormGroup, {
      props: {
        label: 'Email',
        id: 'email-field',
      },
    })

    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe('email-field')
  })

  it('falls back to name for label htmlFor', () => {
    const wrapper = mount(FormGroup, {
      props: {
        label: 'Email',
        name: 'email',
      },
    })

    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe('email')
  })
})
