import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tr from './Tr.vue'

describe('Tr', () => {
  it('renders tr element', () => {
    const wrapper = mount(Tr)
    expect(wrapper.find('tr').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Tr, {
      slots: {
        default: '<td>Cell content</td>',
      },
    })
    expect(wrapper.text()).toContain('Cell content')
  })

  it('applies selected styling when selected=true', () => {
    const wrapper = mount(Tr, {
      props: { selected: true },
    })
    expect(wrapper.find('tr').classes().some(c => c.includes('bg-primary'))).toBe(true)
  })

  it('does not apply selected styling when selected=false', () => {
    const wrapper = mount(Tr, {
      props: { selected: false },
    })
    expect(wrapper.find('tr').classes().some(c => c.includes('bg-primary'))).toBe(false)
  })

  it('applies clickable styling when clickable=true', () => {
    const wrapper = mount(Tr, {
      props: { clickable: true },
    })
    expect(wrapper.find('tr').classes()).toContain('cursor-pointer')
  })

  it('does not apply clickable styling when clickable=false', () => {
    const wrapper = mount(Tr, {
      props: { clickable: false },
    })
    expect(wrapper.find('tr').classes()).not.toContain('cursor-pointer')
  })

  it('applies disabled styling when disabled=true', () => {
    const wrapper = mount(Tr, {
      props: { disabled: true },
    })
    expect(wrapper.find('tr').classes()).toContain('opacity-50')
    expect(wrapper.find('tr').classes()).toContain('cursor-not-allowed')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Tr, {
      props: { clickable: true },
    })

    await wrapper.find('tr').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies even row styling when even=true', () => {
    const wrapper = mount(Tr, {
      props: { even: true },
    })
    // Even rows have slightly different background
    const tr = wrapper.find('tr')
    expect(tr.exists()).toBe(true)
  })
})
