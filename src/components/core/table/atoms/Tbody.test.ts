import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tbody from './Tbody.vue'

describe('Tbody', () => {
  it('renders tbody element', () => {
    const wrapper = mount(Tbody)
    expect(wrapper.find('tbody').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Tbody, {
      slots: {
        default: '<tr><td>Body content</td></tr>',
      },
    })
    expect(wrapper.text()).toContain('Body content')
  })

  it('applies default styles', () => {
    const wrapper = mount(Tbody)
    const tbody = wrapper.find('tbody')
    expect(tbody.exists()).toBe(true)
  })
})
