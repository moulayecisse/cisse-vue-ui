import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableComponent from './TableComponent.vue'
import type { Property } from '@/types'

const mockProperties: Property[] = [
  { name: 'id', label: 'ID', type: 'number' },
  { name: 'name', label: 'Name', type: 'text', main: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'active', label: 'Active', type: 'boolean' },
]

const mockItems = [
  { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', active: true },
]

describe('TableComponent', () => {
  it('renders table with headers', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: mockProperties,
        items: mockItems,
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('ID')
    expect(headers[1].text()).toBe('Name')
    expect(headers[2].text()).toBe('Email')
    expect(headers[3].text()).toBe('Active')
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: mockProperties,
        items: mockItems,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3)
  })

  it('uses property name as label fallback', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: [{ name: 'testField' }],
        items: [{ id: 1, testField: 'value' }],
      },
    })

    const header = wrapper.find('th')
    expect(header.text()).toBe('testField')
  })

  it('hides columns with hidden property', () => {
    const propertiesWithHidden: Property[] = [
      { name: 'id', label: 'ID' },
      { name: 'secret', label: 'Secret', hidden: true },
      { name: 'name', label: 'Name' },
    ]

    const wrapper = mount(TableComponent, {
      props: {
        properties: propertiesWithHidden,
        items: [{ id: 1, secret: 'hidden', name: 'Test' }],
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(2)
    expect(headers[0].text()).toBe('ID')
    expect(headers[1].text()).toBe('Name')
  })

  it('applies alignment classes', () => {
    const propertiesWithAlign: Property[] = [
      { name: 'left', label: 'Left', align: 'left' },
      { name: 'center', label: 'Center', align: 'center' },
      { name: 'right', label: 'Right', align: 'right' },
    ]

    const wrapper = mount(TableComponent, {
      props: {
        properties: propertiesWithAlign,
        items: [{ id: 1, left: 'L', center: 'C', right: 'R' }],
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers[0].classes()).toContain('text-left')
    expect(headers[1].classes()).toContain('text-center')
    expect(headers[2].classes()).toContain('text-right')
  })

  it('applies main column styling', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: [
          { name: 'main', label: 'Main', main: true },
          { name: 'other', label: 'Other' },
        ],
        items: [{ id: 1, main: 'Main Value', other: 'Other Value' }],
      },
    })

    const cells = wrapper.findAll('tbody td')
    expect(cells[0].classes()).toContain('font-semibold')
  })

  it('renders empty state slot when no items', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: mockProperties,
        items: [],
      },
      slots: {
        empty: '<div class="empty-state">No data available</div>',
      },
    })

    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('No data available')
  })

  it('renders action slot when provided', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: [{ name: 'name', label: 'Name' }],
        items: [{ id: 1, name: 'Test' }],
      },
      slots: {
        action: '<button class="action-btn">Edit</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
    // Extra column for actions
    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(2)
  })

  it('supports nested property values', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: [{ name: 'user.name', label: 'User Name' }],
        items: [{ id: 1, user: { name: 'Nested Name' } }],
      },
    })

    expect(wrapper.text()).toContain('Nested Name')
  })

  it('handles undefined nested values gracefully', () => {
    const wrapper = mount(TableComponent, {
      props: {
        properties: [{ name: 'user.name', label: 'User Name' }],
        items: [{ id: 1 }],
      },
    })

    // Should not throw error
    expect(wrapper.exists()).toBe(true)
  })

  describe('Selection', () => {
    it('renders selection checkboxes when selectable', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: true,
          selectedItems: new Set<string>(),
        },
      })

      // Header checkbox + row checkboxes
      const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
      expect(checkboxes.length).toBe(4) // 1 header + 3 rows
    })

    it('does not render selection checkboxes when not selectable', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: false,
        },
      })

      const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' })
      expect(checkboxes.length).toBe(0)
    })

    it('emits select event when row checkbox clicked', async () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: true,
          selectedItems: new Set<string>(),
        },
      })

      const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
      await rowCheckboxes[0].trigger('change')

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')![0]).toEqual(['1'])
    })

    it('emits selectAll event when header checkbox clicked', async () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: true,
          selectedItems: new Set<string>(),
        },
      })

      const headerCheckbox = wrapper.find('thead input[type="checkbox"]')
      await headerCheckbox.trigger('change')

      expect(wrapper.emitted('selectAll')).toBeTruthy()
    })

    it('applies selected row styling', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: true,
          selectedItems: new Set(['1']),
        },
      })

      const rows = wrapper.findAll('tbody tr')
      expect(rows[0].classes().some(c => c.includes('bg-primary'))).toBe(true)
      expect(rows[1].classes().some(c => c.includes('bg-primary'))).toBe(false)
    })

    it('respects selectableFilter', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: mockProperties,
          items: mockItems,
          selectable: true,
          selectedItems: new Set<string>(),
          selectableFilter: (item: { id: number | string }) => item.id !== 2,
        },
      })

      // Row with id=2 should not have a checkbox
      const rowCheckboxes = wrapper.findAll('tbody tr').map(row =>
        row.findComponent({ name: 'Checkbox' }).exists()
      )
      expect(rowCheckboxes).toEqual([true, false, true])
    })

    it('uses custom keyField', async () => {
      const itemsWithUuid = [
        { id: 1, uuid: 'abc-123', name: 'Item 1' },
        { id: 2, uuid: 'def-456', name: 'Item 2' },
      ]

      const wrapper = mount(TableComponent, {
        props: {
          properties: [{ name: 'name', label: 'Name' }],
          items: itemsWithUuid,
          selectable: true,
          selectedItems: new Set<string>(),
          keyField: 'uuid',
        },
      })

      const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
      await rowCheckboxes[0].trigger('change')

      expect(wrapper.emitted('select')![0]).toEqual(['abc-123'])
    })
  })

  describe('Custom slots', () => {
    it('renders header slot', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: [{ name: 'name', label: 'Name' }],
          items: [{ id: 1, name: 'Test' }],
        },
        slots: {
          'header-name': '<span class="custom-header">Custom Name</span>',
        },
      })

      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.custom-header').text()).toBe('Custom Name')
    })

    it('renders item slot', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: [{ name: 'name', label: 'Name' }],
          items: [{ id: 1, name: 'Test' }],
        },
        slots: {
          'item-name': '<span class="custom-cell">Custom Cell</span>',
        },
      })

      expect(wrapper.find('.custom-cell').exists()).toBe(true)
      expect(wrapper.find('.custom-cell').text()).toBe('Custom Cell')
    })
  })

  describe('Custom className', () => {
    it('applies custom className to cells', () => {
      const wrapper = mount(TableComponent, {
        props: {
          properties: [{ name: 'name', label: 'Name', className: 'custom-class' }],
          items: [{ id: 1, name: 'Test' }],
        },
      })

      const cell = wrapper.find('tbody td')
      expect(cell.classes()).toContain('custom-class')
    })
  })
})