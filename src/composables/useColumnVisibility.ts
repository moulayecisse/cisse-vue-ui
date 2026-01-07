import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface Column {
  name: string
  label?: string
  hidden?: boolean
  [key: string]: unknown
}

export interface UseColumnVisibilityOptions<T extends Column> {
  /** Initial columns configuration */
  columns: T[] | Ref<T[]>
  /** Initial hidden column names */
  initialHidden?: string[]
  /** Persist visibility to localStorage */
  persist?: boolean
  /** Storage key for persistence */
  storageKey?: string
  /** Minimum visible columns required */
  minVisible?: number
}

export interface UseColumnVisibilityReturn<T extends Column> {
  /** All columns with current visibility state */
  columns: ComputedRef<T[]>
  /** Only visible columns */
  visibleColumns: ComputedRef<T[]>
  /** Set of hidden column names */
  hiddenColumns: Ref<Set<string>>
  /** Check if a column is visible */
  isVisible: (columnName: string) => boolean
  /** Show a column */
  show: (columnName: string) => void
  /** Hide a column */
  hide: (columnName: string) => void
  /** Toggle a column's visibility */
  toggle: (columnName: string) => void
  /** Show all columns */
  showAll: () => void
  /** Hide all columns (respects minVisible) */
  hideAll: () => void
  /** Reset to initial state */
  reset: () => void
  /** Set multiple columns visibility at once */
  setVisibility: (visibility: Record<string, boolean>) => void
}

export function useColumnVisibility<T extends Column>(
  options: UseColumnVisibilityOptions<T>
): UseColumnVisibilityReturn<T> {
  const {
    columns: columnsOption,
    initialHidden = [],
    persist = false,
    storageKey = 'table-column-visibility',
    minVisible = 1,
  } = options

  // Load persisted state or use initial
  const loadInitialState = (): Set<string> => {
    if (persist && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          return new Set(JSON.parse(stored))
        }
      } catch {
        // Ignore storage errors
      }
    }
    return new Set(initialHidden)
  }

  const hiddenColumns = ref<Set<string>>(loadInitialState())

  // Save to storage when changed
  const saveState = () => {
    if (persist && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify([...hiddenColumns.value]))
      } catch {
        // Ignore storage errors
      }
    }
  }

  const rawColumns = computed(() => {
    const cols = 'value' in columnsOption ? columnsOption.value : columnsOption
    return cols
  })

  const columns = computed(() => {
    return rawColumns.value.map((col) => ({
      ...col,
      hidden: hiddenColumns.value.has(col.name),
    }))
  })

  const visibleColumns = computed(() => {
    return columns.value.filter((col) => !col.hidden)
  })

  const isVisible = (columnName: string): boolean => {
    return !hiddenColumns.value.has(columnName)
  }

  const show = (columnName: string) => {
    hiddenColumns.value.delete(columnName)
    hiddenColumns.value = new Set(hiddenColumns.value) // Trigger reactivity
    saveState()
  }

  const hide = (columnName: string) => {
    // Check if we can hide (respect minVisible)
    if (visibleColumns.value.length <= minVisible) {
      return
    }
    hiddenColumns.value.add(columnName)
    hiddenColumns.value = new Set(hiddenColumns.value) // Trigger reactivity
    saveState()
  }

  const toggle = (columnName: string) => {
    if (isVisible(columnName)) {
      hide(columnName)
    } else {
      show(columnName)
    }
  }

  const showAll = () => {
    hiddenColumns.value = new Set()
    saveState()
  }

  const hideAll = () => {
    // Keep at least minVisible columns visible
    const columnsToKeep = rawColumns.value.slice(0, minVisible).map((c) => c.name)
    const newHidden = new Set(
      rawColumns.value
        .filter((c) => !columnsToKeep.includes(c.name))
        .map((c) => c.name)
    )
    hiddenColumns.value = newHidden
    saveState()
  }

  const reset = () => {
    hiddenColumns.value = new Set(initialHidden)
    saveState()
  }

  const setVisibility = (visibility: Record<string, boolean>) => {
    const newHidden = new Set<string>()
    let visibleCount = 0

    for (const col of rawColumns.value) {
      const shouldBeVisible = visibility[col.name] ?? true
      if (shouldBeVisible) {
        visibleCount++
      } else {
        newHidden.add(col.name)
      }
    }

    // Ensure minimum visible
    if (visibleCount < minVisible) {
      // Remove some from hidden to meet minimum
      let added = 0
      for (const col of rawColumns.value) {
        if (newHidden.has(col.name)) {
          newHidden.delete(col.name)
          added++
          if (visibleCount + added >= minVisible) break
        }
      }
    }

    hiddenColumns.value = newHidden
    saveState()
  }

  return {
    columns,
    visibleColumns,
    hiddenColumns,
    isVisible,
    show,
    hide,
    toggle,
    showAll,
    hideAll,
    reset,
    setVisibility,
  }
}
