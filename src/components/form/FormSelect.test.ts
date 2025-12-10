import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormSelect from './FormSelect.vue'

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('FormSelect', () => {
  it('renders a trigger button', () => {
    const wrapper = mount(FormSelect, {
      props: { options: mockOptions },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows placeholder when no value selected', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        placeholder: 'Choose a fruit',
      },
    })

    expect(wrapper.text()).toContain('Choose a fruit')
  })

  it('shows default placeholder when none provided', () => {
    const wrapper = mount(FormSelect, {
      props: { options: mockOptions },
    })

    expect(wrapper.text()).toContain('Select...')
  })

  it('shows selected option label', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        modelValue: 'banana',
      },
    })

    expect(wrapper.text()).toContain('Banana')
  })

  it('opens dropdown on click', async () => {
    const wrapper = mount(FormSelect, {
      props: { options: mockOptions },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    // Dropdown content is teleported to body
    const options = document.body.querySelectorAll('[data-index]')
    expect(options.length).toBe(3)

    wrapper.unmount()
  })

  it('closes dropdown when option is selected', async () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        modelValue: null,
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    const option = document.body.querySelector('[data-index="1"]') as HTMLElement
    option?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['banana'])

    wrapper.unmount()
  })

  it('emits update:modelValue when option selected', async () => {
    const wrapper = mount(FormSelect, {
      props: { options: mockOptions },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    const option = document.body.querySelector('[data-index="0"]') as HTMLElement
    option?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['apple'])

    wrapper.unmount()
  })

  it('hides options with hidden property', async () => {
    const optionsWithHidden = [
      { value: 'a', label: 'Visible A' },
      { value: 'b', label: 'Hidden B', hidden: true },
      { value: 'c', label: 'Visible C' },
    ]

    const wrapper = mount(FormSelect, {
      props: { options: optionsWithHidden },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    const options = document.body.querySelectorAll('[data-index]')
    expect(options.length).toBe(2)

    expect(document.body.textContent).toContain('Visible A')
    expect(document.body.textContent).not.toContain('Hidden B')
    expect(document.body.textContent).toContain('Visible C')

    wrapper.unmount()
  })

  it('sets disabled attribute on trigger', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        disabled: true,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        disabled: true,
      },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    const options = document.body.querySelectorAll('[data-index]')
    expect(options.length).toBe(0)

    wrapper.unmount()
  })

  it('sets id from id prop', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        id: 'fruit-select',
      },
    })

    expect(wrapper.find('button').attributes('id')).toBe('fruit-select')
  })

  it('sets id from name prop when id not provided', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        name: 'fruit',
      },
    })

    expect(wrapper.find('button').attributes('id')).toBe('fruit')
  })

  describe('searchable', () => {
    it('shows search input when searchable', async () => {
      const wrapper = mount(FormSelect, {
        props: {
          options: mockOptions,
          searchable: true,
        },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')

      const searchInput = document.body.querySelector('input[type="text"]')
      expect(searchInput).toBeTruthy()

      wrapper.unmount()
    })

    it('filters options based on search query', async () => {
      const wrapper = mount(FormSelect, {
        props: {
          options: mockOptions,
          searchable: true,
        },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'ban'
      searchInput.dispatchEvent(new Event('input'))
      await wrapper.vm.$nextTick()

      const options = document.body.querySelectorAll('[data-index]')
      expect(options.length).toBe(1)
      expect(document.body.textContent).toContain('Banana')

      wrapper.unmount()
    })

    it('shows no results text when search has no matches', async () => {
      const wrapper = mount(FormSelect, {
        props: {
          options: mockOptions,
          searchable: true,
          noResultsText: 'Nothing found',
        },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'xyz'
      searchInput.dispatchEvent(new Event('input'))
      await wrapper.vm.$nextTick()

      expect(document.body.textContent).toContain('Nothing found')

      wrapper.unmount()
    })
  })

  describe('different value types', () => {
    it('supports number values', async () => {
      const numberOptions = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ]

      const wrapper = mount(FormSelect, {
        props: { options: numberOptions },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')

      const option = document.body.querySelector('[data-index="0"]') as HTMLElement
      option?.click()
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([1])

      wrapper.unmount()
    })

    it('supports boolean values', async () => {
      const boolOptions = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
      ]

      const wrapper = mount(FormSelect, {
        props: { options: boolOptions },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')

      // Select 'Yes' (true value)
      const option = document.body.querySelector('[data-index="0"]') as HTMLElement
      option?.click()
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])

      wrapper.unmount()
    })

    it('supports null values', () => {
      const nullOptions = [
        { value: null, label: 'None' },
        { value: 'something', label: 'Something' },
      ]

      const wrapper = mount(FormSelect, {
        props: {
          options: nullOptions,
          modelValue: null,
        },
      })

      expect(wrapper.text()).toContain('None')
    })
  })

  it('applies custom trigger class', () => {
    const wrapper = mount(FormSelect, {
      props: {
        options: mockOptions,
        triggerClass: 'custom-class',
      },
    })

    expect(wrapper.find('button').classes()).toContain('custom-class')
  })

  it('toggles dropdown on multiple clicks', async () => {
    const wrapper = mount(FormSelect, {
      props: { options: mockOptions },
      attachTo: document.body,
    })

    // Open
    await wrapper.find('button').trigger('click')
    let options = document.body.querySelectorAll('[data-index]')
    expect(options.length).toBe(3)

    // Close
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    options = document.body.querySelectorAll('[data-index]')
    expect(options.length).toBe(0)

    wrapper.unmount()
  })
})
