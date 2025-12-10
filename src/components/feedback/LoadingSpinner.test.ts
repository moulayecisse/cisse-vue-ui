import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from './LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('[class*="animate-spin"]').exists()).toBe(true)
  })

  it('renders without text by default', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders text when provided', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        text: 'Loading...',
      },
    })

    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading...')
  })

  describe('sizes', () => {
    it('applies sm size', () => {
      const wrapper = mount(LoadingSpinner, {
        props: { size: 'sm' },
      })

      const spinner = wrapper.find('[class*="animate-spin"]')
      expect(spinner.classes()).toContain('h-8')
      expect(spinner.classes()).toContain('w-8')
    })

    it('applies md size by default', () => {
      const wrapper = mount(LoadingSpinner)

      const spinner = wrapper.find('[class*="animate-spin"]')
      expect(spinner.classes()).toContain('h-12')
      expect(spinner.classes()).toContain('w-12')
    })

    it('applies lg size', () => {
      const wrapper = mount(LoadingSpinner, {
        props: { size: 'lg' },
      })

      const spinner = wrapper.find('[class*="animate-spin"]')
      expect(spinner.classes()).toContain('h-16')
      expect(spinner.classes()).toContain('w-16')
    })
  })

  it('has centered layout', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.flex').exists()).toBe(true)
    expect(wrapper.find('.justify-center').exists()).toBe(true)
    expect(wrapper.find('.items-center').exists()).toBe(true)
  })

  it('has padding', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.py-12').exists()).toBe(true)
  })

  it('spinner has primary border color', () => {
    const wrapper = mount(LoadingSpinner)

    const spinner = wrapper.find('[class*="animate-spin"]')
    expect(spinner.classes().some(c => c.includes('primary'))).toBe(true)
  })

  it('spinner is rounded', () => {
    const wrapper = mount(LoadingSpinner)

    const spinner = wrapper.find('[class*="animate-spin"]')
    expect(spinner.classes()).toContain('rounded-full')
  })

  it('text has muted color', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { text: 'Loading' },
    })

    const text = wrapper.find('p')
    expect(text.classes().some(c => c.includes('gray'))).toBe(true)
  })
})
