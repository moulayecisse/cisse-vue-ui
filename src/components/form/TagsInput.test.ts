import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagsInput from './TagsInput.vue'

describe('TagsInput', () => {
  it('renders an input', () => {
    const wrapper = mount(TagsInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('displays existing tags', () => {
    const wrapper = mount(TagsInput, {
      props: { modelValue: ['tag1', 'tag2', 'tag3'] },
    })

    expect(wrapper.text()).toContain('tag1')
    expect(wrapper.text()).toContain('tag2')
    expect(wrapper.text()).toContain('tag3')
  })

  it('adds tag on Enter key', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('newtag')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.props('modelValue')).toContain('newtag')
  })

  it('adds tag on comma key', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('newtag')
    await input.trigger('keydown', { key: ',' })

    expect(wrapper.props('modelValue')).toContain('newtag')
  })

  it('adds tag on blur', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('newtag')
    await input.trigger('blur')

    expect(wrapper.props('modelValue')).toContain('newtag')
  })

  it('removes tag on X button click', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['tag1', 'tag2'],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const removeButtons = wrapper.findAll('button')
    await removeButtons[0].trigger('click')

    expect(wrapper.props('modelValue')).not.toContain('tag1')
    expect(wrapper.props('modelValue')).toContain('tag2')
  })

  it('removes last tag on Backspace when input is empty', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['tag1', 'tag2'],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'Backspace' })

    expect(wrapper.props('modelValue')).toEqual(['tag1'])
  })

  it('prevents duplicate tags by default', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['existing'],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('existing')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.props('modelValue')).toEqual(['existing'])
  })

  it('allows duplicates when allowDuplicates is true', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['existing'],
        allowDuplicates: true,
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('existing')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.props('modelValue')).toEqual(['existing', 'existing'])
  })

  it('respects max limit', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['tag1', 'tag2'],
        max: 2,
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    // Input should not be visible when max reached
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('shows input when under max limit', () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['tag1'],
        max: 2,
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('trims whitespace from tags', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('  spaced tag  ')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.props('modelValue')).toEqual(['spaced tag'])
  })

  it('does not add empty tags', async () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (val: string[]) => wrapper.setProps({ modelValue: val }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('   ')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.props('modelValue')).toEqual([])
  })

  it('applies disabled state', () => {
    const wrapper = mount(TagsInput, {
      props: {
        modelValue: ['tag1'],
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    // Remove buttons should not be rendered when disabled
    // The button is conditionally rendered with v-if="!disabled"
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(0)
  })

  it('sets name attribute', () => {
    const wrapper = mount(TagsInput, {
      props: { name: 'tags' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('tags')
  })

  it('shows placeholder when no tags', () => {
    const wrapper = mount(TagsInput, {
      props: { placeholder: 'Add tags...', modelValue: [] },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Add tags...')
  })

  it('hides placeholder when has tags', () => {
    const wrapper = mount(TagsInput, {
      props: { placeholder: 'Add tags...', modelValue: ['tag1'] },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('')
  })

  it('exposes focus method', () => {
    const wrapper = mount(TagsInput)
    expect(typeof wrapper.vm.focus).toBe('function')
  })
})
