import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from './Skeleton.vue'

describe('Skeleton', () => {
  it('renders with default props', () => {
    const wrapper = mount(Skeleton)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('has animate-pulse class by default', () => {
    const wrapper = mount(Skeleton)

    expect(wrapper.find('div').classes()).toContain('animate-pulse')
  })

  it('removes animate-pulse when animate is false', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animate: false,
      },
    })

    expect(wrapper.find('div').classes()).not.toContain('animate-pulse')
  })

  it('applies text variant classes', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'text',
      },
    })

    expect(wrapper.find('div').classes()).toContain('rounded')
  })

  it('applies circular variant classes', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'circular',
      },
    })

    expect(wrapper.find('div').classes()).toContain('rounded-full')
  })

  it('applies rounded variant classes', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'rounded',
      },
    })

    expect(wrapper.find('div').classes()).toContain('rounded-lg')
  })

  it('applies custom width', () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: '200px',
      },
    })

    expect(wrapper.find('div').attributes('style')).toContain('width: 200px')
  })

  it('applies custom height', () => {
    const wrapper = mount(Skeleton, {
      props: {
        height: '50px',
      },
    })

    expect(wrapper.find('div').attributes('style')).toContain('height: 50px')
  })

  it('renders multiple lines for text variant', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'text',
        lines: 3,
      },
    })

    const lines = wrapper.findAll('.animate-pulse')
    expect(lines).toHaveLength(3)
  })

  it('renders single element when lines is 1', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'text',
        lines: 1,
      },
    })

    // Should be a single div, not wrapped in container
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.findAll('.space-y-2')).toHaveLength(0)
  })

  it('last line has 75% width for multi-line text', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'text',
        lines: 3,
      },
    })

    const lines = wrapper.findAll('.animate-pulse')
    const lastLine = lines[lines.length - 1]
    expect(lastLine.attributes('style')).toContain('width: 75%')
  })

  it('applies default circular dimensions', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'circular',
      },
    })

    const style = wrapper.find('div').attributes('style')
    expect(style).toContain('width: 3rem')
    expect(style).toContain('height: 3rem')
  })

  it('applies default rectangular height', () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: 'rectangular',
      },
    })

    const style = wrapper.find('div').attributes('style')
    expect(style).toContain('height: 6rem')
  })

  it('has gray background classes', () => {
    const wrapper = mount(Skeleton)

    const classes = wrapper.find('div').classes()
    expect(classes.some((c) => c.includes('bg-gray'))).toBe(true)
  })
})
