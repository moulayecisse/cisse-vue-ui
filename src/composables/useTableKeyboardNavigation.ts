import { ref, computed, type Ref, onMounted, onUnmounted } from 'vue'

export interface UseTableKeyboardNavigationOptions {
  /** The table element ref */
  tableRef: Ref<HTMLElement | null>
  /** Number of rows in the table */
  rowCount: Ref<number> | number
  /** Number of columns in the table */
  colCount: Ref<number> | number
  /** Enable cell-level navigation (default: false, uses row-level) */
  cellNavigation?: boolean
  /** Callback when a row is activated (Enter/Space) */
  onRowActivate?: (rowIndex: number) => void
  /** Callback when a cell is activated (Enter/Space) */
  onCellActivate?: (rowIndex: number, colIndex: number) => void
  /** Callback when focus changes */
  onFocusChange?: (rowIndex: number, colIndex: number) => void
  /** Skip header row in navigation */
  skipHeader?: boolean
  /** Enable wrap-around navigation */
  wrap?: boolean
}

export interface UseTableKeyboardNavigationReturn {
  /** Currently focused row index */
  focusedRow: Ref<number>
  /** Currently focused column index (for cell navigation) */
  focusedCol: Ref<number>
  /** Whether keyboard navigation is active */
  isActive: Ref<boolean>
  /** Set focus to a specific row */
  setFocusedRow: (index: number) => void
  /** Set focus to a specific cell */
  setFocusedCell: (row: number, col: number) => void
  /** Start keyboard navigation */
  activate: () => void
  /** Stop keyboard navigation */
  deactivate: () => void
  /** Get props to apply to a row for navigation */
  getRowProps: (rowIndex: number) => {
    tabIndex: number
    'aria-selected'?: boolean
    onFocus: () => void
  }
  /** Get props to apply to a cell for navigation */
  getCellProps: (rowIndex: number, colIndex: number) => {
    tabIndex: number
    'aria-selected'?: boolean
    onFocus: () => void
  }
  /** Handle keyboard events (attach to table) */
  handleKeyDown: (event: KeyboardEvent) => void
}

export function useTableKeyboardNavigation(
  options: UseTableKeyboardNavigationOptions
): UseTableKeyboardNavigationReturn {
  const {
    tableRef,
    rowCount,
    colCount,
    cellNavigation = false,
    onRowActivate,
    onCellActivate,
    onFocusChange,
    skipHeader = true,
    wrap = true,
  } = options

  const focusedRow = ref(skipHeader ? 1 : 0)
  const focusedCol = ref(0)
  const isActive = ref(false)

  const totalRows = computed(() => (typeof rowCount === 'number' ? rowCount : rowCount.value))
  const totalCols = computed(() => (typeof colCount === 'number' ? colCount : colCount.value))
  const startRow = computed(() => (skipHeader ? 1 : 0))

  const clampRow = (row: number): number => {
    if (wrap) {
      if (row < startRow.value) return totalRows.value - 1
      if (row >= totalRows.value) return startRow.value
      return row
    }
    return Math.max(startRow.value, Math.min(totalRows.value - 1, row))
  }

  const clampCol = (col: number): number => {
    if (wrap) {
      if (col < 0) return totalCols.value - 1
      if (col >= totalCols.value) return 0
      return col
    }
    return Math.max(0, Math.min(totalCols.value - 1, col))
  }

  const setFocusedRow = (index: number) => {
    focusedRow.value = clampRow(index)
    onFocusChange?.(focusedRow.value, focusedCol.value)
  }

  const setFocusedCell = (row: number, col: number) => {
    focusedRow.value = clampRow(row)
    focusedCol.value = clampCol(col)
    onFocusChange?.(focusedRow.value, focusedCol.value)
  }

  const activate = () => {
    isActive.value = true
    focusCurrentElement()
  }

  const deactivate = () => {
    isActive.value = false
  }

  const focusCurrentElement = () => {
    if (!tableRef.value) return

    const selector = cellNavigation
      ? `tr:nth-child(${focusedRow.value + 1}) td:nth-child(${focusedCol.value + 1}), tr:nth-child(${focusedRow.value + 1}) th:nth-child(${focusedCol.value + 1})`
      : `tr:nth-child(${focusedRow.value + 1})`

    const element = tableRef.value.querySelector(selector) as HTMLElement
    element?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isActive.value) return

    const { key, shiftKey, ctrlKey, metaKey } = event

    // Don't interfere with modifier combinations (except Shift for selection)
    if (ctrlKey || metaKey) return

    let handled = false

    switch (key) {
      case 'ArrowDown':
        setFocusedRow(focusedRow.value + 1)
        handled = true
        break

      case 'ArrowUp':
        setFocusedRow(focusedRow.value - 1)
        handled = true
        break

      case 'ArrowRight':
        if (cellNavigation) {
          setFocusedCell(focusedRow.value, focusedCol.value + 1)
          handled = true
        }
        break

      case 'ArrowLeft':
        if (cellNavigation) {
          setFocusedCell(focusedRow.value, focusedCol.value - 1)
          handled = true
        }
        break

      case 'Home':
        if (cellNavigation) {
          setFocusedCell(shiftKey ? startRow.value : focusedRow.value, 0)
        } else {
          setFocusedRow(startRow.value)
        }
        handled = true
        break

      case 'End':
        if (cellNavigation) {
          setFocusedCell(
            shiftKey ? totalRows.value - 1 : focusedRow.value,
            totalCols.value - 1
          )
        } else {
          setFocusedRow(totalRows.value - 1)
        }
        handled = true
        break

      case 'PageDown':
        setFocusedRow(focusedRow.value + 10)
        handled = true
        break

      case 'PageUp':
        setFocusedRow(focusedRow.value - 10)
        handled = true
        break

      case 'Enter':
      case ' ':
        if (cellNavigation) {
          onCellActivate?.(focusedRow.value, focusedCol.value)
        } else {
          onRowActivate?.(focusedRow.value)
        }
        handled = true
        break

      case 'Escape':
        deactivate()
        handled = true
        break

      case 'Tab':
        // Allow normal tab behavior to exit the table
        deactivate()
        return
    }

    if (handled) {
      event.preventDefault()
      event.stopPropagation()
      focusCurrentElement()
    }
  }

  const getRowProps = (rowIndex: number) => ({
    tabIndex: focusedRow.value === rowIndex && isActive.value ? 0 : -1,
    'aria-selected': focusedRow.value === rowIndex ? true : undefined,
    onFocus: () => {
      if (!isActive.value) {
        isActive.value = true
      }
      focusedRow.value = rowIndex
    },
  })

  const getCellProps = (rowIndex: number, colIndex: number) => ({
    tabIndex:
      focusedRow.value === rowIndex && focusedCol.value === colIndex && isActive.value
        ? 0
        : -1,
    'aria-selected':
      focusedRow.value === rowIndex && focusedCol.value === colIndex ? true : undefined,
    onFocus: () => {
      if (!isActive.value) {
        isActive.value = true
      }
      focusedRow.value = rowIndex
      focusedCol.value = colIndex
    },
  })

  // Handle focus entering the table
  const handleTableFocus = () => {
    if (!isActive.value) {
      activate()
    }
  }

  onMounted(() => {
    tableRef.value?.addEventListener('focus', handleTableFocus, true)
  })

  onUnmounted(() => {
    tableRef.value?.removeEventListener('focus', handleTableFocus, true)
  })

  return {
    focusedRow,
    focusedCol,
    isActive,
    setFocusedRow,
    setFocusedCell,
    activate,
    deactivate,
    getRowProps,
    getCellProps,
    handleKeyDown,
  }
}
