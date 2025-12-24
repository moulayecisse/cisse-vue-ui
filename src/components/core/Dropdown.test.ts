import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from './Dropdown.vue'

const mockItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'delete', label: 'Delete', danger: true },
]

describe('Dropdown', () => {
  it('renders trigger button', () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows default trigger label', () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
    })

    expect(wrapper.text()).toContain('Options')
  })

  it('opens dropdown on click', async () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      attachTo: document.body,
    })

    // Click the trigger div
    const triggerDiv = wrapper.find('.relative > div')
    await triggerDiv.trigger('click')
    await wrapper.vm.$nextTick()

    // Menu items should be rendered
    expect(document.body.textContent).toContain('Edit')

    wrapper.unmount()
  })

  it('renders items when open', async () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      attachTo: document.body,
    })

    // Click trigger div
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Edit')
    expect(document.body.textContent).toContain('Duplicate')
    expect(document.body.textContent).toContain('Delete')

    wrapper.unmount()
  })

  it('emits select when item clicked', async () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      attachTo: document.body,
    })

    // Open dropdown
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    // Click first item
    const item = document.body.querySelector('button[class*="w-full"]') as HTMLElement
    item?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0][0]).toEqual(mockItems[0])

    wrapper.unmount()
  })

  it('closes after item selection', async () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      attachTo: document.body,
    })

    // Open dropdown
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    // Click first item
    const item = document.body.querySelector('button[class*="w-full"]') as HTMLElement
    item?.click()
    await wrapper.vm.$nextTick()

    // Dropdown should be closed
    const items = document.body.querySelectorAll('button[class*="w-full"][class*="text-left"]')
    expect(items.length).toBe(0)

    wrapper.unmount()
  })

  it('does not emit for disabled items', async () => {
    const itemsWithDisabled = [
      { key: 'active', label: 'Active' },
      { key: 'disabled', label: 'Disabled', disabled: true },
    ]

    const wrapper = mount(Dropdown, {
      props: { items: itemsWithDisabled },
      attachTo: document.body,
    })

    // Open dropdown
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    // Click disabled item
    const buttons = document.body.querySelectorAll('button[class*="w-full"]')
    const disabledButton = Array.from(buttons).find(b => b.textContent?.includes('Disabled')) as HTMLElement
    disabledButton?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('select')).toBeFalsy()

    wrapper.unmount()
  })

  it('renders divider items', async () => {
    const itemsWithDivider = [
      { key: 'item1', label: 'Item 1' },
      { key: 'divider', label: '', divider: true },
      { key: 'item2', label: 'Item 2' },
    ]

    const wrapper = mount(Dropdown, {
      props: { items: itemsWithDivider },
      attachTo: document.body,
    })

    // Open dropdown
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    const divider = document.body.querySelector('[class*="border-t"]')
    expect(divider).toBeTruthy()

    wrapper.unmount()
  })

  it('applies danger styling to danger items', async () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      attachTo: document.body,
    })

    // Open dropdown
    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    const deleteButton = Array.from(document.body.querySelectorAll('button')).find(
      b => b.textContent?.includes('Delete')
    )
    expect(deleteButton?.classList.toString()).toContain('red')

    wrapper.unmount()
  })

  it('renders custom trigger via slot', () => {
    const wrapper = mount(Dropdown, {
      props: { items: mockItems },
      slots: {
        trigger: '<span class="custom-trigger">Custom</span>',
      },
    })

    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').text()).toBe('Custom')
  })

  describe('width options', () => {
    it('applies auto width by default', async () => {
      const wrapper = mount(Dropdown, {
        props: { items: mockItems },
        attachTo: document.body,
      })

      const trigger = wrapper.find('div').element.querySelector('div')
      trigger?.click()
      await wrapper.vm.$nextTick()

      const menu = document.body.querySelector('[class*="z-9999"]')
      expect(menu?.classList.contains('min-w-40')).toBe(true)

      wrapper.unmount()
    })

    it('applies sm width', async () => {
      const wrapper = mount(Dropdown, {
        props: { items: mockItems, width: 'sm' },
        attachTo: document.body,
      })

      const trigger = wrapper.find('div').element.querySelector('div')
      trigger?.click()
      await wrapper.vm.$nextTick()

      const menu = document.body.querySelector('[class*="z-9999"]')
      expect(menu?.classList.contains('w-32')).toBe(true)

      wrapper.unmount()
    })
  })

  it('renders custom content via default slot', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        default: '<div class="custom-content">Custom Menu Content</div>',
      },
      attachTo: document.body,
    })

    const trigger = wrapper.find('div').element.querySelector('div')
    trigger?.click()
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Custom Menu Content')

    wrapper.unmount()
  })
})
