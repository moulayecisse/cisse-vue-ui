import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Th from './Th.vue'

describe('Th', () => {
  it('renders th element', () => {
    const wrapper = mount(Th)
    expect(wrapper.find('th').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Th, {
      slots: {
        default: 'Header Text',
      },
    })
    expect(wrapper.text()).toContain('Header Text')
  })

  it('applies left alignment by default', () => {
    const wrapper = mount(Th)
    expect(wrapper.find('th').classes()).toContain('text-left')
  })

  it('applies center alignment when align="center"', () => {
    const wrapper = mount(Th, {
      props: { align: 'center' },
    })
    expect(wrapper.find('th').classes()).toContain('text-center')
  })

  it('applies right alignment when align="right"', () => {
    const wrapper = mount(Th, {
      props: { align: 'right' },
    })
    expect(wrapper.find('th').classes()).toContain('text-right')
  })

  it('renders sortable header when sortable=true', () => {
    const wrapper = mount(Th, {
      props: { sortable: true },
    })
    // Sortable th has cursor-pointer class
    expect(wrapper.find('th').classes()).toContain('cursor-pointer')
  })

  it('emits sort event when sortable header clicked', async () => {
    const wrapper = mount(Th, {
      props: { sortable: true },
    })

    await wrapper.find('th').trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()
  })

  it('shows ascending sort indicator when sorted=true and sortDirection="asc"', () => {
    const wrapper = mount(Th, {
      props: {
        sortable: true,
        sorted: true,
        sortDirection: 'asc',
      },
    })
    // Should show SVG sort indicator with primary color
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.classes()).toContain('text-primary-500')
  })

  it('shows descending sort indicator when sorted=true and sortDirection="desc"', () => {
    const wrapper = mount(Th, {
      props: {
        sortable: true,
        sorted: true,
        sortDirection: 'desc',
      },
    })
    // Should show SVG sort indicator with primary color
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.classes()).toContain('text-primary-500')
  })

  it('applies custom width style', () => {
    const wrapper = mount(Th, {
      props: { width: '200px' },
    })
    const th = wrapper.find('th')
    expect(th.attributes('style')).toContain('width: 200px')
  })

  it('applies minWidth style', () => {
    const wrapper = mount(Th, {
      props: { minWidth: '100px' },
    })
    const th = wrapper.find('th')
    expect(th.attributes('style')).toContain('min-width: 100px')
  })

  it('applies maxWidth style', () => {
    const wrapper = mount(Th, {
      props: { maxWidth: '300px' },
    })
    const th = wrapper.find('th')
    expect(th.attributes('style')).toContain('max-width: 300px')
  })

  it('applies sticky positioning when sticky=true', () => {
    const wrapper = mount(Th, {
      props: { sticky: true },
    })
    expect(wrapper.find('th').classes()).toContain('sticky')
  })

  it('applies sticky left position when stickyLeft provided', () => {
    const wrapper = mount(Th, {
      props: {
        sticky: true,
        stickyLeft: '0px',
      },
    })
    const th = wrapper.find('th')
    expect(th.attributes('style')).toContain('left: 0px')
  })

  it('applies colspan attribute', () => {
    const wrapper = mount(Th, {
      props: { colspan: 3 },
    })
    expect(wrapper.find('th').attributes('colspan')).toBe('3')
  })

  it('applies rowspan attribute', () => {
    const wrapper = mount(Th, {
      props: { rowspan: 2 },
    })
    expect(wrapper.find('th').attributes('rowspan')).toBe('2')
  })

  it('applies scope attribute with default col', () => {
    const wrapper = mount(Th)
    expect(wrapper.find('th').attributes('scope')).toBe('col')
  })

  it('applies custom scope attribute', () => {
    const wrapper = mount(Th, {
      props: { scope: 'row' },
    })
    expect(wrapper.find('th').attributes('scope')).toBe('row')
  })

  it('applies rowgroup scope for row grouping', () => {
    const wrapper = mount(Th, {
      props: { scope: 'rowgroup' },
    })
    expect(wrapper.find('th').attributes('scope')).toBe('rowgroup')
  })

  it('passes through additional attrs', () => {
    const wrapper = mount(Th, {
      attrs: { 'data-testid': 'my-header', id: 'header-1' },
    })
    const th = wrapper.find('th')
    expect(th.attributes('data-testid')).toBe('my-header')
    expect(th.attributes('id')).toBe('header-1')
  })
})
