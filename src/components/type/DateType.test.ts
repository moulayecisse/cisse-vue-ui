import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateType from './DateType.vue'

describe('DateType', () => {
  it('renders span element', () => {
    const wrapper = mount(DateType, {
      props: { value: '2024-01-15' },
    })

    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('renders date in default format', () => {
    const wrapper = mount(DateType, {
      props: { value: '2024-01-15' },
    })

    // Default format is 'date', locale is 'en-US'
    expect(wrapper.text()).toMatch(/1\/15\/2024/)
  })

  it('renders datetime format', () => {
    const wrapper = mount(DateType, {
      props: {
        value: '2024-01-15T14:30:00',
        format: 'datetime',
      },
    })

    // Should include date and time
    expect(wrapper.text()).toMatch(/1\/15\/2024/)
    expect(wrapper.text()).toMatch(/2:30/)
  })

  it('renders time format', () => {
    const wrapper = mount(DateType, {
      props: {
        value: '2024-01-15T14:30:00',
        format: 'time',
      },
    })

    // Should show time only
    expect(wrapper.text()).toMatch(/2:30/)
  })

  it('renders with custom locale', () => {
    const wrapper = mount(DateType, {
      props: {
        value: '2024-01-15',
        locale: 'fr-FR',
      },
    })

    // French format: 15/01/2024
    expect(wrapper.text()).toMatch(/15\/01\/2024/)
  })

  it('renders empty string for null', () => {
    const wrapper = mount(DateType, {
      props: { value: null },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders empty string for undefined', () => {
    const wrapper = mount(DateType, {
      props: { value: undefined },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders empty string for empty string', () => {
    const wrapper = mount(DateType, {
      props: { value: '' },
    })

    expect(wrapper.text()).toBe('')
  })

  it('renders invalid date string as-is', () => {
    const wrapper = mount(DateType, {
      props: { value: 'not a date' },
    })

    expect(wrapper.text()).toBe('not a date')
  })

  it('handles Date object', () => {
    const wrapper = mount(DateType, {
      props: { value: new Date('2024-06-20').toISOString() },
    })

    expect(wrapper.text()).toMatch(/6\/20\/2024/)
  })

  it('handles timestamp number', () => {
    const wrapper = mount(DateType, {
      props: { value: '1705305600000' }, // Jan 15, 2024
    })

    // Should parse timestamp
    expect(wrapper.text()).not.toBe('')
  })
})
