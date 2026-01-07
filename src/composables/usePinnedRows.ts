import { shallowRef, computed, type ComputedRef, type ShallowRef } from 'vue'

export type PinPosition = 'top' | 'bottom'

export interface PinnedItem<T = unknown> {
  item: T
  position: PinPosition
}

export interface UsePinnedRowsOptions<T> {
  /** Key field for unique identification */
  keyField?: string
  /** Initially pinned items */
  initialPinned?: PinnedItem<T>[]
  /** Maximum number of pinned rows at top */
  maxPinnedTop?: number
  /** Maximum number of pinned rows at bottom */
  maxPinnedBottom?: number
}

export interface UsePinnedRowsReturn<T> {
  /** Items pinned to the top */
  pinnedTop: ComputedRef<T[]>
  /** Items pinned to the bottom */
  pinnedBottom: ComputedRef<T[]>
  /** All pinned item keys */
  pinnedKeys: ComputedRef<Set<string>>
  /** Check if an item is pinned */
  isPinned: (item: T) => boolean
  /** Get pin position for an item (null if not pinned) */
  getPinPosition: (item: T) => PinPosition | null
  /** Pin an item to a position */
  pin: (item: T, position: PinPosition) => void
  /** Unpin an item */
  unpin: (item: T) => void
  /** Toggle pin state */
  togglePin: (item: T, position?: PinPosition) => void
  /** Move a pinned item to a different position */
  movePin: (item: T, newPosition: PinPosition) => void
  /** Clear all pinned rows */
  clearAll: () => void
  /** Clear pinned rows at a specific position */
  clear: (position: PinPosition) => void
}

export function usePinnedRows<T>(
  options: UsePinnedRowsOptions<T> = {}
): UsePinnedRowsReturn<T> {
  const {
    keyField = 'id',
    initialPinned = [],
    maxPinnedTop = Infinity,
    maxPinnedBottom = Infinity,
  } = options

  const getItemKey = (item: T): string => {
    const key = (item as Record<string, unknown>)[keyField]
    return String(key ?? Math.random())
  }

  // Map of item key -> { item, position }
  const pinnedMap: ShallowRef<Map<string, PinnedItem<T>>> = shallowRef(
    new Map(initialPinned.map((p) => [getItemKey(p.item), p]))
  )

  const pinnedTop = computed((): T[] => {
    const items: T[] = []
    pinnedMap.value.forEach(({ item, position }) => {
      if (position === 'top') {
        items.push(item as T)
      }
    })
    return items
  })

  const pinnedBottom = computed((): T[] => {
    const items: T[] = []
    pinnedMap.value.forEach(({ item, position }) => {
      if (position === 'bottom') {
        items.push(item as T)
      }
    })
    return items
  })

  const pinnedKeys = computed(() => {
    return new Set(pinnedMap.value.keys())
  })

  const isPinned = (item: T): boolean => {
    return pinnedMap.value.has(getItemKey(item))
  }

  const getPinPosition = (item: T): PinPosition | null => {
    const pinned = pinnedMap.value.get(getItemKey(item))
    return pinned?.position ?? null
  }

  const pin = (item: T, position: PinPosition) => {
    // Check max limits
    const currentCount = position === 'top' ? pinnedTop.value.length : pinnedBottom.value.length
    const maxCount = position === 'top' ? maxPinnedTop : maxPinnedBottom

    // If already at max and not already pinned at this position, don't add
    if (currentCount >= maxCount && getPinPosition(item) !== position) {
      return
    }

    const key = getItemKey(item)
    const newMap = new Map(pinnedMap.value)
    newMap.set(key, { item, position })
    pinnedMap.value = newMap
  }

  const unpin = (item: T) => {
    const key = getItemKey(item)
    if (pinnedMap.value.has(key)) {
      const newMap = new Map(pinnedMap.value)
      newMap.delete(key)
      pinnedMap.value = newMap
    }
  }

  const togglePin = (item: T, position: PinPosition = 'top') => {
    if (isPinned(item)) {
      unpin(item)
    } else {
      pin(item, position)
    }
  }

  const movePin = (item: T, newPosition: PinPosition) => {
    if (isPinned(item)) {
      pin(item, newPosition)
    }
  }

  const clearAll = () => {
    pinnedMap.value = new Map()
  }

  const clear = (position: PinPosition) => {
    const newMap = new Map<string, PinnedItem<T>>()
    pinnedMap.value.forEach((pinned, key) => {
      if (pinned.position !== position) {
        newMap.set(key, pinned)
      }
    })
    pinnedMap.value = newMap
  }

  return {
    pinnedTop,
    pinnedBottom,
    pinnedKeys,
    isPinned,
    getPinPosition,
    pin,
    unpin,
    togglePin,
    movePin,
    clearAll,
    clear,
  }
}
