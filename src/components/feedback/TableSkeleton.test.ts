import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableSkeleton from './TableSkeleton.vue'

describe('TableSkeleton', () => {
  it('renders with default props', () => {
    const wrapper = mount(TableSkeleton)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders 5 rows by default', () => {
    const wrapper = mount(TableSkeleton)
    const rows = wrapper.findAll('.border-b.border-gray-100')
    expect(rows.length).toBe(5)
  })

  it('renders custom number of rows', () => {
    const wrapper = mount(TableSkeleton, {
      props: { rows: 3 },
    })
    const rows = wrapper.findAll('.border-b.border-gray-100')
    expect(rows.length).toBe(3)
  })

  it('renders 4 columns by default', () => {
    const wrapper = mount(TableSkeleton)
    const firstRow = wrapper.findAll('.border-b.border-gray-100')[0]
    const cells = firstRow.findAll('.flex-1')
    expect(cells.length).toBe(4)
  })

  it('renders custom number of columns', () => {
    const wrapper = mount(TableSkeleton, {
      props: { columns: 6 },
    })
    const firstRow = wrapper.findAll('.border-b.border-gray-100')[0]
    const cells = firstRow.findAll('.flex-1')
    expect(cells.length).toBe(6)
  })

  it('shows header by default', () => {
    const wrapper = mount(TableSkeleton)
    expect(wrapper.find('.border-b.border-gray-200').exists()).toBe(true)
  })

  it('hides header when showHeader is false', () => {
    const wrapper = mount(TableSkeleton, {
      props: { showHeader: false },
    })
    expect(wrapper.find('.border-b.border-gray-200').exists()).toBe(false)
  })

  it('has animate-pulse class for skeleton effect', () => {
    const wrapper = mount(TableSkeleton)
    expect(wrapper.findAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('applies opacity fade to rows', () => {
    const wrapper = mount(TableSkeleton, {
      props: { rows: 5 },
    })
    const rows = wrapper.findAll('.border-b.border-gray-100')
    const lastRowStyle = rows[rows.length - 1].findAll('.flex-1')[0].attributes('style')
    expect(lastRowStyle).toContain('opacity')
  })

  it('supports dark mode classes', () => {
    const wrapper = mount(TableSkeleton)
    expect(wrapper.html()).toContain('dark:')
  })
})
