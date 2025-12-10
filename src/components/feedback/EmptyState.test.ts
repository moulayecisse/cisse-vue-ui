import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('renders default message', () => {
    const wrapper = mount(EmptyState)

    expect(wrapper.text()).toContain('No results found')
  })

  it('renders custom message', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'Nothing to show here',
      },
    })

    expect(wrapper.text()).toContain('Nothing to show here')
  })

  it('renders title when provided', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'Empty List',
        message: 'No items yet',
      },
    })

    expect(wrapper.text()).toContain('Empty List')
    expect(wrapper.find('h3').text()).toBe('Empty List')
  })

  it('does not render title when not provided', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'No items',
      },
    })

    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('renders default icon', () => {
    const wrapper = mount(EmptyState)

    // Icon is rendered via @iconify/vue
    expect(wrapper.find('.size-12').exists()).toBe(true)
  })

  it('renders custom icon', () => {
    const wrapper = mount(EmptyState, {
      props: {
        icon: 'lucide:search',
      },
    })

    // Icon container should exist
    expect(wrapper.find('.size-12').exists()).toBe(true)
  })

  it('hides icon when icon prop is empty string', () => {
    const wrapper = mount(EmptyState, {
      props: {
        icon: '',
      },
    })

    expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(false)
  })

  it('renders slot content instead of message', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'Default message',
      },
      slots: {
        default: '<span class="custom-message">Custom slot message</span>',
      },
    })

    expect(wrapper.find('.custom-message').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom slot message')
  })

  it('renders action slot when provided', () => {
    const wrapper = mount(EmptyState, {
      slots: {
        action: '<button class="action-button">Add Item</button>',
      },
    })

    expect(wrapper.find('.action-button').exists()).toBe(true)
    expect(wrapper.find('.action-button').text()).toBe('Add Item')
  })

  it('does not render action container when no action slot', () => {
    const wrapper = mount(EmptyState)

    // There should be no mt-4 div for action when slot is not provided
    const actionContainer = wrapper.find('.mt-4')
    expect(actionContainer.exists()).toBe(false)
  })

  it('applies centered text styling', () => {
    const wrapper = mount(EmptyState)

    expect(wrapper.find('.text-center').exists()).toBe(true)
  })

  it('applies padding', () => {
    const wrapper = mount(EmptyState)

    expect(wrapper.find('.py-12').exists()).toBe(true)
  })

  it('renders all elements together', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'No Results',
        message: 'Try adjusting your search',
        icon: 'lucide:search-x',
      },
      slots: {
        action: '<button>Clear Search</button>',
      },
    })

    expect(wrapper.text()).toContain('No Results')
    expect(wrapper.text()).toContain('Try adjusting your search')
    expect(wrapper.text()).toContain('Clear Search')
    expect(wrapper.find('.size-12').exists()).toBe(true)
  })
})
