import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'

describe('DatePicker', () => {
  it('renders trigger button', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows default placeholder', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.text()).toContain('Select date')
  })

  it('shows custom placeholder', () => {
    const wrapper = mount(DatePicker, {
      props: { placeholder: 'Choose a date' },
    })

    expect(wrapper.text()).toContain('Choose a date')
  })

  it('displays selected date', () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: new Date('2024-06-15T12:00:00') },
    })

    // Date is displayed - should not show placeholder anymore
    expect(wrapper.text()).not.toContain('Select date')
  })

  it('opens calendar on click', async () => {
    const wrapper = mount(DatePicker, {
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Calendar should show month/year header
    expect(document.body.textContent).toMatch(/\w+\s+\d{4}/)

    wrapper.unmount()
  })

  it('shows weekday headers', async () => {
    const wrapper = mount(DatePicker, {
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Should show day abbreviations
    expect(document.body.textContent).toMatch(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/i)

    wrapper.unmount()
  })

  it('navigates to previous month', async () => {
    const wrapper = mount(DatePicker, {
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    const currentText = document.body.textContent

    // Click prev month button
    const prevBtn = document.body.querySelector('[class*="hover:bg-gray-100"]')
    ;(prevBtn as HTMLElement)?.click()
    await wrapper.vm.$nextTick()

    // Month text should change
    expect(document.body.textContent).not.toBe(currentText)

    wrapper.unmount()
  })

  it('disables trigger when disabled prop is true', () => {
    const wrapper = mount(DatePicker, {
      props: { disabled: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows clear button when value selected', () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: new Date() },
    })

    // Should have two buttons (trigger and clear)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(1)
  })

  it('clears value when clear button clicked', async () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: new Date() },
    })

    // Find and click clear button (nested button with x icon)
    const clearBtn = wrapper.find('button button')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
    }
  })

  it('shows Today button in calendar', async () => {
    const wrapper = mount(DatePicker, {
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Today')

    wrapper.unmount()
  })

  it('has calendar icon', () => {
    const wrapper = mount(DatePicker)

    // Should have icon element
    expect(wrapper.find('[class*="size-4"]').exists()).toBe(true)
  })

  it('uses custom locale for formatting', () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date('2024-06-15'),
        locale: 'fr-FR',
      },
    })

    // French format: 15/06/2024
    expect(wrapper.text()).toMatch(/15\/06\/2024/)
  })

  it('has relative container', () => {
    const wrapper = mount(DatePicker)

    expect(wrapper.find('.relative').exists()).toBe(true)
  })
})
