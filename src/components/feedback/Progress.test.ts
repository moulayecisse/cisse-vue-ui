import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from './Progress.vue'

describe('Progress', () => {
  it('renders with default props', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
      },
    })

    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('sets correct aria attributes', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        max: 100,
      },
    })

    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuenow')).toBe('50')
    expect(progressbar.attributes('aria-valuemin')).toBe('0')
    expect(progressbar.attributes('aria-valuemax')).toBe('100')
  })

  it('calculates percentage correctly', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 25,
        max: 100,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 25%')
  })

  it('calculates percentage with custom max', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        max: 200,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 25%')
  })

  it('clamps value between 0 and 100 percent', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 150,
        max: 100,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 100%')
  })

  it('handles negative values', () => {
    const wrapper = mount(Progress, {
      props: {
        value: -10,
        max: 100,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 0%')
  })

  it('shows label when showLabel is true', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 75,
        showLabel: true,
      },
    })

    expect(wrapper.text()).toContain('75%')
  })

  it('does not show label by default', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 75,
      },
    })

    expect(wrapper.text()).not.toContain('75%')
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Progress, {
        props: {
          value: 50,
          size,
        },
      })

      const progressbar = wrapper.find('[role="progressbar"]')
      expect(progressbar.classes().length).toBeGreaterThan(0)
    })
  })

  it('applies variant classes', () => {
    const variants = ['default', 'success', 'warning', 'error'] as const

    variants.forEach((variant) => {
      const wrapper = mount(Progress, {
        props: {
          value: 50,
          variant,
        },
      })

      const bar = wrapper.find('[role="progressbar"] > div')
      expect(bar.classes().length).toBeGreaterThan(0)
    })
  })

  it('applies striped class when striped is true', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        striped: true,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.classes()).toContain('bg-stripes')
  })

  it('applies animated class when animated is true', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        striped: true,
        animated: true,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.classes()).toContain('animate-stripes')
  })

  it('handles indeterminate state', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 0,
        indeterminate: true,
      },
    })

    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.classes()).toContain('animate-indeterminate')
  })

  it('does not show label in indeterminate state', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        indeterminate: true,
        showLabel: true,
      },
    })

    expect(wrapper.text()).not.toContain('50%')
  })

  it('removes aria-valuenow in indeterminate state', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        indeterminate: true,
      },
    })

    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuenow')).toBeUndefined()
  })
})
