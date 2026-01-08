import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { DataList, DataListItem, DataListLabel, DataListValue } from './index'

describe('DataList', () => {
  const sampleItems = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john@example.com' },
  ]

  it('renders with default props', () => {
    const wrapper = mount(DataList)

    expect(wrapper.find('dl').exists()).toBe(true)
  })

  it('renders items from props', () => {
    const wrapper = mount(DataList, {
      props: { items: sampleItems },
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataList, {
      slots: {
        default: '<div class="custom-item">Custom content</div>',
      },
    })

    expect(wrapper.find('.custom-item').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom content')
  })

  it('applies variant classes', () => {
    const borderedWrapper = mount(DataList, {
      props: { variant: 'bordered' },
    })

    expect(borderedWrapper.find('dl').classes()).toContain('border')
    expect(borderedWrapper.find('dl').classes()).toContain('rounded-lg')
  })

  it('applies custom class', () => {
    const wrapper = mount(DataList, {
      props: { class: 'my-custom-class' },
    })

    expect(wrapper.find('dl').classes()).toContain('my-custom-class')
  })
})

describe('DataListItem', () => {
  it('renders with default props', () => {
    const wrapper = mount(DataListItem)

    expect(wrapper.exists()).toBe(true)
  })

  it('renders label and value from props', () => {
    const wrapper = mount(DataListItem, {
      props: {
        label: 'Name',
        value: 'John Doe',
      },
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('John Doe')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataListItem, {
      slots: {
        default: '<span class="custom">Custom</span>',
      },
    })

    expect(wrapper.find('.custom').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses = {
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-6',
    }

    sizes.forEach((size) => {
      const wrapper = mount(DataListItem, {
        props: { size },
      })

      expect(wrapper.classes()).toContain(expectedClasses[size])
    })
  })

  it('applies striped class when enabled', () => {
    const wrapper = mount(DataListItem, {
      props: { striped: true },
    })

    expect(wrapper.classes().some((c) => c.includes('even:bg-gray'))).toBe(true)
  })

  it('applies custom class', () => {
    const wrapper = mount(DataListItem, {
      props: { class: 'my-item-class' },
    })

    expect(wrapper.classes()).toContain('my-item-class')
  })
})

describe('DataListLabel', () => {
  it('renders with default props', () => {
    const wrapper = mount(DataListLabel, {
      slots: { default: 'Label text' },
    })

    expect(wrapper.find('dt').exists()).toBe(true)
    expect(wrapper.text()).toBe('Label text')
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    sizes.forEach((size) => {
      const wrapper = mount(DataListLabel, {
        props: { size },
        slots: { default: 'Label' },
      })

      expect(wrapper.find('dt').classes()).toContain(expectedClasses[size])
    })
  })

  it('applies custom class', () => {
    const wrapper = mount(DataListLabel, {
      props: { class: 'my-label-class' },
      slots: { default: 'Label' },
    })

    expect(wrapper.find('dt').classes()).toContain('my-label-class')
  })
})

describe('DataListValue', () => {
  it('renders with default props', () => {
    const wrapper = mount(DataListValue, {
      slots: { default: 'Value text' },
    })

    expect(wrapper.find('dd').exists()).toBe(true)
    expect(wrapper.text()).toBe('Value text')
  })

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    const expectedClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    sizes.forEach((size) => {
      const wrapper = mount(DataListValue, {
        props: { size },
        slots: { default: 'Value' },
      })

      expect(wrapper.find('dd').classes()).toContain(expectedClasses[size])
    })
  })

  it('applies custom class', () => {
    const wrapper = mount(DataListValue, {
      props: { class: 'my-value-class' },
      slots: { default: 'Value' },
    })

    expect(wrapper.find('dd').classes()).toContain('my-value-class')
  })

  it('renders complex slot content', () => {
    const wrapper = mount(DataListValue, {
      slots: {
        default: '<a href="#" class="link">Click here</a>',
      },
    })

    expect(wrapper.find('.link').exists()).toBe(true)
    expect(wrapper.text()).toContain('Click here')
  })
})
