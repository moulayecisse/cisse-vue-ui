import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileList from './MobileList.vue'

const mockItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]

describe('MobileList', () => {
  it('renders all items', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
      slots: {
        content: '<span>{{ item.name }}</span>',
      },
    })

    expect(wrapper.findAllComponents({ name: 'CardComponent' }).length).toBe(3)
  })

  it('renders content slot for each item', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
      slots: {
        content: `<template #content="{ item }"><span class="item-name">{{ item.name }}</span></template>`,
      },
    })

    expect(wrapper.findAll('.item-name').length).toBe(3)
  })

  it('renders avatar slot', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
      slots: {
        avatar: '<div class="avatar">AV</div>',
      },
    })

    expect(wrapper.findAll('.avatar').length).toBe(3)
  })

  it('renders actions slot', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
      slots: {
        actions: '<button class="action-btn">Edit</button>',
      },
    })

    expect(wrapper.findAll('.action-btn').length).toBe(3)
  })

  it('renders empty slot when no items', () => {
    const wrapper = mount(MobileList, {
      props: { items: [] },
      slots: {
        empty: '<div class="empty-state">No items</div>',
      },
    })

    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  it('does not render empty slot when items exist', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
      slots: {
        empty: '<div class="empty-state">No items</div>',
      },
    })

    expect(wrapper.find('.empty-state').exists()).toBe(false)
  })

  describe('selection', () => {
    it('shows checkboxes when selectable', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
        },
      })

      expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBeGreaterThan(0)
    })

    it('does not show checkboxes when not selectable', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: false,
        },
      })

      // Only item cards, no select-all header
      expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBe(0)
    })

    it('shows select all header when selectable', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
        },
      })

      expect(wrapper.text()).toContain('Tout sélectionner')
    })

    it('emits select when item checkbox clicked', async () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
        },
      })

      const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
      // First checkbox is select-all, second is first item
      await checkboxes[1].vm.$emit('update:modelValue', true)

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')![0]).toEqual(['1'])
    })

    it('emits selectAll when select all clicked', async () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
        },
      })

      const selectAllCheckbox = wrapper.findComponent({ name: 'Checkbox' })
      await selectAllCheckbox.vm.$emit('update:modelValue', true)

      expect(wrapper.emitted('selectAll')).toBeTruthy()
    })

    it('shows selected count', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
          selectedItems: new Set(['1', '2']),
        },
      })

      expect(wrapper.text()).toContain('2 sélectionnés')
    })

    it('highlights selected items', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
          selectedItems: new Set(['1']),
        },
      })

      const cards = wrapper.findAllComponents({ name: 'CardComponent' })
      // Second card (first item) should have ring class
      expect(cards[1].classes()).toContain('ring-2')
    })

    it('respects selectableFilter', () => {
      const wrapper = mount(MobileList, {
        props: {
          items: mockItems,
          selectable: true,
          selectableFilter: (item: { id: number }) => item.id !== 2,
        },
      })

      // Should have checkbox for items 1 and 3, but not 2
      // 1 select-all + 2 item checkboxes = 3 total
      expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBe(3)
    })
  })

  it('uses custom keyField', () => {
    const customItems = [
      { customId: 'a', name: 'Item A' },
      { customId: 'b', name: 'Item B' },
    ]

    const wrapper = mount(MobileList, {
      props: {
        items: customItems,
        keyField: 'customId',
        selectable: true,
        selectedItems: new Set(['a']),
      },
    })

    // First item should be selected
    const cards = wrapper.findAllComponents({ name: 'CardComponent' })
    expect(cards[1].classes()).toContain('ring-2')
  })

  it('has vertical spacing between items', () => {
    const wrapper = mount(MobileList, {
      props: { items: mockItems },
    })

    expect(wrapper.find('.space-y-3').exists()).toBe(true)
  })
})
