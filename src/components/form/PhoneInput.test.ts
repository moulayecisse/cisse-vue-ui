import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput, { formatPhoneWithPattern, getPhoneDigits, getMaxDigitsFromPattern } from './PhoneInput.vue'

describe('PhoneInput', () => {
  it('renders a tel input', () => {
    const wrapper = mount(PhoneInput)
    expect(wrapper.find('input[type="tel"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '0612345678',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    // Display shows formatted value (French format: XX XX XX XX XX)
    expect((wrapper.find('input[type="tel"]').element as HTMLInputElement).value).toBe('06 12 34 56 78')

    await wrapper.find('input[type="tel"]').setValue('698765432')
    // Model stores raw digits
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
      props: { modelValue: '0612345678' },
    })

    expect(wrapper.vm.fullNumber).toBe('+330612345678')
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

  it('formats phone number according to country pattern', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '0612345678',
        defaultCountry: 'FR',
      },
    })

    // French format: XX XX XX XX XX
    const input = wrapper.find('input[type="tel"]').element as HTMLInputElement
    expect(input.value).toBe('06 12 34 56 78')
  })

  it('formats US phone number correctly', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '5551234567',
        defaultCountry: 'US',
      },
    })

    // US format: (XXX) XXX-XXXX
    const input = wrapper.find('input[type="tel"]').element as HTMLInputElement
    expect(input.value).toBe('(555) 123-4567')
  })

  it('detects country when typing dial code', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '',
        defaultCountry: 'FR',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input[type="tel"]')

    // Type partial dial code that doesn't match any country yet
    await input.setValue('+2')
    // Still typing - shows raw input, no country matched yet
    expect((input.element as HTMLInputElement).value).toBe('+2')

    // Type Mali dial code
    await input.setValue('+223')
    // Should detect Mali
    expect(wrapper.text()).toContain('🇲🇱')

    // Type full US number with dial code
    await input.setValue('+15551234567')
    // Should detect US and format the number
    expect(wrapper.text()).toContain('🇺🇸')
    expect(wrapper.props('modelValue')).toBe('5551234567')
  })

  it('allows typing dial code without losing input', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '',
        defaultCountry: 'FR',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input[type="tel"]')

    // Type partial dial code
    await input.setValue('+33')
    // Should detect France and clear the dial code from display
    expect(wrapper.text()).toContain('🇫🇷')
  })

  it('limits input to max digits based on country format', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '',
        defaultCountry: 'FR', // French format: # ## ## ## ## = 10 digits
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input[type="tel"]')

    // Try to enter more than 10 digits
    await input.setValue('0612345678999')
    // Should be limited to 10 digits
    expect(wrapper.props('modelValue')).toBe('0612345678')
  })

  it('limits pasted number to max digits', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '',
        defaultCountry: 'FR',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input[type="tel"]')

    // Paste a number with dial code that exceeds max
    await input.trigger('paste', {
      clipboardData: {
        getData: () => '+33612345678999',
      },
    })

    // Should be limited to 10 digits (French format)
    expect(wrapper.props('modelValue')).toBe('6123456789')
  })

  it('adjusts max digits when country changes', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        modelValue: '1234567890', // 10 digits
        defaultCountry: 'FR',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    // French format allows 10 digits
    expect(wrapper.props('modelValue')).toBe('1234567890')

    // Switch to Mali (8 digits: ## ## ## ##)
    await wrapper.find('button').trigger('click')
    const maliItem = wrapper.findAll('li').find((li) => li.text().includes('Mali'))
    await maliItem?.trigger('click')

    // Enter a new number - should be limited to 8 digits
    const input = wrapper.find('input[type="tel"]')
    await input.setValue('1234567890')
    expect(wrapper.props('modelValue')).toBe('12345678')
  })
})

describe('formatPhoneWithPattern', () => {
  it('formats phone number with French pattern', () => {
    expect(formatPhoneWithPattern('0612345678', '## ## ## ## ##')).toBe('06 12 34 56 78')
  })

  it('formats phone number with US pattern', () => {
    expect(formatPhoneWithPattern('5551234567', '(###) ###-####')).toBe('(555) 123-4567')
  })

  it('handles partial input', () => {
    expect(formatPhoneWithPattern('061', '## ## ## ## ##')).toBe('06 1')
  })

  it('returns raw value if no pattern', () => {
    expect(formatPhoneWithPattern('612345678', undefined)).toBe('612345678')
  })
})

describe('getPhoneDigits', () => {
  it('extracts digits from formatted phone', () => {
    expect(getPhoneDigits('06 12 34 56 78')).toBe('0612345678')
    expect(getPhoneDigits('(555) 123-4567')).toBe('5551234567')
  })
})

describe('getMaxDigitsFromPattern', () => {
  it('counts hash characters in French pattern', () => {
    expect(getMaxDigitsFromPattern('## ## ## ## ##')).toBe(10)
  })

  it('counts hash characters in US pattern', () => {
    expect(getMaxDigitsFromPattern('(###) ###-####')).toBe(10)
  })

  it('counts hash characters in Mali pattern', () => {
    expect(getMaxDigitsFromPattern('## ## ## ##')).toBe(8)
  })

  it('returns undefined for no pattern', () => {
    expect(getMaxDigitsFromPattern(undefined)).toBeUndefined()
  })

  it('returns 0 for pattern with no hashes', () => {
    expect(getMaxDigitsFromPattern('no digits')).toBe(0)
  })
})
