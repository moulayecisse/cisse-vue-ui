import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Colgroup from './Colgroup.vue'

describe('Colgroup', () => {
  it('renders colgroup element', () => {
    const wrapper = mount(Colgroup)
    expect(wrapper.find('colgroup').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Colgroup, {
      slots: {
        default: '<col span="2" />',
      },
    })
    expect(wrapper.find('col').exists()).toBe(true)
  })

  it('passes through additional attrs', () => {
    const wrapper = mount(Colgroup, {
      attrs: { class: 'custom-class' },
    })
    expect(wrapper.find('colgroup').classes()).toContain('custom-class')
  })
})
