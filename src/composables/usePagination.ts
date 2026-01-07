import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

export interface UsePaginationOptions<T> {
  /** The full array of items to paginate */
  items: T[] | Ref<T[]>
  /** Initial page size */
  pageSize?: number
  /** Initial page (1-indexed) */
  initialPage?: number
}

export interface UsePaginationReturn<T> {
  /** Current page number (1-indexed) */
  currentPage: Ref<number>
  /** Current page size */
  pageSize: Ref<number>
  /** Total number of pages */
  totalPages: ComputedRef<number>
  /** Total number of items */
  totalItems: ComputedRef<number>
  /** Items for the current page */
  paginatedItems: ComputedRef<T[]>
  /** Index of the first item on current page (0-indexed) */
  startIndex: ComputedRef<number>
  /** Index of the last item on current page (0-indexed) */
  endIndex: ComputedRef<number>
  /** Whether there is a previous page */
  hasPrevious: ComputedRef<boolean>
  /** Whether there is a next page */
  hasNext: ComputedRef<boolean>
  /** Go to a specific page */
  goToPage: (page: number) => void
  /** Go to the next page */
  nextPage: () => void
  /** Go to the previous page */
  previousPage: () => void
  /** Go to the first page */
  firstPage: () => void
  /** Go to the last page */
  lastPage: () => void
  /** Set page size (resets to page 1) */
  setPageSize: (size: number) => void
  /** Reset to initial state */
  reset: () => void
}

export function usePagination<T>(
  options: UsePaginationOptions<T>
): UsePaginationReturn<T> {
  const {
    items: itemsOption,
    pageSize: initialPageSize = 10,
    initialPage = 1,
  } = options

  const currentPage = ref(initialPage)
  const pageSize = ref(initialPageSize)

  const allItems = computed(() => {
    return 'value' in itemsOption ? itemsOption.value : itemsOption
  })

  const totalItems = computed(() => allItems.value.length)

  const totalPages = computed(() => {
    if (totalItems.value === 0) return 1
    return Math.ceil(totalItems.value / pageSize.value)
  })

  const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value
  })

  const endIndex = computed(() => {
    return Math.min(startIndex.value + pageSize.value - 1, totalItems.value - 1)
  })

  const paginatedItems = computed(() => {
    const start = startIndex.value
    const end = start + pageSize.value
    return allItems.value.slice(start, end)
  })

  const hasPrevious = computed(() => currentPage.value > 1)
  const hasNext = computed(() => currentPage.value < totalPages.value)

  // Ensure current page is valid when items change
  watch(totalPages, (newTotalPages) => {
    if (currentPage.value > newTotalPages) {
      currentPage.value = Math.max(1, newTotalPages)
    }
  })

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages.value))
    currentPage.value = validPage
  }

  const nextPage = () => {
    if (hasNext.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPrevious.value) {
      currentPage.value--
    }
  }

  const firstPage = () => {
    currentPage.value = 1
  }

  const lastPage = () => {
    currentPage.value = totalPages.value
  }

  const setPageSize = (size: number) => {
    pageSize.value = size
    currentPage.value = 1 // Reset to first page when changing page size
  }

  const reset = () => {
    currentPage.value = initialPage
    pageSize.value = initialPageSize
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems,
    startIndex,
    endIndex,
    hasPrevious,
    hasNext,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize,
    reset,
  }
}
