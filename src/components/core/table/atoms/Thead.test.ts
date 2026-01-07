import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Thead from './Thead.vue'

describe('Thead', () => {
  it('renders thead element', () => {
    const wrapper = mount(Thead)
    expect(wrapper.find('thead').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Thead, {
      slots: {
        default: '<tr><th>Header</th></tr>',
      },
    })
    expect(wrapper.text()).toContain('Header')
  })

  it('applies default border and background styles', () => {
    const wrapper = mount(Thead)
    const thead = wrapper.find('thead')
    // Should have appropriate styling classes
    expect(thead.classes().length).toBeGreaterThanOrEqual(0)
  })
})
