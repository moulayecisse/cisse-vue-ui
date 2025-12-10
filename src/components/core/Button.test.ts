import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('renders as button by default', () => {
    const wrapper = mount(Button)

    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as anchor when href is provided', () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://example.com',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('applies variant classes', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'] as const

    variants.forEach((variant) => {
      const wrapper = mount(Button, {
        props: { variant },
      })

      // Each variant should have different classes
      expect(wrapper.classes().length).toBeGreaterThan(0)
    })
  })

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size },
      })

      expect(wrapper.classes().length).toBeGreaterThan(0)
    })
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('sets disabled attribute when disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('sets disabled attribute when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('applies full width class when block is true', () => {
    const wrapper = mount(Button, {
      props: {
        block: true,
      },
    })

    expect(wrapper.classes()).toContain('w-full')
  })

  it('renders with correct button type', () => {
    const types = ['button', 'submit', 'reset'] as const

    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type },
      })

      expect(wrapper.attributes('type')).toBe(type)
    })
  })

  it('has default type of button', () => {
    const wrapper = mount(Button)

    expect(wrapper.attributes('type')).toBe('button')
  })

  it('accepts icon prop', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'lucide:home',
      },
    })

    // Just verify component mounts without error when icon is provided
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts loading prop', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    // Just verify component mounts without error when loading
    expect(wrapper.exists()).toBe(true)
    // Should be disabled when loading
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
