import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'

describe('DataTable', () => {
  const columns = [
    { name: 'id', label: 'ID', type: 'number' as const },
    { name: 'name', label: 'Name', type: 'text' as const },
    { name: 'email', label: 'Email', type: 'text' as const },
  ]

  const createItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }))

  describe('basic rendering', () => {
    it('renders table with items', () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items },
      })

      expect(wrapper.find('table').exists()).toBe(true)
      expect(wrapper.findAll('tbody tr')).toHaveLength(5)
    })

    it('renders empty state when no items', () => {
      const wrapper = mount(DataTable, {
        props: { properties: columns, items: [] },
      })

      expect(wrapper.text()).toContain('No data available')
    })

    it('renders loading skeleton', () => {
      const wrapper = mount(DataTable, {
        props: { properties: columns, items: [], loading: true },
      })

      expect(wrapper.findComponent({ name: 'TableSkeleton' }).exists()).toBe(true)
    })

    it('renders error state', () => {
      const wrapper = mount(DataTable, {
        props: {
          properties: columns,
          items: [],
          error: true,
          errorMessage: 'Failed to load',
        },
      })

      expect(wrapper.text()).toContain('Failed to load')
    })
  })

  describe('pagination', () => {
    it('shows all items when pagination disabled', () => {
      const items = createItems(25)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: false },
      })

      expect(wrapper.findAll('tbody tr')).toHaveLength(25)
    })

    it('paginates items when enabled', () => {
      const items = createItems(25)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: true, pageSize: 10 },
      })

      expect(wrapper.findAll('tbody tr')).toHaveLength(10)
    })

    it('shows pagination controls when paginated', () => {
      const items = createItems(25)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: true, pageSize: 10 },
      })

      expect(wrapper.findComponent({ name: 'PaginationControls' }).exists()).toBe(true)
    })

    it('does not show pagination controls when not paginated', () => {
      const items = createItems(25)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: false },
      })

      expect(wrapper.findComponent({ name: 'PaginationControls' }).exists()).toBe(false)
    })

    it('emits update:currentPage when page changes', async () => {
      const items = createItems(25)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: true, pageSize: 10 },
      })

      const pagination = wrapper.findComponent({ name: 'PaginationControls' })
      await pagination.vm.$emit('update:currentPage', 2)

      expect(wrapper.emitted('update:currentPage')).toBeTruthy()
      expect(wrapper.emitted('update:currentPage')![0]).toEqual([2])
    })

    it('emits update:pageSize when page size changes', async () => {
      const items = createItems(50)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, paginated: true, pageSize: 10 },
      })

      const pagination = wrapper.findComponent({ name: 'PaginationControls' })
      await pagination.vm.$emit('update:pageSize', 20)

      expect(wrapper.emitted('update:pageSize')).toBeTruthy()
      expect(wrapper.emitted('update:pageSize')![0]).toEqual([20])
    })

    it('respects controlled currentPage prop', async () => {
      const items = createItems(30)
      const wrapper = mount(DataTable, {
        props: {
          properties: columns,
          items,
          paginated: true,
          pageSize: 10,
          currentPage: 2,
        },
      })

      // Page 2 should show items 11-20
      const rows = wrapper.findAll('tbody tr')
      expect(rows).toHaveLength(10)
      // First cell of first row should show ID 11
      expect(rows[0].text()).toContain('11')
    })

    it('handles server-side pagination with totalItems', () => {
      // Server-side: items array only contains current page data
      const items = createItems(10) // Only page 1 data
      const wrapper = mount(DataTable, {
        props: {
          properties: columns,
          items,
          paginated: true,
          pageSize: 10,
          totalItems: 100, // Server says there are 100 total
        },
      })

      const pagination = wrapper.findComponent({ name: 'PaginationControls' })
      expect(pagination.props('totalPages')).toBe(10) // 100 items / 10 per page
    })
  })

  describe('selection', () => {
    it('emits select event when row selected', async () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: {
          properties: columns,
          items,
          selectable: true,
          selectedItems: new Set<string>(),
        },
      })

      const checkbox = wrapper.find('tbody input[type="checkbox"]')
      await checkbox.trigger('change')

      expect(wrapper.emitted('select')).toBeTruthy()
    })

    it('emits selectAll event when header checkbox clicked', async () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: {
          properties: columns,
          items,
          selectable: true,
          selectedItems: new Set<string>(),
        },
      })

      const headerCheckbox = wrapper.find('thead input[type="checkbox"]')
      await headerCheckbox.trigger('change')

      expect(wrapper.emitted('selectAll')).toBeTruthy()
    })
  })

  describe('sorting', () => {
    it('emits sort event when sortable column clicked', async () => {
      const sortableColumns = columns.map((c) => ({ ...c, sortable: true }))
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: sortableColumns, items },
      })

      // Get the first sortable column header (skipping selection checkbox if present)
      const headers = wrapper.findAll('thead th')
      const sortableHeader = headers.find((h) => h.attributes('aria-sort') !== undefined)
      expect(sortableHeader).toBeTruthy()
      await sortableHeader!.trigger('click')

      expect(wrapper.emitted('sort')).toBeTruthy()
    })
  })

  describe('row click', () => {
    it('emits rowClick when clickable row clicked', async () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, clickableRows: true },
      })

      const row = wrapper.find('tbody tr')
      await row.trigger('click')

      expect(wrapper.emitted('rowClick')).toBeTruthy()
      expect(wrapper.emitted('rowClick')![0][0]).toEqual(items[0])
    })

    it('does not emit rowClick when clickableRows is false', async () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, clickableRows: false },
      })

      const row = wrapper.find('tbody tr')
      await row.trigger('click')

      expect(wrapper.emitted('rowClick')).toBeFalsy()
    })
  })

  describe('styling props', () => {
    it('passes striped prop to Table', () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, striped: true },
      })

      const table = wrapper.findComponent({ name: 'Table' })
      expect(table.props('striped')).toBe(true)
    })

    it('passes bordered prop to Table', () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, bordered: true },
      })

      const table = wrapper.findComponent({ name: 'Table' })
      expect(table.props('bordered')).toBe(true)
    })

    it('passes compact prop to Table', () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, compact: true },
      })

      const table = wrapper.findComponent({ name: 'Table' })
      expect(table.props('compact')).toBe(true)
    })

    it('passes stickyHeader prop to Table', () => {
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columns, items, stickyHeader: true },
      })

      const table = wrapper.findComponent({ name: 'Table' })
      expect(table.props('stickyHeader')).toBe(true)
    })
  })

  describe('hidden columns', () => {
    it('filters out hidden properties', () => {
      const columnsWithHidden = [
        ...columns,
        { name: 'secret', label: 'Secret', type: 'text' as const, hidden: true },
      ]
      const items = createItems(5)
      const wrapper = mount(DataTable, {
        props: { properties: columnsWithHidden, items },
      })

      const headers = wrapper.findAll('th')
      expect(headers.some((h) => h.text().includes('Secret'))).toBe(false)
    })
  })
})
