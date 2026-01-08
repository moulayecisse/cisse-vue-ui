import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputGroup from './InputGroup.vue'

describe('InputGroup', () => {
  it('renders with default props', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.flex').exists()).toBe(true)
  })

  it('renders prefix text', () => {
    const wrapper = mount(InputGroup, {
      props: { prefix: 'https://' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.text()).toContain('https://')
  })

  it('renders suffix text', () => {
    const wrapper = mount(InputGroup, {
      props: { suffix: '.com' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.text()).toContain('.com')
  })

  it('renders both prefix and suffix', () => {
    const wrapper = mount(InputGroup, {
      props: { prefix: '$', suffix: 'USD' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.text()).toContain('$')
    expect(wrapper.text()).toContain('USD')
  })

  it('renders prefix slot content', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        prefix: '<span class="custom-prefix">Icon</span>',
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
    expect(wrapper.text()).toContain('Icon')
  })

  it('renders suffix slot content', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        suffix: '<span class="custom-suffix">Icon</span>',
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.custom-suffix').exists()).toBe(true)
    expect(wrapper.text()).toContain('Icon')
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses: Record<string, string> = {
      sm: 'px-2.5',
      md: 'px-3',
      lg: 'px-4',
    }

    sizes.forEach((size) => {
      const wrapper = mount(InputGroup, {
        props: { size, prefix: '$' },
        slots: {
          default: '<input type="text" />',
        },
      })

      const prefixSpan = wrapper.find('span')
      expect(prefixSpan.classes()).toContain(expectedClasses[size])
    })
  })

  it('applies custom class', () => {
    const wrapper = mount(InputGroup, {
      props: { class: 'my-custom-class' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.classes()).toContain('my-custom-class')
  })

  it('renders default slot content', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: '<input type="text" class="my-input" />',
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  it('does not render prefix addon when not provided', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: '<input type="text" />',
      },
    })

    const spans = wrapper.findAll('span')
    expect(spans.length).toBe(0)
  })

  it('prefers slot content over prop for prefix', () => {
    const wrapper = mount(InputGroup, {
      props: { prefix: 'PropPrefix' },
      slots: {
        prefix: '<span>SlotPrefix</span>',
        default: '<input type="text" />',
      },
    })

    expect(wrapper.text()).toContain('SlotPrefix')
    expect(wrapper.text()).not.toContain('PropPrefix')
  })
})
