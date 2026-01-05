import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import URLInput from './URLInput.vue'

describe('URLInput', () => {
  it('renders a url input', () => {
    const wrapper = mount(URLInput)
    expect(wrapper.find('input[type="url"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(URLInput, {
      props: {
        modelValue: 'https://example.com',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    expect(wrapper.find('input').element.value).toBe('https://example.com')

    await wrapper.find('input').setValue('https://new-url.com')
    expect(wrapper.props('modelValue')).toBe('https://new-url.com')
  })

  it('shows link icon', () => {
    const wrapper = mount(URLInput)
    expect(wrapper.find('.size-4').exists()).toBe(true)
  })

  it('shows external link button for valid URL after blur', async () => {
    const wrapper = mount(URLInput, {
      props: {
        modelValue: 'https://example.com',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows error icon for invalid URL after blur', async () => {
    const wrapper = mount(URLInput, {
      props: {
        modelValue: 'not-a-url',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val }),
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })

  it('does not show validation before blur', () => {
    const wrapper = mount(URLInput, {
      props: { modelValue: 'not-a-url' },
    })

    expect(wrapper.find('.text-red-500').exists()).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('hides validation when showValidation is false', async () => {
    const wrapper = mount(URLInput, {
      props: {
        modelValue: 'https://example.com',
        showValidation: false,
      },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    // With showValidation=false, no action button should appear
    // Only the link icon should be present (1 svg)
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBe(1) // Only the link icon
  })

  it('validates common URL formats', async () => {
    const validUrls = [
      'https://example.com',
      'http://example.org',
      'https://sub.domain.com/path',
      'example.com',
    ]

    for (const url of validUrls) {
      const wrapper = mount(URLInput, {
        props: { modelValue: url },
      })

      await wrapper.find('input').trigger('blur')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('button').exists()).toBe(true)
    }
  })

  it('invalidates incorrect URL formats', async () => {
    const invalidUrls = ['not a url', 'just-text', 'ftp://invalid']

    for (const url of invalidUrls) {
      const wrapper = mount(URLInput, {
        props: { modelValue: url },
      })

      await wrapper.find('input').trigger('blur')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.text-red-500').exists()).toBe(true)
    }
  })

  it('applies disabled state', () => {
    const wrapper = mount(URLInput, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets name attribute', () => {
    const wrapper = mount(URLInput, {
      props: { name: 'website' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('website')
  })

  it('sets required attribute', () => {
    const wrapper = mount(URLInput, {
      props: { required: true },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('opens URL in new tab when button clicked', async () => {
    const windowOpen = vi.spyOn(window, 'open').mockImplementation(() => null)

    const wrapper = mount(URLInput, {
      props: { modelValue: 'https://example.com' },
    })

    await wrapper.find('input').trigger('blur')
    await wrapper.vm.$nextTick()

    await wrapper.find('button').trigger('click')

    expect(windowOpen).toHaveBeenCalledWith('https://example.com', '_blank')
    windowOpen.mockRestore()
  })
})
