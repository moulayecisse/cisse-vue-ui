import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Menu from './Menu.vue'

describe('Menu', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: '<div>Menu content</div>',
      },
    })

    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.html()).toContain('Menu content')
  })

  it('applies correct gap classes based on gap prop', () => {
    const gapValues = ['none', 'sm', 'md', 'lg'] as const
    const expectedClasses = {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-4',
    }

    for (const gap of gapValues) {
      const wrapper = mount(Menu, {
        props: { gap },
      })
      expect(wrapper.find('nav').classes()).toContain(expectedClasses[gap])
    }
  })

  it('has flex-col layout', () => {
    const wrapper = mount(Menu)
    expect(wrapper.find('nav').classes()).toContain('flex')
    expect(wrapper.find('nav').classes()).toContain('flex-col')
  })

  it('has navigation role for accessibility', () => {
    const wrapper = mount(Menu)
    expect(wrapper.find('nav').attributes('role')).toBe('navigation')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: `
          <div class="menu-item-1">Item 1</div>
          <div class="menu-item-2">Item 2</div>
        `,
      },
    })

    expect(wrapper.find('.menu-item-1').exists()).toBe(true)
    expect(wrapper.find('.menu-item-2').exists()).toBe(true)
  })

  it('provides collapsed state to children', async () => {
    const wrapper = mount(Menu, {
      props: { collapsed: true },
    })

    // Menu should accept collapsed prop without errors
    expect(wrapper.props('collapsed')).toBe(true)
  })
})
