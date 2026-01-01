import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormActions from './FormActions.vue'

describe('FormActions', () => {
  it('renders submit and cancel buttons by default', () => {
    const wrapper = mount(FormActions)

    expect(wrapper.text()).toContain('Enregistrer')
    expect(wrapper.text()).toContain('Annuler')
  })

  it('renders custom labels', () => {
    const wrapper = mount(FormActions, {
      props: {
        submitLabel: 'Save',
        cancelLabel: 'Discard',
      },
    })

    expect(wrapper.text()).toContain('Save')
    expect(wrapper.text()).toContain('Discard')
  })

  it('emits submit event on submit button click', async () => {
    const wrapper = mount(FormActions)

    const buttons = wrapper.findAll('button')
    const submitButton = buttons.find(b => b.text().includes('Enregistrer'))
    await submitButton?.trigger('click')

    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('emits cancel event on cancel button click', async () => {
    const wrapper = mount(FormActions)

    const buttons = wrapper.findAll('button')
    const cancelButton = buttons.find(b => b.text().includes('Annuler'))
    await cancelButton?.trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('hides cancel button when showCancel is false', () => {
    const wrapper = mount(FormActions, {
      props: { showCancel: false },
    })

    expect(wrapper.text()).not.toContain('Annuler')
  })

  it('disables submit button when loading', () => {
    const wrapper = mount(FormActions, {
      props: { loading: true },
    })

    const submitButton = wrapper.findAllComponents({ name: 'Button' })[1]
    expect(submitButton.props('disabled')).toBe(true)
  })

  it('disables submit button when disabled', () => {
    const wrapper = mount(FormActions, {
      props: { disabled: true },
    })

    const submitButton = wrapper.findAllComponents({ name: 'Button' })[1]
    expect(submitButton.props('disabled')).toBe(true)
  })

  it('shows loading state', () => {
    const wrapper = mount(FormActions, {
      props: {
        loading: true,
        submitLabel: 'Save',
        loadingLabel: 'Saving...',
      },
    })

    expect(wrapper.text()).toContain('Saving...')
  })

  it('uses default loading label when not provided', () => {
    const wrapper = mount(FormActions, {
      props: {
        loading: true,
        submitLabel: 'Save',
      },
    })

    expect(wrapper.text()).toContain('Save...')
  })

  it('applies right alignment by default', () => {
    const wrapper = mount(FormActions)

    expect(wrapper.find('.justify-end').exists()).toBe(true)
  })

  it('applies left alignment', () => {
    const wrapper = mount(FormActions, {
      props: { align: 'left' },
    })

    expect(wrapper.find('.justify-start').exists()).toBe(true)
  })

  it('applies center alignment', () => {
    const wrapper = mount(FormActions, {
      props: { align: 'center' },
    })

    expect(wrapper.find('.justify-center').exists()).toBe(true)
  })

  it('applies stretch alignment', () => {
    const wrapper = mount(FormActions, {
      props: { align: 'stretch' },
    })

    expect(wrapper.find('[class*="flex-1"]').exists()).toBe(true)
  })

  it('applies stack on mobile classes', () => {
    const wrapper = mount(FormActions, {
      props: { stackOnMobile: true },
    })

    expect(wrapper.find('.flex-col').exists()).toBe(true)
  })

  it('passes variant to submit button', () => {
    const wrapper = mount(FormActions, {
      props: { submitVariant: 'danger' },
    })

    const submitButton = wrapper.findAllComponents({ name: 'Button' })[1]
    expect(submitButton.props('variant')).toBe('danger')
  })

  it('renders extra slot', () => {
    const wrapper = mount(FormActions, {
      slots: {
        extra: '<button class="extra-btn">Extra</button>',
      },
    })

    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })
})
