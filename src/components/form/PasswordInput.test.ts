import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordInput from './PasswordInput.vue'

describe('PasswordInput', () => {
  it('renders a password input by default', () => {
    const wrapper = mount(PasswordInput)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'secret123',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('secret123')

    await wrapper.find('input').setValue('newpassword')
    expect(wrapper.props('modelValue')).toBe('newpassword')
  })

  it('shows lock icon', () => {
    const wrapper = mount(PasswordInput)
    expect(wrapper.find('.size-5').exists()).toBe(true)
  })

  it('toggles password visibility on button click', async () => {
    const wrapper = mount(PasswordInput)

    // Initially password type
    expect(wrapper.find('input').attributes('type')).toBe('password')

    // Click toggle button
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')

    // Click again to hide
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('applies placeholder', () => {
    const wrapper = mount(PasswordInput, {
      props: { placeholder: 'Enter your password' },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your password')
  })

  it('applies disabled state', () => {
    const wrapper = mount(PasswordInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows strength indicator when enabled', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'password123',
        showStrength: true,
      },
    })

    expect(wrapper.find('.h-1\\.5').exists()).toBe(true)
  })

  it('does not show strength indicator by default', () => {
    const wrapper = mount(PasswordInput, {
      props: { modelValue: 'password123' },
    })

    expect(wrapper.find('.h-1\\.5').exists()).toBe(false)
  })

  it('calculates weak password strength', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'abc',
        showStrength: true,
      },
    })

    expect(wrapper.find('.bg-red-500').exists()).toBe(true)
    expect(wrapper.text()).toContain('Weak')
  })

  it('calculates strong password strength', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'MyStr0ng!Pass@123',
        showStrength: true,
      },
    })

    expect(wrapper.find('.bg-emerald-500').exists()).toBe(true)
    expect(wrapper.text()).toContain('Strong')
  })

  it('sets name attribute', () => {
    const wrapper = mount(PasswordInput, {
      props: { name: 'user-password' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('user-password')
  })

  it('sets id from id prop', () => {
    const wrapper = mount(PasswordInput, {
      props: { id: 'custom-id' },
    })

    expect(wrapper.find('input').attributes('id')).toBe('custom-id')
  })

  it('sets id from name if id not provided', () => {
    const wrapper = mount(PasswordInput, {
      props: { name: 'password-field' },
    })

    expect(wrapper.find('input').attributes('id')).toBe('password-field')
  })

  it('sets required attribute', () => {
    const wrapper = mount(PasswordInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('has autocomplete attribute for new password', () => {
    const wrapper = mount(PasswordInput)
    expect(wrapper.find('input').attributes('autocomplete')).toBe('new-password')
  })

  it('does not show strength indicator when password is empty', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: '',
        showStrength: true,
      },
    })

    expect(wrapper.find('.h-1\\.5').exists()).toBe(false)
  })

  it('updates strength when password changes', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: 'weak',
        showStrength: true,
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.text()).toContain('Weak')

    await wrapper.setProps({ modelValue: 'StrongP@ss123!' })
    expect(wrapper.text()).toContain('Strong')
  })
})
