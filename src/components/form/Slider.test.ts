import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from './Slider.vue'

describe('Slider', () => {
  it('renders range input', () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('input[type="range"]').exists()).toBe(true)
  })

  it('uses default min value of 0', () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('input').attributes('min')).toBe('0')
  })

  it('uses default max value of 100', () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('input').attributes('max')).toBe('100')
  })

  it('uses default step of 1', () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('input').attributes('step')).toBe('1')
  })

  it('uses custom min value', () => {
    const wrapper = mount(Slider, {
      props: { min: 10 },
    })

    expect(wrapper.find('input').attributes('min')).toBe('10')
  })

  it('uses custom max value', () => {
    const wrapper = mount(Slider, {
      props: { max: 200 },
    })

    expect(wrapper.find('input').attributes('max')).toBe('200')
  })

  it('uses custom step value', () => {
    const wrapper = mount(Slider, {
      props: { step: 5 },
    })

    expect(wrapper.find('input').attributes('step')).toBe('5')
  })

  it('displays modelValue', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50 },
    })

    expect(wrapper.find('input').element.value).toBe('50')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 0 },
    })

    await wrapper.find('input').setValue('75')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([75])
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(Slider, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not show value by default', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50 },
    })

    // No value display when showValue is false
    expect(wrapper.find('.font-medium').exists()).toBe(false)
  })

  it('shows value when showValue is true', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        showValue: true,
      },
    })

    expect(wrapper.text()).toContain('50')
  })

  it('shows min and max when showValue is true', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        showValue: true,
      },
    })

    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('100')
  })

  it('uses custom formatValue function', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        showValue: true,
        formatValue: (v: number) => `${v}%`,
      },
    })

    expect(wrapper.text()).toContain('50%')
  })

  it('calculates percentage correctly', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
      },
    })

    // Progress bar should have 50% width
    const progressBar = wrapper.find('.bg-primary')
    expect(progressBar.attributes('style')).toContain('50%')
  })

  it('calculates percentage with custom range', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 75,
        min: 50,
        max: 100,
      },
    })

    // (75-50)/(100-50) = 50%
    const progressBar = wrapper.find('.bg-primary')
    expect(progressBar.attributes('style')).toContain('50%')
  })

  it('has full width', () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('.w-full').exists()).toBe(true)
  })
})
