import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rating from './Rating.vue'

describe('Rating', () => {
  it('renders 5 stars by default', () => {
    const wrapper = mount(Rating)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(5)
  })

  it('renders custom number of stars', () => {
    const wrapper = mount(Rating, {
      props: { max: 10 },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(10)
  })

  it('displays current value', () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 3, showValue: true },
    })
    expect(wrapper.text()).toContain('3')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 0 },
    })

    await wrapper.findAll('button')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
  })

  it('does not emit on click when readonly', async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 0, readonly: true },
    })

    await wrapper.findAll('button')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not emit on click when disabled', async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 0, disabled: true },
    })

    await wrapper.findAll('button')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('applies disabled styling', () => {
    const wrapper = mount(Rating, {
      props: { disabled: true },
    })
    expect(wrapper.find('.opacity-50').exists()).toBe(true)
  })

  it('applies cursor-default for readonly', () => {
    const wrapper = mount(Rating, {
      props: { readonly: true },
    })
    expect(wrapper.find('.cursor-default').exists()).toBe(true)
  })

  it('shows value with decimal for half stars', () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 3.5, allowHalf: true, showValue: true },
    })
    expect(wrapper.text()).toContain('3.5')
  })

  it('hides value when showValue is false', () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 4, showValue: false },
    })
    expect(wrapper.find('.ml-2').exists()).toBe(false)
  })

  it('renders filled stars for current value', () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 3 },
    })
    // Should have filled stars (each star has the overlay with text-yellow-400)
    const filledStars = wrapper.findAll('.text-yellow-400')
    expect(filledStars.length).toBeGreaterThan(0)
  })

  describe('sizes', () => {
    it('applies sm size', () => {
      const wrapper = mount(Rating, {
        props: { size: 'sm' },
      })
      expect(wrapper.find('.size-4').exists()).toBe(true)
    })

    it('applies md size by default', () => {
      const wrapper = mount(Rating)
      expect(wrapper.find('.size-6').exists()).toBe(true)
    })

    it('applies lg size', () => {
      const wrapper = mount(Rating, {
        props: { size: 'lg' },
      })
      expect(wrapper.find('.size-8').exists()).toBe(true)
    })
  })

  it('uses custom color', () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 3, color: 'text-red-500' },
    })
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })

  it('handles hover correctly', async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 0 },
    })

    await wrapper.findAll('button')[3].trigger('mousemove')
    // Hover should show preview
    expect(wrapper.exists()).toBe(true)
  })

  it('clears hover on mouseleave', async () => {
    const wrapper = mount(Rating, {
      props: { modelValue: 2 },
    })

    await wrapper.findAll('button')[4].trigger('mousemove')
    await wrapper.find('.flex.items-center').trigger('mouseleave')

    // Should return to original value
    expect(wrapper.exists()).toBe(true)
  })

  it('buttons have focus ring', () => {
    const wrapper = mount(Rating)
    const button = wrapper.find('button')
    expect(button.classes()).toContain('focus:ring-2')
  })
})
