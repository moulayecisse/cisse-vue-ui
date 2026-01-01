import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorPicker from './ColorPicker.vue'

describe('ColorPicker', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders trigger button', () => {
    const wrapper = mount(ColorPicker)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('displays current color value', () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ff0000' },
    })
    expect(wrapper.text()).toContain('#ff0000')
  })

  it('shows color preview swatch', () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ff0000' },
    })
    const swatch = wrapper.find('.size-6')
    expect(swatch.attributes('style')).toContain('background-color')
    expect(swatch.attributes('style')).toContain('ff0000')
  })

  it('opens dropdown on click', async () => {
    const wrapper = mount(ColorPicker)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('closes dropdown on second click', async () => {
    const wrapper = mount(ColorPicker)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.grid').exists()).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.grid').exists()).toBe(false)
  })

  it('renders color swatches', async () => {
    const wrapper = mount(ColorPicker)
    await wrapper.find('button').trigger('click')

    const swatches = wrapper.findAll('.grid button')
    expect(swatches.length).toBe(20) // Default swatches
  })

  it('renders custom swatches', async () => {
    const customSwatches = ['#ff0000', '#00ff00', '#0000ff']
    const wrapper = mount(ColorPicker, {
      props: { swatches: customSwatches },
    })
    await wrapper.find('button').trigger('click')

    const swatches = wrapper.findAll('.grid button')
    expect(swatches.length).toBe(3)
  })

  it('emits update:modelValue when swatch clicked', async () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#000000' },
    })
    await wrapper.find('button').trigger('click')

    const swatches = wrapper.findAll('.grid button')
    await swatches[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('shows check icon on selected swatch', async () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ef4444' },
    })
    await wrapper.find('button').trigger('click')

    // Should show check icon on red swatch
    const checkIcon = wrapper.find('.grid button .size-4')
    expect(checkIcon.exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(ColorPicker, {
      props: { label: 'Choose color' },
    })
    expect(wrapper.text()).toContain('Choose color')
  })

  it('shows native color input when showInput is true', async () => {
    const wrapper = mount(ColorPicker, {
      props: { showInput: true },
    })
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('input[type="color"]').exists()).toBe(true)
  })

  it('shows hex input field', async () => {
    const wrapper = mount(ColorPicker, {
      props: { showInput: true },
    })
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('hides inputs when showInput is false', async () => {
    const wrapper = mount(ColorPicker, {
      props: { showInput: false },
    })
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('input[type="color"]').exists()).toBe(false)
    expect(wrapper.find('input[type="text"]').exists()).toBe(false)
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(ColorPicker, {
      props: { disabled: true },
    })
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.grid').exists()).toBe(false)
  })

  it('applies disabled styling', () => {
    const wrapper = mount(ColorPicker, {
      props: { disabled: true },
    })
    expect(wrapper.find('.opacity-50').exists()).toBe(true)
  })

  it('has disabled attribute on button when disabled', () => {
    const wrapper = mount(ColorPicker, {
      props: { disabled: true },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('updates hex input when color changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ff0000', showInput: true },
    })
    await wrapper.find('button').trigger('click')

    const textInput = wrapper.find('input[type="text"]')
    expect((textInput.element as HTMLInputElement).value).toBe('#ff0000')
  })
})
