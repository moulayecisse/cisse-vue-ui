import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Divider from './Divider.vue'

describe('Divider', () => {
  it('renders with default props', () => {
    const wrapper = mount(Divider)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('renders horizontal orientation by default', () => {
    const wrapper = mount(Divider)

    expect(wrapper.classes()).toContain('w-full')
  })

  it('renders vertical orientation', () => {
    const wrapper = mount(Divider, {
      props: { orientation: 'vertical' },
    })

    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.classes()).toContain('h-full')
  })

  it('applies size classes for horizontal divider', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses = {
      sm: 'h-px',
      md: 'h-0.5',
      lg: 'h-1',
    }

    sizes.forEach((size) => {
      const wrapper = mount(Divider, {
        props: { size },
      })

      expect(wrapper.classes()).toContain(expectedClasses[size])
    })
  })

  it('applies size classes for vertical divider', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses = {
      sm: 'w-px',
      md: 'w-0.5',
      lg: 'w-1',
    }

    sizes.forEach((size) => {
      const wrapper = mount(Divider, {
        props: { size, orientation: 'vertical' },
      })

      expect(wrapper.classes()).toContain(expectedClasses[size])
    })
  })

  it('applies color classes', () => {
    const colors = ['default', 'primary', 'muted'] as const

    colors.forEach((color) => {
      const wrapper = mount(Divider, {
        props: { color },
      })

      // Should have some color-related classes
      expect(wrapper.classes().some((c) => c.includes('bg-'))).toBe(true)
    })
  })

  it('renders label when provided', () => {
    const wrapper = mount(Divider, {
      props: { label: 'OR' },
    })

    expect(wrapper.text()).toContain('OR')
  })

  it('renders without label by default', () => {
    const wrapper = mount(Divider)

    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('applies custom class', () => {
    const wrapper = mount(Divider, {
      props: { class: 'my-custom-class' },
    })

    expect(wrapper.classes()).toContain('my-custom-class')
  })

  it('renders with label and correct structure', () => {
    const wrapper = mount(Divider, {
      props: { label: 'Section' },
    })

    // Should have flex container with label
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.find('span').text()).toBe('Section')
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(Divider)

    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBeDefined()
  })

  it('applies variant classes for dashed', () => {
    const wrapper = mount(Divider, {
      props: { variant: 'dashed' },
    })

    expect(wrapper.classes()).toContain('border-dashed')
  })

  it('applies variant classes for dotted', () => {
    const wrapper = mount(Divider, {
      props: { variant: 'dotted' },
    })

    expect(wrapper.classes()).toContain('border-dotted')
  })
})
