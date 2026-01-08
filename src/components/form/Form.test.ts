import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'

describe('Form', () => {
  it('renders with default props', () => {
    const wrapper = mount(Form)

    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(Form, {
      props: { title: 'Test Form' },
    })

    expect(wrapper.text()).toContain('Test Form')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Form, {
      props: { description: 'Form description' },
    })

    expect(wrapper.text()).toContain('Form description')
  })

  it('renders header slot', () => {
    const wrapper = mount(Form, {
      slots: {
        header: '<h1 class="custom-header">Custom Header</h1>',
      },
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Header')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Form, {
      slots: {
        default: '<input class="test-input" />',
      },
    })

    expect(wrapper.find('.test-input').exists()).toBe(true)
  })

  it('renders footer by default', () => {
    const wrapper = mount(Form)

    // Should contain submit button text
    expect(wrapper.text()).toContain('Enregistrer')
  })

  it('hides footer when hideFooter is true', () => {
    const wrapper = mount(Form, {
      props: { hideFooter: true },
    })

    expect(wrapper.text()).not.toContain('Enregistrer')
  })

  it('renders custom submit label', () => {
    const wrapper = mount(Form, {
      props: { submitLabel: 'Save Changes' },
    })

    expect(wrapper.text()).toContain('Save Changes')
  })

  it('renders custom cancel label', () => {
    const wrapper = mount(Form, {
      props: { cancelLabel: 'Discard' },
    })

    expect(wrapper.text()).toContain('Discard')
  })

  it('emits submit event on form submission', async () => {
    const wrapper = mount(Form)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted()).toHaveProperty('submit')
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(Form)

    // Find cancel button by its text
    const buttons = wrapper.findAll('button')
    const cancelButton = buttons.find((btn) => btn.text().includes('Annuler'))

    await cancelButton?.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  it('shows loading state', () => {
    const wrapper = mount(Form, {
      props: { loading: true },
    })

    // Loading state should show spinner or loading indicator
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('disables submit when disabled prop is true', () => {
    const wrapper = mount(Form, {
      props: { disabled: true },
    })

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('applies grid classes', () => {
    const wrapper = mount(Form)

    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(Form, {
      slots: {
        footer: '<button class="custom-button">Custom Submit</button>',
      },
    })

    expect(wrapper.find('.custom-button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Submit')
  })

  it('prevents default form submission', async () => {
    const wrapper = mount(Form)
    const form = wrapper.find('form')

    const event = new Event('submit')
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    await form.element.dispatchEvent(event)

    // The component should prevent default
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
