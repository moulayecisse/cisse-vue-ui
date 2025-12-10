import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableAction from './TableAction.vue'

describe('TableAction', () => {
  it('renders with icon', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders as button when no link', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders as anchor when link provided', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
        link: '/edit/1',
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('/edit/1')
  })

  it('applies default color styling', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes().some(c => c.includes('gray'))).toBe(true)
  })

  it('applies info color styling', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:info',
        color: 'info',
      },
    })

    expect(wrapper.classes().some(c => c.includes('blue'))).toBe(true)
  })

  it('applies success color styling', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:check',
        color: 'success',
      },
    })

    expect(wrapper.classes().some(c => c.includes('green'))).toBe(true)
  })

  it('applies warning color styling', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:alert-triangle',
        color: 'warning',
      },
    })

    expect(wrapper.classes().some(c => c.includes('yellow'))).toBe(true)
  })

  it('applies error color styling', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:trash',
        color: 'error',
      },
    })

    expect(wrapper.classes().some(c => c.includes('red'))).toBe(true)
  })

  it('has rounded corners', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('has border', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes()).toContain('border')
  })

  it('has fixed size', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes()).toContain('size-8')
  })

  it('has group class for hover effects', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes()).toContain('group')
  })

  it('centers content', () => {
    const wrapper = mount(TableAction, {
      props: {
        icon: 'lucide:edit',
      },
    })

    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('justify-center')
  })
})
