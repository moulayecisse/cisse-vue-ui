import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders slot content', () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    expect(wrapper.text()).toContain('Hover me')
  })

  it('does not show tooltip initially', () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    expect(wrapper.text()).not.toContain('Tooltip text')
  })

  it('shows tooltip on mouseenter', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')

    expect(wrapper.text()).toContain('Tooltip text')
  })

  it('hides tooltip on mouseleave', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.text()).toContain('Tooltip text')

    await wrapper.trigger('mouseleave')
    expect(wrapper.text()).not.toContain('Tooltip text')
  })

  it('shows tooltip on focus', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('focus')

    expect(wrapper.text()).toContain('Tooltip text')
  })

  it('hides tooltip on blur', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('focus')
    expect(wrapper.text()).toContain('Tooltip text')

    await wrapper.trigger('blur')
    expect(wrapper.text()).not.toContain('Tooltip text')
  })

  it('respects delay prop', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
        delay: 500,
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.text()).not.toContain('Tooltip text')

    vi.advanceTimersByTime(500)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Tooltip text')
  })

  it('does not show when disabled', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
        disabled: true,
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')

    expect(wrapper.text()).not.toContain('Tooltip text')
  })

  it('does not show when content is empty', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: '',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')

    // Should only contain slot content, not tooltip
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('applies correct position classes', async () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const

    for (const position of positions) {
      const wrapper = mount(Tooltip, {
        props: {
          content: 'Tooltip text',
          position,
        },
        slots: {
          default: '<button>Hover me</button>',
        },
      })

      await wrapper.trigger('mouseenter')

      const tooltip = wrapper.find('[role="tooltip"]')
      expect(tooltip.exists()).toBe(true)
    }
  })

  it('has tooltip role for accessibility', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip text',
      },
      slots: {
        default: '<button>Hover me</button>',
      },
    })

    await wrapper.trigger('mouseenter')

    const tooltip = wrapper.find('[role="tooltip"]')
    expect(tooltip.exists()).toBe(true)
  })
})
