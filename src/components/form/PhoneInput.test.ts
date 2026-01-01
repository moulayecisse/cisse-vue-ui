import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput from './PhoneInput.vue'

describe('PhoneInput', () => {
  it('renders a tel input', () => {
    const wrapper = mount(PhoneInput)
    expect(wrapper.find('input[type="tel"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '612345678',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect((wrapper.find('input[type="tel"]').element as HTMLInputElement).value).toBe('612345678')

    await wrapper.find('input[type="tel"]').setValue('698765432')
    expect(wrapper.props('modelValue')).toBe('698765432')
  })

  it('shows default country flag (France)', () => {
    const wrapper = mount(PhoneInput)
    expect(wrapper.text()).toContain('🇫🇷')
  })

  it('shows country dial code', () => {
    const wrapper = mount(PhoneInput)
    expect(wrapper.text()).toContain('+33')
  })

  it('opens country dropdown on button click', async () => {
    const wrapper = mount(PhoneInput)

    expect(wrapper.find('.max-h-48').exists()).toBe(false)

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.max-h-48').exists()).toBe(true)
  })

  it('filters countries by search', async () => {
    const wrapper = mount(PhoneInput)

    await wrapper.find('button').trigger('click')

    const searchInput = wrapper.findAll('input')[1] // Second input is search
    await searchInput.setValue('United')

    const countryItems = wrapper.findAll('li')
    expect(countryItems.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('United Kingdom')
  })

  it('selects a different country', async () => {
    const wrapper = mount(PhoneInput)

    await wrapper.find('button').trigger('click')

    // Click on United States
    const usItem = wrapper.findAll('li').find((li) => li.text().includes('United States'))
    await usItem?.trigger('click')

    expect(wrapper.text()).toContain('🇺🇸')
    expect(wrapper.text()).toContain('+1')
  })

  it('removes non-numeric characters from input', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input[type="tel"]')
    await input.setValue('123-456-7890')

    expect(wrapper.props('modelValue')).toBe('1234567890')
  })

  it('applies placeholder', () => {
    const wrapper = mount(PhoneInput, {
      props: { placeholder: 'Enter phone' },
    })

    expect(wrapper.find('input[type="tel"]').attributes('placeholder')).toBe('Enter phone')
  })

  it('applies disabled state', () => {
    const wrapper = mount(PhoneInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input[type="tel"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(PhoneInput, {
      props: { name: 'phone' },
    })

    expect(wrapper.find('input[type="tel"]').attributes('name')).toBe('phone')
  })

  it('sets required attribute', () => {
    const wrapper = mount(PhoneInput, {
      props: { required: true },
    })

    expect(wrapper.find('input[type="tel"]').attributes('required')).toBeDefined()
  })

  it('uses custom default country', () => {
    const wrapper = mount(PhoneInput, {
      props: { defaultCountry: 'US' },
    })

    expect(wrapper.text()).toContain('🇺🇸')
    expect(wrapper.text()).toContain('+1')
  })

  it('exposes fullNumber computed', () => {
    const wrapper = mount(PhoneInput, {
      props: { modelValue: '612345678' },
    })

    expect(wrapper.vm.fullNumber).toBe('+33612345678')
  })

  it('exposes selectedCountry', () => {
    const wrapper = mount(PhoneInput)

    expect(wrapper.vm.selectedCountry.code).toBe('FR')
  })

  it('renders custom countries list', () => {
    const customCountries = [
      { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
      { code: 'SN', name: 'Senegal', dialCode: '+221', flag: '🇸🇳' },
    ]

    const wrapper = mount(PhoneInput, {
      props: {
        countries: customCountries,
        defaultCountry: 'ML',
      },
    })

    expect(wrapper.text()).toContain('🇲🇱')
  })
})
