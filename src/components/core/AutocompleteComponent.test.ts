import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AutocompleteComponent from './AutocompleteComponent.vue'

const mockOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
]

describe('AutocompleteComponent', () => {
  it('renders input field', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('shows placeholder', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        placeholder: 'Search countries...',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search countries...')
  })

  it('shows default placeholder', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('renders label when provided', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        label: 'Select Country',
      },
    })

    expect(wrapper.text()).toContain('Select Country')
  })

  it('opens dropdown on focus', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
      attachTo: document.body,
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('United States')

    wrapper.unmount()
  })

  it('filters options based on search query', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
      attachTo: document.body,
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').setValue('united')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('United States')
    expect(document.body.textContent).toContain('United Kingdom')
    expect(document.body.textContent).not.toContain('France')

    wrapper.unmount()
  })

  it('emits update:modelValue when option selected', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
      attachTo: document.body,
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.vm.$nextTick()

    const option = document.body.querySelector('[data-index="0"]') as HTMLElement
    option?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['us'])

    wrapper.unmount()
  })

  it('shows selected option label in input', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: 'fr',
        options: mockOptions,
      },
    })

    expect(wrapper.find('input').element.value).toBe('France')
  })

  it('shows error message', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        error: 'This field is required',
      },
    })

    expect(wrapper.text()).toContain('This field is required')
  })

  it('applies error styling when error present', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        error: 'Error',
      },
    })

    expect(wrapper.find('[class*="border-red"]').exists()).toBe(true)
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows clear button when value is selected', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: 'us',
        options: mockOptions,
      },
    })

    // Should have a clear button (x icon)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(1)
  })

  it('does not show clear button when disabled', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: 'us',
        options: mockOptions,
        disabled: true,
      },
    })

    // Clear button should not be visible
    const clearBtn = wrapper.findAll('button').find(b => b.html().includes('lucide:x'))
    expect(clearBtn).toBeFalsy()
  })

  it('clears selection when clear button clicked', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: 'us',
        options: mockOptions,
      },
    })

    // Find clear button (first button with x icon)
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([null])
  })

  it('shows no results text when search has no matches', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
        noResultsText: 'Nothing found',
      },
      attachTo: document.body,
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').setValue('xyz')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Nothing found')

    wrapper.unmount()
  })

  it('uses default no results text', async () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
      attachTo: document.body,
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').setValue('xyz')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('No results found')

    wrapper.unmount()
  })

  it('has toggle button', () => {
    const wrapper = mount(AutocompleteComponent, {
      props: {
        modelValue: null,
        options: mockOptions,
      },
    })

    // Should have chevron button
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
