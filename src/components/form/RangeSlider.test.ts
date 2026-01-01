import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RangeSlider from './RangeSlider.vue'

describe('RangeSlider', () => {
  it('renders slider track', () => {
    const wrapper = mount(RangeSlider)
    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('renders two handles', () => {
    const wrapper = mount(RangeSlider)
    const handles = wrapper.findAll('.size-5')
    expect(handles.length).toBe(2)
  })

  it('displays default values', () => {
    const wrapper = mount(RangeSlider, {
      props: { showLabels: true },
    })
    expect(wrapper.text()).toContain('25')
    expect(wrapper.text()).toContain('75')
  })

  it('displays custom values', () => {
    const wrapper = mount(RangeSlider, {
      props: { modelValue: [10, 90], showLabels: true },
    })
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('90')
  })

  it('shows min/max labels', () => {
    const wrapper = mount(RangeSlider, {
      props: { min: 0, max: 100, showMinMax: true },
    })
    const labels = wrapper.findAll('.text-xs')
    expect(labels.length).toBeGreaterThan(0)
  })

  it('hides min/max labels when showMinMax is false', () => {
    const wrapper = mount(RangeSlider, {
      props: { showMinMax: false, showLabels: false },
    })
    expect(wrapper.find('.text-xs').exists()).toBe(false)
  })

  it('hides value labels when showLabels is false', () => {
    const wrapper = mount(RangeSlider, {
      props: { showLabels: false },
    })
    expect(wrapper.find('.font-medium').exists()).toBe(false)
  })

  it('applies disabled styling', () => {
    const wrapper = mount(RangeSlider, {
      props: { disabled: true },
    })
    expect(wrapper.find('.cursor-not-allowed').exists()).toBe(true)
  })

  it('renders active range with correct position', () => {
    const wrapper = mount(RangeSlider, {
      props: { modelValue: [25, 75], min: 0, max: 100 },
    })
    const range = wrapper.find('.bg-primary-500')
    expect(range.exists()).toBe(true)
    expect(range.attributes('style')).toContain('left: 25%')
    expect(range.attributes('style')).toContain('width: 50%')
  })

  it('positions min handle correctly', () => {
    const wrapper = mount(RangeSlider, {
      props: { modelValue: [20, 80], min: 0, max: 100 },
    })
    const handles = wrapper.findAll('.size-5')
    expect(handles[0].attributes('style')).toContain('left: 20%')
  })

  it('positions max handle correctly', () => {
    const wrapper = mount(RangeSlider, {
      props: { modelValue: [20, 80], min: 0, max: 100 },
    })
    const handles = wrapper.findAll('.size-5')
    expect(handles[1].attributes('style')).toContain('left: 80%')
  })

  it('uses custom format function', () => {
    const wrapper = mount(RangeSlider, {
      props: {
        modelValue: [50, 150],
        min: 0,
        max: 200,
        showLabels: true,
        formatLabel: (v: number) => `$${v}`,
      },
    })
    expect(wrapper.text()).toContain('$50')
    expect(wrapper.text()).toContain('$150')
  })

  it('applies cursor-grab to handles', () => {
    const wrapper = mount(RangeSlider)
    const handle = wrapper.find('.cursor-grab')
    expect(handle.exists()).toBe(true)
  })

  it('applies disabled handle styling', () => {
    const wrapper = mount(RangeSlider, {
      props: { disabled: true },
    })
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
  })

  it('renders with custom min/max', () => {
    const wrapper = mount(RangeSlider, {
      props: { min: 100, max: 500, modelValue: [200, 400], showMinMax: true },
    })
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('500')
  })

  describe('track interaction', () => {
    it('track is clickable', () => {
      const wrapper = mount(RangeSlider)
      const track = wrapper.find('.cursor-pointer')
      expect(track.exists()).toBe(true)
    })

    it('track has correct height', () => {
      const wrapper = mount(RangeSlider)
      expect(wrapper.find('.h-2').exists()).toBe(true)
    })
  })

  describe('handles', () => {
    it('handles have border', () => {
      const wrapper = mount(RangeSlider)
      expect(wrapper.find('.border-2').exists()).toBe(true)
    })

    it('handles have shadow', () => {
      const wrapper = mount(RangeSlider)
      expect(wrapper.find('.shadow').exists()).toBe(true)
    })

    it('handles are positioned with translate', () => {
      const wrapper = mount(RangeSlider)
      expect(wrapper.find('.-translate-y-1\\/2').exists()).toBe(true)
      expect(wrapper.find('.-translate-x-1\\/2').exists()).toBe(true)
    })
  })
})
