import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputWrapper from './InputWrapper.vue'

describe('InputWrapper', () => {
  it('renders slot content', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: '<input type="text" class="test-input" />',
      },
    })

    expect(wrapper.find('.test-input').exists()).toBe(true)
  })

  it('renders left icon when icon prop is provided', () => {
    const wrapper = mount(InputWrapper, {
      props: { icon: 'lucide:search' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.size-4').exists()).toBe(true)
  })

  it('renders right icon when iconRight prop is provided', () => {
    const wrapper = mount(InputWrapper, {
      props: { iconRight: 'lucide:chevron-down' },
      slots: {
        default: '<input type="text" />',
      },
    })

    const icons = wrapper.findAll('.size-4')
    expect(icons.length).toBe(1)
  })

  it('renders both icons when both props are provided', () => {
    const wrapper = mount(InputWrapper, {
      props: {
        icon: 'lucide:search',
        iconRight: 'lucide:x',
      },
      slots: {
        default: '<input type="text" />',
      },
    })

    const icons = wrapper.findAll('.size-4')
    expect(icons.length).toBe(2)
  })

  it('renders custom icon slot content', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: '<input type="text" />',
        icon: '<span class="custom-icon">Icon</span>',
      },
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('renders actions slot content', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: '<input type="text" />',
        actions: '<button class="clear-btn">Clear</button>',
      },
    })

    expect(wrapper.find('.clear-btn').exists()).toBe(true)
  })

  it('provides inputClass via scoped slot', () => {
    const wrapper = mount(InputWrapper, {
      props: { icon: 'lucide:search' },
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('pl-10')
    expect(input.classes()).toContain('rounded-md')
    expect(input.classes()).toContain('border')
  })

  it('adjusts padding when no icon is present', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('px-3')
  })

  it('adjusts padding when right content is present', () => {
    const wrapper = mount(InputWrapper, {
      props: { iconRight: 'lucide:x' },
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('pr-10')
  })

  it('applies small size classes', () => {
    const wrapper = mount(InputWrapper, {
      props: { size: 'sm' },
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('py-1.5')
    expect(input.classes()).toContain('text-xs')
  })

  it('applies medium size classes by default', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('py-2')
    expect(input.classes()).toContain('text-sm')
  })

  it('applies large size classes', () => {
    const wrapper = mount(InputWrapper, {
      props: { size: 'lg' },
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('py-3')
    expect(input.classes()).toContain('text-base')
  })

  it('applies invalid state classes', () => {
    const wrapper = mount(InputWrapper, {
      props: { invalid: true },
      slots: {
        default: `<template #default="{ inputClass }">
          <input type="text" :class="inputClass" data-testid="input" />
        </template>`,
      },
    })

    const input = wrapper.find('[data-testid="input"]')
    expect(input.classes()).toContain('border-red-500')
  })

  it('applies custom wrapper class', () => {
    const wrapper = mount(InputWrapper, {
      props: { wrapperClass: 'my-custom-class' },
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.my-custom-class').exists()).toBe(true)
  })

  it('has relative positioning on wrapper', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.relative').exists()).toBe(true)
  })

  it('positions left icon correctly', () => {
    const wrapper = mount(InputWrapper, {
      props: { icon: 'lucide:search' },
      slots: {
        default: '<input type="text" />',
      },
    })

    const iconContainer = wrapper.find('.left-3')
    expect(iconContainer.exists()).toBe(true)
    expect(iconContainer.classes()).toContain('absolute')
    expect(iconContainer.classes()).toContain('top-1/2')
    expect(iconContainer.classes()).toContain('-translate-y-1/2')
  })

  it('positions right content correctly', () => {
    const wrapper = mount(InputWrapper, {
      props: { iconRight: 'lucide:x' },
      slots: {
        default: '<input type="text" />',
      },
    })

    const actionsContainer = wrapper.find('.right-3')
    expect(actionsContainer.exists()).toBe(true)
    expect(actionsContainer.classes()).toContain('absolute')
    expect(actionsContainer.classes()).toContain('flex')
    expect(actionsContainer.classes()).toContain('items-center')
  })

  it('does not render icon containers when no icons are provided', () => {
    const wrapper = mount(InputWrapper, {
      slots: {
        default: '<input type="text" />',
      },
    })

    expect(wrapper.find('.left-3').exists()).toBe(false)
    expect(wrapper.find('.right-3').exists()).toBe(false)
  })
})
