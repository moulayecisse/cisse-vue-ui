import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from './Switch.vue'

describe('Switch', () => {
  it('renders a switch button', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('button[role="switch"]').exists()).toBe(true)
  })

  it('is off by default', () => {
    const wrapper = mount(Switch)
    const button = wrapper.find('button[role="switch"]')
    expect(button.attributes('aria-checked')).toBe('false')
  })

  it('reflects modelValue state', () => {
    const wrapperOn = mount(Switch, {
      props: { modelValue: true },
    })
    expect(wrapperOn.find('button').attributes('aria-checked')).toBe('true')

    const wrapperOff = mount(Switch, {
      props: { modelValue: false },
    })
    expect(wrapperOff.find('button').attributes('aria-checked')).toBe('false')
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('toggles value on click', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('renders label when provided', () => {
    const wrapper = mount(Switch, {
      props: {
        label: 'Enable notifications',
      },
    })

    expect(wrapper.text()).toContain('Enable notifications')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Switch, {
      props: {
        description: 'Receive email notifications',
      },
    })

    expect(wrapper.text()).toContain('Receive email notifications')
  })

  it('renders both label and description', () => {
    const wrapper = mount(Switch, {
      props: {
        label: 'Dark mode',
        description: 'Enable dark theme',
      },
    })

    expect(wrapper.text()).toContain('Dark mode')
    expect(wrapper.text()).toContain('Enable dark theme')
  })

  it('does not render label container when no label or description', () => {
    const wrapper = mount(Switch)
    const labelSpans = wrapper.findAll('.flex-col')
    expect(labelSpans.length).toBe(0)
  })

  it('applies disabled styling', () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
    })

    expect(wrapper.find('label').classes()).toContain('cursor-not-allowed')
    expect(wrapper.find('label').classes()).toContain('opacity-50')
  })

  it('applies cursor-pointer when not disabled', () => {
    const wrapper = mount(Switch, {
      props: { disabled: false },
    })

    expect(wrapper.find('label').classes()).toContain('cursor-pointer')
  })

  it('sets disabled attribute on button', () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  describe('sizes', () => {
    it('applies sm size classes', () => {
      const wrapper = mount(Switch, {
        props: { size: 'sm' },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('h-5')
      expect(button.classes()).toContain('w-9')
    })

    it('applies md size classes (default)', () => {
      const wrapper = mount(Switch)

      const button = wrapper.find('button')
      expect(button.classes()).toContain('h-6')
      expect(button.classes()).toContain('w-11')
    })

    it('applies lg size classes', () => {
      const wrapper = mount(Switch, {
        props: { size: 'lg' },
      })

      const button = wrapper.find('button')
      expect(button.classes()).toContain('h-7')
      expect(button.classes()).toContain('w-14')
    })
  })

  describe('visual states', () => {
    it('applies primary background when on', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true },
      })

      expect(wrapper.find('button').classes()).toContain('bg-primary')
    })

    it('applies gray background when off', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false },
      })

      expect(wrapper.find('button').classes()).toContain('bg-gray-300')
    })

    it('moves dot to the right when on (md size)', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true, size: 'md' },
      })

      const dot = wrapper.find('button span')
      expect(dot.classes()).toContain('translate-x-6')
    })

    it('moves dot to the left when off', () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false },
      })

      const dot = wrapper.find('button span')
      expect(dot.classes()).toContain('translate-x-1')
    })
  })
})
