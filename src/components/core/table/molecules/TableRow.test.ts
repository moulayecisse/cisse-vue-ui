import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableRow from './TableRow.vue'
import type { Property } from '@/types'

const mockColumns: Property[] = [
  { name: 'id', label: 'ID', type: 'number' },
  { name: 'name', label: 'Name', type: 'text', main: true },
  { name: 'email', label: 'Email', type: 'text' },
]

const mockItem = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
}

describe('TableRow', () => {
  it('renders tr element', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
      },
    })
    expect(wrapper.find('tr').exists()).toBe(true)
  })

  it('renders data cells', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
      },
    })

    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('renders correct number of td elements', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
      },
    })

    const cells = wrapper.findAll('td')
    expect(cells.length).toBe(3)
  })

  it('renders checkbox when selectable=true', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        selectable: true,
      },
    })

    expect(wrapper.findComponent({ name: 'Checkbox' }).exists()).toBe(true)
    // Extra td for checkbox column
    expect(wrapper.findAll('td').length).toBe(4)
  })

  it('does not render checkbox when selectable=false', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        selectable: false,
      },
    })

    expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBe(0)
  })

  it('hides checkbox when canSelect=false', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        selectable: true,
        canSelect: false,
      },
    })

    // Should have td for selection column but no checkbox
    expect(wrapper.findAllComponents({ name: 'Checkbox' }).length).toBe(0)
    expect(wrapper.findAll('td').length).toBe(4) // Still has the selection column
  })

  it('emits select event when checkbox clicked', async () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        selectable: true,
      },
    })

    const checkbox = wrapper.findComponent({ name: 'Checkbox' })
    await checkbox.vm.$emit('update:modelValue')

    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('applies selected styling when selected=true', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        selected: true,
      },
    })

    expect(wrapper.find('tr').classes().some(c => c.includes('bg-primary'))).toBe(true)
  })

  it('renders action column when showActions=true', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        showActions: true,
      },
    })

    // Extra td for actions column
    expect(wrapper.findAll('td').length).toBe(4)
  })

  it('renders actions slot content', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        showActions: true,
      },
      slots: {
        actions: '<button class="action-btn">Edit</button>',
      },
    })

    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('applies main column styling', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
      },
    })

    const cells = wrapper.findAll('td')
    // Name column has main=true
    expect(cells[1].classes()).toContain('font-semibold')
  })

  it('handles nested property values', () => {
    const columnsWithNested: Property[] = [
      { name: 'user.name', label: 'User Name' },
    ]

    const itemWithNested = {
      id: 1,
      user: { name: 'Nested Name' },
    }

    const wrapper = mount(TableRow, {
      props: {
        item: itemWithNested,
        columns: columnsWithNested,
      },
    })

    expect(wrapper.text()).toContain('Nested Name')
  })

  it('handles undefined nested values gracefully', () => {
    const columnsWithNested: Property[] = [
      { name: 'user.name', label: 'User Name' },
    ]

    const itemWithoutNested = { id: 1 }

    const wrapper = mount(TableRow, {
      props: {
        item: itemWithoutNested,
        columns: columnsWithNested,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders cell slot when provided', () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: [{ name: 'name', label: 'Name' }],
      },
      slots: {
        'cell-name': '<span class="custom-cell">Custom</span>',
      },
    })

    expect(wrapper.find('.custom-cell').exists()).toBe(true)
    expect(wrapper.find('.custom-cell').text()).toBe('Custom')
  })

  it('applies column alignment to cells', () => {
    const columnsWithAlign: Property[] = [
      { name: 'left', label: 'Left', align: 'left' },
      { name: 'center', label: 'Center', align: 'center' },
      { name: 'right', label: 'Right', align: 'right' },
    ]

    const itemWithAlign = { id: 1, left: 'L', center: 'C', right: 'R' }

    const wrapper = mount(TableRow, {
      props: {
        item: itemWithAlign,
        columns: columnsWithAlign,
      },
    })

    const cells = wrapper.findAll('td')
    expect(cells[0].classes()).toContain('text-left')
    expect(cells[1].classes()).toContain('text-center')
    expect(cells[2].classes()).toContain('text-right')
  })

  it('applies custom className to cells', () => {
    const columnsWithClass: Property[] = [
      { name: 'name', label: 'Name', className: 'custom-class' },
    ]

    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: columnsWithClass,
      },
    })

    const cell = wrapper.find('td')
    expect(cell.classes()).toContain('custom-class')
  })

  it('emits click event when clickable row is clicked', async () => {
    const wrapper = mount(TableRow, {
      props: {
        item: mockItem,
        columns: mockColumns,
        clickable: true,
      },
    })

    await wrapper.find('tr').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('uses appropriate type component based on column type', () => {
    const columnsWithTypes: Property[] = [
      { name: 'text', label: 'Text', type: 'text' },
      { name: 'number', label: 'Number', type: 'number' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'boolean', label: 'Boolean', type: 'boolean' },
    ]

    const itemWithTypes = {
      id: 1,
      text: 'Hello',
      number: 123,
      date: '2024-01-01',
      boolean: true,
    }

    const wrapper = mount(TableRow, {
      props: {
        item: itemWithTypes,
        columns: columnsWithTypes,
      },
    })

    // Should render without errors
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.text()).toContain('123')
  })
})
