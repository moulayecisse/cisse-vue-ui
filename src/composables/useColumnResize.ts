import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

export interface ColumnWidth {
  name: string
  width: number
  minWidth?: number
  maxWidth?: number
}

export interface UseColumnResizeOptions {
  /** Initial column widths */
  columns: ColumnWidth[] | Ref<ColumnWidth[]>
  /** Default minimum width for columns without explicit minWidth */
  defaultMinWidth?: number
  /** Default maximum width for columns without explicit maxWidth */
  defaultMaxWidth?: number
  /** LocalStorage key for persistence (optional) */
  storageKey?: string
  /** Enable persistence to localStorage */
  persist?: boolean
}

export interface UseColumnResizeReturn {
  /** Current column widths */
  columnWidths: ComputedRef<Record<string, number>>
  /** Get width for a specific column */
  getWidth: (name: string) => number
  /** Set width for a specific column */
  setWidth: (name: string, width: number) => void
  /** Start resizing a column */
  startResize: (name: string, event: MouseEvent | TouchEvent) => void
  /** Check if a column is currently being resized */
  isResizing: ComputedRef<boolean>
  /** The column currently being resized */
  resizingColumn: Ref<string | null>
  /** Reset all widths to initial values */
  reset: () => void
  /** Reset a specific column width */
  resetColumn: (name: string) => void
}

export function useColumnResize(options: UseColumnResizeOptions): UseColumnResizeReturn {
  const {
    columns: columnsOption,
    defaultMinWidth = 50,
    defaultMaxWidth = 1000,
    storageKey,
    persist = false,
  } = options

  const allColumns = computed(() => {
    return 'value' in columnsOption ? columnsOption.value : columnsOption
  })

  // Create initial widths map
  const getInitialWidths = (): Map<string, number> => {
    const map = new Map<string, number>()
    allColumns.value.forEach((col) => {
      map.set(col.name, col.width)
    })
    return map
  }

  // Load from localStorage if persistence is enabled
  const loadFromStorage = (): Map<string, number> | null => {
    if (!persist || !storageKey) return null
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, number>
        return new Map(Object.entries(parsed))
      }
    } catch {
      // Ignore errors
    }
    return null
  }

  // Save to localStorage
  const saveToStorage = () => {
    if (!persist || !storageKey) return
    try {
      const obj = Object.fromEntries(widths.value)
      localStorage.setItem(storageKey, JSON.stringify(obj))
    } catch {
      // Ignore errors
    }
  }

  // Initialize widths from storage or defaults
  const widths = ref<Map<string, number>>(loadFromStorage() ?? getInitialWidths())

  // Update widths when columns change
  watch(
    allColumns,
    (newColumns) => {
      const stored = loadFromStorage()
      newColumns.forEach((col) => {
        if (!widths.value.has(col.name)) {
          widths.value.set(col.name, stored?.get(col.name) ?? col.width)
        }
      })
    },
    { deep: true }
  )

  // Resizing state
  const resizingColumn = ref<string | null>(null)
  const startX = ref(0)
  const startWidth = ref(0)

  const isResizing = computed(() => resizingColumn.value !== null)

  const columnWidths = computed(() => {
    const result: Record<string, number> = {}
    widths.value.forEach((width, name) => {
      result[name] = width
    })
    return result
  })

  const getWidth = (name: string): number => {
    return widths.value.get(name) ?? allColumns.value.find((c) => c.name === name)?.width ?? 100
  }

  const getColumnConfig = (name: string): ColumnWidth | undefined => {
    return allColumns.value.find((c) => c.name === name)
  }

  const setWidth = (name: string, width: number) => {
    const config = getColumnConfig(name)
    const minWidth = config?.minWidth ?? defaultMinWidth
    const maxWidth = config?.maxWidth ?? defaultMaxWidth
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width))

    const newWidths = new Map(widths.value)
    newWidths.set(name, clampedWidth)
    widths.value = newWidths
    saveToStorage()
  }

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!resizingColumn.value) return

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const deltaX = clientX - startX.value
    const newWidth = startWidth.value + deltaX

    setWidth(resizingColumn.value, newWidth)
  }

  const handleMouseUp = () => {
    resizingColumn.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('touchmove', handleMouseMove)
    document.removeEventListener('touchend', handleMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  const startResize = (name: string, event: MouseEvent | TouchEvent) => {
    event.preventDefault()
    resizingColumn.value = name
    startX.value = 'touches' in event ? event.touches[0].clientX : event.clientX
    startWidth.value = getWidth(name)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  const reset = () => {
    widths.value = getInitialWidths()
    saveToStorage()
  }

  const resetColumn = (name: string) => {
    const config = getColumnConfig(name)
    if (config) {
      setWidth(name, config.width)
    }
  }

  return {
    columnWidths,
    getWidth,
    setWidth,
    startResize,
    isResizing,
    resizingColumn,
    reset,
    resetColumn,
  }
}
