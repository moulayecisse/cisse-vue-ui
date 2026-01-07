import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useColumnVisibility } from './useColumnVisibility'

describe('useColumnVisibility', () => {
  const sampleColumns = [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'role', label: 'Role' },
  ]

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('initialization', () => {
    it('initializes with all columns visible by default', () => {
      const { visibleColumns, hiddenColumns } = useColumnVisibility({
        columns: sampleColumns,
      })

      expect(visibleColumns.value).toHaveLength(4)
      expect(hiddenColumns.value.size).toBe(0)
    })

    it('respects initialHidden option', () => {
      const { visibleColumns, hiddenColumns, isVisible } = useColumnVisibility({
        columns: sampleColumns,
        initialHidden: ['id', 'role'],
      })

      expect(visibleColumns.value).toHaveLength(2)
      expect(hiddenColumns.value.size).toBe(2)
      expect(isVisible('id')).toBe(false)
      expect(isVisible('name')).toBe(true)
      expect(isVisible('email')).toBe(true)
      expect(isVisible('role')).toBe(false)
    })

    it('works with reactive columns ref', () => {
      const columnsRef = ref(sampleColumns)
      const { visibleColumns } = useColumnVisibility({
        columns: columnsRef,
      })

      expect(visibleColumns.value).toHaveLength(4)

      // Update columns
      columnsRef.value = [...columnsRef.value, { name: 'status', label: 'Status' }]
      expect(visibleColumns.value).toHaveLength(5)
    })
  })

  describe('visibility operations', () => {
    it('hides a column', () => {
      const { hide, isVisible, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
      })

      hide('email')
      expect(isVisible('email')).toBe(false)
      expect(visibleColumns.value).toHaveLength(3)
    })

    it('shows a hidden column', () => {
      const { show, hide, isVisible, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
      })

      hide('email')
      expect(isVisible('email')).toBe(false)

      show('email')
      expect(isVisible('email')).toBe(true)
      expect(visibleColumns.value).toHaveLength(4)
    })

    it('toggles column visibility', () => {
      const { toggle, isVisible } = useColumnVisibility({
        columns: sampleColumns,
      })

      expect(isVisible('email')).toBe(true)
      toggle('email')
      expect(isVisible('email')).toBe(false)
      toggle('email')
      expect(isVisible('email')).toBe(true)
    })

    it('shows all columns', () => {
      const { showAll, visibleColumns, hiddenColumns } = useColumnVisibility({
        columns: sampleColumns,
        initialHidden: ['id', 'email'],
      })

      expect(visibleColumns.value).toHaveLength(2)
      showAll()
      expect(visibleColumns.value).toHaveLength(4)
      expect(hiddenColumns.value.size).toBe(0)
    })

    it('hides all columns (respects minVisible)', () => {
      const { hideAll, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
        minVisible: 1,
      })

      hideAll()
      expect(visibleColumns.value).toHaveLength(1)
    })

    it('resets to initial state', () => {
      const { hide, reset, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
        initialHidden: ['id'],
      })

      hide('email')
      hide('role')
      expect(visibleColumns.value).toHaveLength(1)

      reset()
      expect(visibleColumns.value).toHaveLength(3)
    })
  })

  describe('minVisible constraint', () => {
    it('prevents hiding when at minVisible', () => {
      const { hide, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
        initialHidden: ['id', 'email', 'role'],
        minVisible: 1,
      })

      expect(visibleColumns.value).toHaveLength(1)
      hide('name') // Should not work
      expect(visibleColumns.value).toHaveLength(1)
    })

    it('respects custom minVisible value', () => {
      const { hideAll, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
        minVisible: 2,
      })

      hideAll()
      expect(visibleColumns.value).toHaveLength(2)
    })
  })

  describe('setVisibility', () => {
    it('sets multiple columns visibility at once', () => {
      const { setVisibility, isVisible, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
      })

      setVisibility({
        id: false,
        name: true,
        email: false,
        role: true,
      })

      expect(isVisible('id')).toBe(false)
      expect(isVisible('name')).toBe(true)
      expect(isVisible('email')).toBe(false)
      expect(isVisible('role')).toBe(true)
      expect(visibleColumns.value).toHaveLength(2)
    })

    it('enforces minVisible when setting visibility', () => {
      const { setVisibility, visibleColumns } = useColumnVisibility({
        columns: sampleColumns,
        minVisible: 2,
      })

      // Try to hide all
      setVisibility({
        id: false,
        name: false,
        email: false,
        role: false,
      })

      expect(visibleColumns.value).toHaveLength(2)
    })
  })

  describe('columns computed', () => {
    it('adds hidden property to each column', () => {
      const { columns, hide } = useColumnVisibility({
        columns: sampleColumns,
      })

      hide('email')

      const idCol = columns.value.find((c) => c.name === 'id')
      const emailCol = columns.value.find((c) => c.name === 'email')

      expect((idCol as { hidden?: boolean })?.hidden).toBe(false)
      expect((emailCol as { hidden?: boolean })?.hidden).toBe(true)
    })
  })

  describe('persistence', () => {
    it('saves to localStorage when persist is true', () => {
      const { hide } = useColumnVisibility({
        columns: sampleColumns,
        persist: true,
        storageKey: 'test-visibility',
      })

      hide('email')

      const stored = localStorage.getItem('test-visibility')
      expect(stored).toBe('["email"]')
    })

    it('loads from localStorage on init', () => {
      localStorage.setItem('test-visibility', '["id","role"]')

      const { visibleColumns, isVisible } = useColumnVisibility({
        columns: sampleColumns,
        persist: true,
        storageKey: 'test-visibility',
      })

      expect(visibleColumns.value).toHaveLength(2)
      expect(isVisible('id')).toBe(false)
      expect(isVisible('role')).toBe(false)
    })

    it('does not persist when persist is false', () => {
      const { hide } = useColumnVisibility({
        columns: sampleColumns,
        persist: false,
        storageKey: 'test-no-persist',
      })

      hide('email')

      expect(localStorage.getItem('test-no-persist')).toBeNull()
    })
  })
})
