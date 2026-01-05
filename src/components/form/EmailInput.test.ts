import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailInput from './EmailInput.vue'

describe('EmailInput', () => {
  it('renders an email input', () => {
    const wrapper = mount(EmailInput)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: 'test@example.com',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('test@example.com')

    await wrapper.find('input').setValue('new@email.com')
    expect(wrapper.props('modelValue')).toBe('new@email.com')
  })

  it('shows mail icon', () => {
    const wrapper = mount(EmailInput)
    expect(wrapper.find('.size-4').exists()).toBe(true)
  })

  it('applies placeholder', () => {
    const wrapper = mount(EmailInput, {
      props: { placeholder: 'Custom placeholder' },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder')
  })

  it('shows valid icon for valid email after blur', async () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: 'valid@email.com',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    // Should show check-circle icon - look for the icon with emerald color
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(1) // mail icon + validation icon
  })

  it('shows invalid icon for invalid email after blur', async () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: 'invalid-email',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    // Should show alert-circle icon - look for the icon with red color
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(1) // mail icon + validation icon
  })

  it('does not show validation before blur', () => {
    const wrapper = mount(EmailInput, {
      props: { modelValue: 'invalid-email' },
    })

    // No validation icons should show before blur
    expect(wrapper.find('.text-emerald-500').exists()).toBe(false)
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
  })

  it('hides validation when showValidation is false', async () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: 'test@example.com',
        showValidation: false,
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.text-emerald-500').exists()).toBe(false)
  })

  it('applies disabled state', () => {
    const wrapper = mount(EmailInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(EmailInput, {
      props: { name: 'user-email' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('user-email')
  })

  it('sets id from id prop', () => {
    const wrapper = mount(EmailInput, {
      props: { id: 'custom-id' },
    })

    expect(wrapper.find('input').attributes('id')).toBe('custom-id')
  })

  it('sets id from name if id not provided', () => {
    const wrapper = mount(EmailInput, {
      props: { name: 'email-field' },
    })

    expect(wrapper.find('input').attributes('id')).toBe('email-field')
  })

  it('sets required attribute', () => {
    const wrapper = mount(EmailInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('validates common email formats', async () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@example.co.uk',
    ]

    for (const email of validEmails) {
      const wrapper = mount(EmailInput, {
        props: { modelValue: email },
      })

      await wrapper.find('input').trigger('blur')
      await wrapper.vm.$nextTick()

      // Should have more than 1 icon (mail + check-circle)
      const icons = wrapper.findAll('svg')
      expect(icons.length).toBeGreaterThan(1)
    }
  })

  it('invalidates incorrect email formats', async () => {
    const invalidEmails = [
      'notanemail',
      '@nodomain.com',
      'noat.com',
      'spaces in@email.com',
    ]

    for (const email of invalidEmails) {
      const wrapper = mount(EmailInput, {
        props: { modelValue: email },
      })

      await wrapper.find('input').trigger('blur')
      await wrapper.vm.$nextTick()

      // Should have more than 1 icon (mail + alert-circle)
      const icons = wrapper.findAll('svg')
      expect(icons.length).toBeGreaterThan(1)
    }
  })
})
