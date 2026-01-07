import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Td from './Td.vue'

describe('Td', () => {
  it('renders td element', () => {
    const wrapper = mount(Td)
    expect(wrapper.find('td').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Td, {
      slots: {
        default: 'Cell Content',
      },
    })
    expect(wrapper.text()).toContain('Cell Content')
  })

  it('applies left alignment by default', () => {
    const wrapper = mount(Td)
    expect(wrapper.find('td').classes()).toContain('text-left')
  })

  it('applies center alignment when align="center"', () => {
    const wrapper = mount(Td, {
      props: { align: 'center' },
    })
    expect(wrapper.find('td').classes()).toContain('text-center')
  })

  it('applies right alignment when align="right"', () => {
    const wrapper = mount(Td, {
      props: { align: 'right' },
    })
    expect(wrapper.find('td').classes()).toContain('text-right')
  })

  it('applies main column styling when main=true', () => {
    const wrapper = mount(Td, {
      props: { main: true },
    })
    expect(wrapper.find('td').classes()).toContain('font-semibold')
  })

  it('does not apply main column styling when main=false', () => {
    const wrapper = mount(Td, {
      props: { main: false },
    })
    expect(wrapper.find('td').classes()).not.toContain('font-semibold')
  })

  it('applies custom className', () => {
    const wrapper = mount(Td, {
      props: { className: 'custom-class' },
    })
    expect(wrapper.find('td').classes()).toContain('custom-class')
  })

  it('applies truncation when truncate=true', () => {
    const wrapper = mount(Td, {
      props: { truncate: true },
    })
    expect(wrapper.find('td').classes()).toContain('truncate')
  })

  it('applies custom width style', () => {
    const wrapper = mount(Td, {
      props: { width: '150px' },
    })
    const td = wrapper.find('td')
    expect(td.attributes('style')).toContain('width: 150px')
  })

  it('applies sticky positioning when sticky=true', () => {
    const wrapper = mount(Td, {
      props: { sticky: true },
    })
    expect(wrapper.find('td').classes()).toContain('sticky')
  })

  it('applies sticky left position when stickyLeft provided', () => {
    const wrapper = mount(Td, {
      props: {
        sticky: true,
        stickyLeft: '48px',
      },
    })
    const td = wrapper.find('td')
    expect(td.attributes('style')).toContain('left: 48px')
  })

  it('has default padding', () => {
    const wrapper = mount(Td)
    // Check that padding classes exist (px-3 py-4 or px-2 py-2 for compact)
    const td = wrapper.find('td')
    expect(td.classes().some(c => c.includes('px-'))).toBe(true)
    expect(td.classes().some(c => c.includes('py-'))).toBe(true)
  })

  it('applies colspan attribute', () => {
    const wrapper = mount(Td, {
      props: { colspan: 3 },
    })
    expect(wrapper.find('td').attributes('colspan')).toBe('3')
  })

  it('applies rowspan attribute', () => {
    const wrapper = mount(Td, {
      props: { rowspan: 2 },
    })
    expect(wrapper.find('td').attributes('rowspan')).toBe('2')
  })

  it('passes through additional attrs', () => {
    const wrapper = mount(Td, {
      attrs: { 'data-testid': 'my-cell', id: 'cell-1' },
    })
    const td = wrapper.find('td')
    expect(td.attributes('data-testid')).toBe('my-cell')
    expect(td.attributes('id')).toBe('cell-1')
  })
})
