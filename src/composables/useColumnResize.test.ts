import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { useColumnResize } from './useColumnResize'

describe('useColumnResize', () => {
  const sampleColumns = [
    { name: 'name', width: 200 },
    { name: 'email', width: 250 },
    { name: 'role', width: 150, minWidth: 100, maxWidth: 300 },
  ]

  beforeEach(() => {
    localStorage.clear()
  })

  describe('initialization', () => {
    it('initializes with provided column widths', () => {
      const { columnWidths, getWidth } = useColumnResize({
        columns: sampleColumns,
      })

      expect(getWidth('name')).toBe(200)
      expect(getWidth('email')).toBe(250)
      expect(getWidth('role')).toBe(150)
      expect(columnWidths.value).toEqual({
        name: 200,
        email: 250,
        role: 150,
      })
    })

    it('works with reactive columns ref', () => {
      const columnsRef = ref(sampleColumns)
      const { getWidth } = useColumnResize({
        columns: columnsRef,
      })

      expect(getWidth('name')).toBe(200)

      // Add new column
      columnsRef.value = [...columnsRef.value, { name: 'status', width: 100 }]
      expect(getWidth('status')).toBe(100)
    })
  })

  describe('setWidth', () => {
    it('sets column width', () => {
      const { setWidth, getWidth } = useColumnResize({
        columns: sampleColumns,
      })

      setWidth('name', 300)
      expect(getWidth('name')).toBe(300)
    })

    it('respects minWidth constraint', () => {
      const { setWidth, getWidth } = useColumnResize({
        columns: sampleColumns,
      })

      // 'role' has minWidth: 100
      setWidth('role', 50)
      expect(getWidth('role')).toBe(100)
    })

    it('respects maxWidth constraint', () => {
      const { setWidth, getWidth } = useColumnResize({
        columns: sampleColumns,
      })

      // 'role' has maxWidth: 300
      setWidth('role', 500)
      expect(getWidth('role')).toBe(300)
    })

    it('uses defaultMinWidth when column has no minWidth', () => {
      const { setWidth, getWidth } = useColumnResize({
        columns: sampleColumns,
        defaultMinWidth: 80,
      })

      setWidth('name', 30)
      expect(getWidth('name')).toBe(80)
    })

    it('uses defaultMaxWidth when column has no maxWidth', () => {
      const { setWidth, getWidth } = useColumnResize({
        columns: sampleColumns,
        defaultMaxWidth: 400,
      })

      setWidth('name', 500)
      expect(getWidth('name')).toBe(400)
    })
  })

  describe('reset', () => {
    it('resets all columns to initial widths', () => {
      const { setWidth, getWidth, reset } = useColumnResize({
        columns: sampleColumns,
      })

      setWidth('name', 300)
      setWidth('email', 400)

      expect(getWidth('name')).toBe(300)
      expect(getWidth('email')).toBe(400)

      reset()

      expect(getWidth('name')).toBe(200)
      expect(getWidth('email')).toBe(250)
    })

    it('resetColumn resets a single column', () => {
      const { setWidth, getWidth, resetColumn } = useColumnResize({
        columns: sampleColumns,
      })

      setWidth('name', 300)
      setWidth('email', 400)

      resetColumn('name')

      expect(getWidth('name')).toBe(200)
      expect(getWidth('email')).toBe(400)
    })
  })

  describe('startResize', () => {
    it('sets resizingColumn when resize starts', () => {
      const { startResize, resizingColumn, isResizing } = useColumnResize({
        columns: sampleColumns,
      })

      expect(isResizing.value).toBe(false)
      expect(resizingColumn.value).toBeNull()

      const mockEvent = {
        preventDefault: vi.fn(),
        clientX: 100,
      } as unknown as MouseEvent

      startResize('name', mockEvent)

      expect(isResizing.value).toBe(true)
      expect(resizingColumn.value).toBe('name')

      // Clean up
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    it('calls preventDefault on event', () => {
      const { startResize } = useColumnResize({
        columns: sampleColumns,
      })

      const mockEvent = {
        preventDefault: vi.fn(),
        clientX: 100,
      } as unknown as MouseEvent

      startResize('name', mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()

      // Clean up
      document.dispatchEvent(new MouseEvent('mouseup'))
    })
  })

  describe('persistence', () => {
    it('saves to localStorage when persist is true', () => {
      const { setWidth } = useColumnResize({
        columns: sampleColumns,
        persist: true,
        storageKey: 'test-column-widths',
      })

      setWidth('name', 300)

      const stored = localStorage.getItem('test-column-widths')
      expect(stored).toContain('"name":300')
    })

    it('loads from localStorage on init', () => {
      localStorage.setItem(
        'test-column-widths',
        JSON.stringify({ name: 350, email: 280, role: 120 })
      )

      const { getWidth } = useColumnResize({
        columns: sampleColumns,
        persist: true,
        storageKey: 'test-column-widths',
      })

      expect(getWidth('name')).toBe(350)
      expect(getWidth('email')).toBe(280)
      expect(getWidth('role')).toBe(120)
    })

    it('does not persist when persist is false', () => {
      const { setWidth } = useColumnResize({
        columns: sampleColumns,
        persist: false,
        storageKey: 'test-no-persist',
      })

      setWidth('name', 300)

      expect(localStorage.getItem('test-no-persist')).toBeNull()
    })
  })

  describe('columnWidths computed', () => {
    it('returns all column widths as object', () => {
      const { columnWidths, setWidth } = useColumnResize({
        columns: sampleColumns,
      })

      setWidth('name', 300)

      expect(columnWidths.value).toEqual({
        name: 300,
        email: 250,
        role: 150,
      })
    })
  })
})
