import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Combobox from './Combobox.vue'

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('Combobox', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        placeholder: 'Select option...',
      },
    })
    expect(wrapper.text()).toContain('Select option...')
  })

  it('displays selected value', () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        modelValue: 'a',
      },
    })
    expect(wrapper.text()).toContain('Option A')
  })

  it('opens dropdown on click', async () => {
    const wrapper = mount(Combobox, {
      props: { options: defaultOptions },
    })
    await wrapper.find('.relative > div').trigger('click')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('filters options based on search', async () => {
    const wrapper = mount(Combobox, {
      props: { options: defaultOptions },
    })
    await wrapper.find('.relative > div').trigger('click')
    await wrapper.find('input').setValue('Option A')
    const buttons = wrapper.findAll('button[type="button"]')
    const optionButtons = buttons.filter((btn) => btn.text().includes('Option'))
    expect(optionButtons.length).toBe(1)
    expect(optionButtons[0].text()).toContain('Option A')
  })

  it('emits update:modelValue on option select', async () => {
    const wrapper = mount(Combobox, {
      props: { options: defaultOptions },
    })
    await wrapper.find('.relative > div').trigger('click')
    const optionButton = wrapper.findAll('button').find((btn) => btn.text() === 'Option B')
    await optionButton?.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('supports multiple selection', async () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        multiple: true,
        modelValue: [],
      },
    })
    await wrapper.find('.relative > div').trigger('click')
    const optionA = wrapper.findAll('button').find((btn) => btn.text().includes('Option A'))
    await optionA?.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']])
  })

  it('displays multiple selected values', () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        multiple: true,
        modelValue: ['a', 'b'],
      },
    })
    expect(wrapper.text()).toContain('Option A, Option B')
  })

  it('shows clear button when clearable and has value', () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        modelValue: 'a',
        clearable: true,
      },
    })
    const clearButton = wrapper.findAll('button').find((btn) => btn.classes().includes('rounded'))
    expect(clearButton).toBeDefined()
  })

  it('clears value when clear button is clicked', async () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        modelValue: 'a',
        clearable: true,
      },
    })
    const clearButton = wrapper
      .findAll('button')
      .find((btn) => btn.classes().includes('rounded') && btn.classes().includes('p-0.5'))
    await clearButton?.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        disabled: true,
      },
    })
    await wrapper.find('.relative > div').trigger('click')
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('shows no results message when search has no matches', async () => {
    const wrapper = mount(Combobox, {
      props: {
        options: defaultOptions,
        noResultsText: 'Nothing found',
      },
    })
    await wrapper.find('.relative > div').trigger('click')
    await wrapper.find('input').setValue('xyz')
    expect(wrapper.text()).toContain('Nothing found')
  })

  it('prevents selection of disabled options', async () => {
    const wrapper = mount(Combobox, {
      props: {
        options: [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B', disabled: true },
        ],
      },
    })
    await wrapper.find('.relative > div').trigger('click')
    const disabledOption = wrapper.findAll('button').find((btn) => btn.text().includes('Option B'))
    await disabledOption?.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
