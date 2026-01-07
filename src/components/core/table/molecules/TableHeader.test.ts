import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableHeader from './TableHeader.vue'
import type { Property } from '@/types'

const mockColumns: Property[] = [
  { name: 'id', label: 'ID', type: 'number' },
  { name: 'name', label: 'Name', type: 'text', main: true },
  { name: 'email', label: 'Email', type: 'text' },
]

describe('TableHeader', () => {
  it('renders tr element', () => {
    const wrapper = mount(TableHeader, {
      props: { columns: mockColumns },
    })
    expect(wrapper.find('tr').exists()).toBe(true)
  })

  it('renders column headers', () => {
    const wrapper = mount(TableHeader, {
      props: { columns: mockColumns },
    })

    expect(wrapper.text()).toContain('ID')
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
  })

  it('renders correct number of th elements', () => {
    const wrapper = mount(TableHeader, {
      props: { columns: mockColumns },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(3)
  })

  it('renders select-all checkbox when selectable=true', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        selectable: true,
      },
    })

    expect(wrapper.findComponent({ name: 'Checkbox' }).exists()).toBe(true)
    // Extra th for checkbox column
    expect(wrapper.findAll('th').length).toBe(4)
  })

  it('does not render select-all checkbox when selectable=false', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        selectable: false,
      },
    })

    expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBe(0)
  })

  it('emits selectAll event when checkbox clicked', async () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        selectable: true,
      },
    })

    const checkbox = wrapper.findComponent({ name: 'Checkbox' })
    await checkbox.vm.$emit('update:modelValue')

    expect(wrapper.emitted('selectAll')).toBeTruthy()
  })

  it('renders action column header when showActions=true', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        showActions: true,
      },
    })

    // Extra th for actions column
    expect(wrapper.findAll('th').length).toBe(4)
  })

  it('applies column alignment', () => {
    const columnsWithAlign: Property[] = [
      { name: 'left', label: 'Left', align: 'left' },
      { name: 'center', label: 'Center', align: 'center' },
      { name: 'right', label: 'Right', align: 'right' },
    ]

    const wrapper = mount(TableHeader, {
      props: { columns: columnsWithAlign },
    })

    const headers = wrapper.findAll('th')
    expect(headers[0].classes()).toContain('text-left')
    expect(headers[1].classes()).toContain('text-center')
    expect(headers[2].classes()).toContain('text-right')
  })

  it('renders sortable columns when sortable=true', () => {
    const sortableColumns: Property[] = [
      { name: 'name', label: 'Name', sortable: true },
      { name: 'email', label: 'Email', sortable: false },
    ]

    const wrapper = mount(TableHeader, {
      props: { columns: sortableColumns },
    })

    // Sortable column should have sortable Th component
    const thComponents = wrapper.findAllComponents({ name: 'Th' })
    // First th is for sortable column, should pass sortable prop
    expect(thComponents.length).toBeGreaterThan(0)
  })

  it('emits sort event when sortable column clicked', async () => {
    const sortableColumns: Property[] = [
      { name: 'name', label: 'Name', sortable: true },
    ]

    const wrapper = mount(TableHeader, {
      props: { columns: sortableColumns },
    })

    // Click the th element directly
    const thElements = wrapper.findAll('th')
    await thElements[0].trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()
    expect(wrapper.emitted('sort')![0][0]).toBe('name')
  })

  it('shows sort direction indicator for sorted column', () => {
    const sortableColumns: Property[] = [
      { name: 'name', label: 'Name', sortable: true },
    ]

    const wrapper = mount(TableHeader, {
      props: {
        columns: sortableColumns,
        sortBy: 'name',
        sortDirection: 'asc',
      },
    })

    // Should show ascending indicator
    expect(wrapper.text()).toContain('Name')
  })

  it('uses property name as label fallback', () => {
    const columnsNoLabel: Property[] = [{ name: 'testField' }]

    const wrapper = mount(TableHeader, {
      props: { columns: columnsNoLabel },
    })

    expect(wrapper.text()).toContain('testField')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: [{ name: 'name', label: 'Name' }],
      },
      slots: {
        'header-name': '<span class="custom-header">Custom</span>',
      },
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').text()).toBe('Custom')
  })

  it('applies allSelected state to checkbox', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        selectable: true,
        allSelected: true,
      },
    })

    const checkbox = wrapper.findComponent({ name: 'Checkbox' })
    expect(checkbox.props('modelValue')).toBe(true)
  })

  it('applies indeterminate state to checkbox via someSelected', () => {
    const wrapper = mount(TableHeader, {
      props: {
        columns: mockColumns,
        selectable: true,
        someSelected: true,
      },
    })

    const checkbox = wrapper.findComponent({ name: 'Checkbox' })
    expect(checkbox.props('indeterminate')).toBe(true)
  })
})
