import { ref, computed, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'

export interface UseVirtualScrollOptions<T> {
  /** Array of items to virtualize */
  items: T[] | Ref<T[]>
  /** Height of each row in pixels */
  rowHeight: number
  /** Visible container height in pixels */
  containerHeight: number
  /** Number of rows to render outside visible area (buffer) */
  overscan?: number
}

export interface UseVirtualScrollReturn<T> {
  /** Items to actually render */
  visibleItems: ComputedRef<T[]>
  /** Total height of all items (for scroll container) */
  totalHeight: ComputedRef<number>
  /** Top offset for the visible items container */
  offsetY: ComputedRef<number>
  /** Start index of visible items */
  startIndex: ComputedRef<number>
  /** End index of visible items */
  endIndex: ComputedRef<number>
  /** Scroll position */
  scrollTop: Ref<number>
  /** Handle scroll event */
  onScroll: (event: Event) => void
  /** Scroll to a specific index */
  scrollToIndex: (index: number) => void
  /** Container ref to attach to scrollable element */
  containerRef: Ref<HTMLElement | null>
}

export function useVirtualScroll<T>(
  options: UseVirtualScrollOptions<T>
): UseVirtualScrollReturn<T> {
  const {
    items: itemsOption,
    rowHeight,
    containerHeight,
    overscan = 3,
  } = options

  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement | null>(null)

  const allItems = computed(() => {
    return 'value' in itemsOption ? itemsOption.value : itemsOption
  })

  const totalHeight = computed(() => {
    return allItems.value.length * rowHeight
  })

  // Calculate how many items fit in the visible area
  const visibleCount = computed(() => {
    return Math.ceil(containerHeight / rowHeight)
  })

  // Start index accounting for overscan
  const startIndex = computed(() => {
    const rawStart = Math.floor(scrollTop.value / rowHeight)
    return Math.max(0, rawStart - overscan)
  })

  // End index accounting for overscan
  const endIndex = computed(() => {
    const rawEnd = startIndex.value + visibleCount.value + overscan * 2
    return Math.min(allItems.value.length, rawEnd)
  })

  // Items to render
  const visibleItems = computed(() => {
    return allItems.value.slice(startIndex.value, endIndex.value)
  })

  // Offset to position the visible items correctly
  const offsetY = computed(() => {
    return startIndex.value * rowHeight
  })

  const onScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  const scrollToIndex = (index: number) => {
    const targetScroll = index * rowHeight
    if (containerRef.value) {
      containerRef.value.scrollTop = targetScroll
    }
    scrollTop.value = targetScroll
  }

  // Attach scroll listener if containerRef is set
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', onScroll, { passive: true })
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', onScroll)
    }
  })

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    scrollTop,
    onScroll,
    scrollToIndex,
    containerRef,
  }
}
