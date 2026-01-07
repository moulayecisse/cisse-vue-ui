import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, type Ref } from 'vue'
import { useTableKeyboardNavigation } from './useTableKeyboardNavigation'

describe('useTableKeyboardNavigation', () => {
  let tableRef: Ref<HTMLElement | null>

  beforeEach(() => {
    tableRef = ref<HTMLElement | null>(null)
  })

  describe('initialization', () => {
    it('starts with default focused row (1 when skipHeader is true)', () => {
      const { focusedRow, focusedCol } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      expect(focusedRow.value).toBe(1)
      expect(focusedCol.value).toBe(0)
    })

    it('starts at row 0 when skipHeader is false', () => {
      const { focusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        skipHeader: false,
      })

      expect(focusedRow.value).toBe(0)
    })

    it('starts inactive', () => {
      const { isActive } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      expect(isActive.value).toBe(false)
    })
  })

  describe('navigation', () => {
    it('moves focus down with ArrowDown', () => {
      const { focusedRow, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      vi.spyOn(event, 'preventDefault')

      handleKeyDown(event)

      expect(focusedRow.value).toBe(2)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('moves focus up with ArrowUp', () => {
      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      setFocusedRow(3)

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(2)
    })

    it('wraps to last row when moving up from first row', () => {
      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        wrap: true,
      })

      isActive.value = true
      setFocusedRow(1) // First data row (skipping header)

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(4) // Last row
    })

    it('does not wrap when wrap is false', () => {
      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        wrap: false,
      })

      isActive.value = true
      setFocusedRow(1)

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(1) // Stays at first row
    })

    it('moves to first row with Home', () => {
      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      setFocusedRow(4)

      const event = new KeyboardEvent('keydown', { key: 'Home' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(1) // First data row
    })

    it('moves to last row with End', () => {
      const { focusedRow, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true

      const event = new KeyboardEvent('keydown', { key: 'End' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(4)
    })

    it('moves by 10 rows with PageDown/PageUp', () => {
      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 25,
        colCount: 3,
      })

      isActive.value = true
      setFocusedRow(5)

      let event = new KeyboardEvent('keydown', { key: 'PageDown' })
      handleKeyDown(event)
      expect(focusedRow.value).toBe(15)

      event = new KeyboardEvent('keydown', { key: 'PageUp' })
      handleKeyDown(event)
      expect(focusedRow.value).toBe(5)
    })
  })

  describe('cell navigation', () => {
    it('moves horizontally with ArrowLeft/ArrowRight when cellNavigation is true', () => {
      const { focusedCol, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        cellNavigation: true,
      })

      isActive.value = true

      let event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      handleKeyDown(event)
      expect(focusedCol.value).toBe(1)

      event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      handleKeyDown(event)
      expect(focusedCol.value).toBe(2)

      event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      handleKeyDown(event)
      expect(focusedCol.value).toBe(1)
    })

    it('does not move horizontally when cellNavigation is false', () => {
      const { focusedCol, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        cellNavigation: false,
      })

      isActive.value = true

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      handleKeyDown(event)

      expect(focusedCol.value).toBe(0)
    })
  })

  describe('activation', () => {
    it('calls onRowActivate on Enter key', () => {
      const onRowActivate = vi.fn()
      const { isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        onRowActivate,
      })

      isActive.value = true
      setFocusedRow(2)

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      handleKeyDown(event)

      expect(onRowActivate).toHaveBeenCalledWith(2)
    })

    it('calls onCellActivate on Enter key when cellNavigation is true', () => {
      const onCellActivate = vi.fn()
      const { isActive, handleKeyDown, setFocusedCell } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        cellNavigation: true,
        onCellActivate,
      })

      isActive.value = true
      setFocusedCell(2, 1)

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      handleKeyDown(event)

      expect(onCellActivate).toHaveBeenCalledWith(2, 1)
    })

    it('calls onRowActivate on Space key', () => {
      const onRowActivate = vi.fn()
      const { isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        onRowActivate,
      })

      isActive.value = true
      setFocusedRow(3)

      const event = new KeyboardEvent('keydown', { key: ' ' })
      handleKeyDown(event)

      expect(onRowActivate).toHaveBeenCalledWith(3)
    })
  })

  describe('deactivation', () => {
    it('deactivates on Escape', () => {
      const { isActive, handleKeyDown, activate } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      activate()
      expect(isActive.value).toBe(true)

      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      handleKeyDown(event)

      expect(isActive.value).toBe(false)
    })

    it('allows Tab to exit naturally', () => {
      const { isActive, handleKeyDown, activate } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      activate()

      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      vi.spyOn(event, 'preventDefault')

      handleKeyDown(event)

      expect(isActive.value).toBe(false)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('getRowProps', () => {
    it('returns correct props for focused row', () => {
      const { getRowProps, setFocusedRow, isActive } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      setFocusedRow(2)

      const props = getRowProps(2)
      expect(props.tabIndex).toBe(0)
      expect(props['aria-selected']).toBe(true)
    })

    it('returns tabIndex -1 for non-focused rows', () => {
      const { getRowProps, setFocusedRow, isActive } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      setFocusedRow(2)

      const props = getRowProps(3)
      expect(props.tabIndex).toBe(-1)
      expect(props['aria-selected']).toBeUndefined()
    })
  })

  describe('getCellProps', () => {
    it('returns correct props for focused cell', () => {
      const { getCellProps, setFocusedCell, isActive } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        cellNavigation: true,
      })

      isActive.value = true
      setFocusedCell(2, 1)

      const props = getCellProps(2, 1)
      expect(props.tabIndex).toBe(0)
      expect(props['aria-selected']).toBe(true)
    })

    it('returns tabIndex -1 for non-focused cells', () => {
      const { getCellProps, setFocusedCell, isActive } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        cellNavigation: true,
      })

      isActive.value = true
      setFocusedCell(2, 1)

      const props = getCellProps(2, 2)
      expect(props.tabIndex).toBe(-1)
    })
  })

  describe('reactive row/col count', () => {
    it('works with ref row/col counts', () => {
      const rowCountRef = ref(5)
      const colCountRef = ref(3)

      const { focusedRow, isActive, handleKeyDown, setFocusedRow } = useTableKeyboardNavigation({
        tableRef,
        rowCount: rowCountRef,
        colCount: colCountRef,
        wrap: true,
      })

      isActive.value = true
      setFocusedRow(4) // Last row

      // Move down, should wrap to first data row
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(1)

      // Update row count
      rowCountRef.value = 10
      setFocusedRow(9) // New last row

      handleKeyDown(event) // Move down again
      expect(focusedRow.value).toBe(1) // Wraps to first data row
    })
  })

  describe('focus change callback', () => {
    it('calls onFocusChange when focus changes', () => {
      const onFocusChange = vi.fn()
      const { isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
        onFocusChange,
      })

      isActive.value = true

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      handleKeyDown(event)

      expect(onFocusChange).toHaveBeenCalledWith(2, 0)
    })
  })

  describe('modifier keys', () => {
    it('ignores events with Ctrl modifier', () => {
      const { focusedRow, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      const initialRow = focusedRow.value

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', ctrlKey: true })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(initialRow) // Unchanged
    })

    it('ignores events with Meta modifier', () => {
      const { focusedRow, isActive, handleKeyDown } = useTableKeyboardNavigation({
        tableRef,
        rowCount: 5,
        colCount: 3,
      })

      isActive.value = true
      const initialRow = focusedRow.value

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
      handleKeyDown(event)

      expect(focusedRow.value).toBe(initialRow) // Unchanged
    })
  })
})
