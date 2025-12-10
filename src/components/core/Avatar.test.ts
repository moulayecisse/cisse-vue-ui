import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar', () => {
  it('renders with default props', () => {
    const wrapper = mount(Avatar)

    expect(wrapper.exists()).toBe(true)
  })

  it('displays image when src is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        alt: 'User avatar',
      },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
    expect(img.attributes('alt')).toBe('User avatar')
  })

  it('displays initials when name is provided without image', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Doe',
      },
    })

    expect(wrapper.text()).toContain('JD')
  })

  it('computes initials correctly for single name', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John',
      },
    })

    expect(wrapper.text()).toContain('J')
  })

  it('limits initials to 2 characters', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Paul Doe Smith',
      },
    })

    expect(wrapper.text()).toContain('JP')
    expect(wrapper.text()).not.toContain('JPS')
  })

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Avatar, {
        props: { size },
      })

      // Each size should apply different size classes
      expect(wrapper.find('.flex').classes().length).toBeGreaterThan(0)
    })
  })

  it('shows status indicator when status is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        status: 'online',
      },
    })

    const statusIndicator = wrapper.find('.absolute')
    expect(statusIndicator.exists()).toBe(true)
    expect(statusIndicator.classes()).toContain('bg-green-500')
  })

  it('applies correct status colors', () => {
    const statuses = [
      { status: 'online', color: 'bg-green-500' },
      { status: 'offline', color: 'bg-gray-400' },
      { status: 'away', color: 'bg-yellow-500' },
      { status: 'busy', color: 'bg-red-500' },
    ] as const

    statuses.forEach(({ status, color }) => {
      const wrapper = mount(Avatar, {
        props: { status },
      })

      const indicator = wrapper.find('.absolute')
      expect(indicator.classes()).toContain(color)
    })
  })

  it('does not show status indicator by default', () => {
    const wrapper = mount(Avatar)

    expect(wrapper.find('.absolute').exists()).toBe(false)
  })

  it('applies rounded classes', () => {
    const roundedOptions = ['full', 'lg', 'md'] as const

    roundedOptions.forEach((rounded) => {
      const wrapper = mount(Avatar, {
        props: { rounded },
      })

      expect(wrapper.find('.flex').classes().some((c) => c.includes('rounded'))).toBe(true)
    })
  })

  it('uses name as alt text fallback', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        name: 'John Doe',
      },
    })

    expect(wrapper.find('img').attributes('alt')).toBe('John Doe')
  })

  it('prefers alt over name for alt text', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        name: 'John Doe',
        alt: 'Custom alt text',
      },
    })

    expect(wrapper.find('img').attributes('alt')).toBe('Custom alt text')
  })

  it('uppercases initials', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'john doe',
      },
    })

    expect(wrapper.text()).toContain('JD')
  })
})
