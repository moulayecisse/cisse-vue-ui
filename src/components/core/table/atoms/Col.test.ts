import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Col from './Col.vue'

describe('Col', () => {
  it('renders col element', () => {
    const wrapper = mount(Col)
    expect(wrapper.find('col').exists()).toBe(true)
  })

  it('applies span attribute', () => {
    const wrapper = mount(Col, {
      props: { span: 2 },
    })
    expect(wrapper.find('col').attributes('span')).toBe('2')
  })

  it('applies width style', () => {
    const wrapper = mount(Col, {
      props: { width: '200px' },
    })
    expect(wrapper.find('col').attributes('style')).toContain('width: 200px')
  })

  it('passes through additional attrs', () => {
    const wrapper = mount(Col, {
      attrs: { class: 'custom-class' },
    })
    expect(wrapper.find('col').classes()).toContain('custom-class')
  })
})
