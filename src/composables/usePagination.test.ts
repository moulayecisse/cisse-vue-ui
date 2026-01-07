import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  const createItems = (count: number) => Array.from({ length: count }, (_, i) => ({ id: i + 1 }))

  describe('initialization', () => {
    it('initializes with default values', () => {
      const items = createItems(25)
      const { currentPage, pageSize, totalPages, totalItems } = usePagination({ items })

      expect(currentPage.value).toBe(1)
      expect(pageSize.value).toBe(10)
      expect(totalPages.value).toBe(3)
      expect(totalItems.value).toBe(25)
    })

    it('respects initial page size', () => {
      const items = createItems(50)
      const { pageSize, totalPages } = usePagination({ items, pageSize: 20 })

      expect(pageSize.value).toBe(20)
      expect(totalPages.value).toBe(3)
    })

    it('respects initial page', () => {
      const items = createItems(30)
      const { currentPage } = usePagination({ items, initialPage: 2 })

      expect(currentPage.value).toBe(2)
    })

    it('works with reactive items ref', () => {
      const itemsRef = ref(createItems(20))
      const { totalItems, totalPages } = usePagination({ items: itemsRef })

      expect(totalItems.value).toBe(20)
      expect(totalPages.value).toBe(2)

      // Update items
      itemsRef.value = createItems(50)
      expect(totalItems.value).toBe(50)
      expect(totalPages.value).toBe(5)
    })
  })

  describe('pagination calculations', () => {
    it('calculates correct start and end indices', () => {
      const items = createItems(25)
      const { startIndex, endIndex, goToPage } = usePagination({ items, pageSize: 10 })

      // Page 1
      expect(startIndex.value).toBe(0)
      expect(endIndex.value).toBe(9)

      // Page 2
      goToPage(2)
      expect(startIndex.value).toBe(10)
      expect(endIndex.value).toBe(19)

      // Page 3 (only 5 items)
      goToPage(3)
      expect(startIndex.value).toBe(20)
      expect(endIndex.value).toBe(24)
    })

    it('returns correct paginated items', () => {
      const items = createItems(25)
      const { paginatedItems, goToPage } = usePagination({ items, pageSize: 10 })

      expect(paginatedItems.value).toHaveLength(10)
      expect(paginatedItems.value[0]).toEqual({ id: 1 })
      expect(paginatedItems.value[9]).toEqual({ id: 10 })

      goToPage(3)
      expect(paginatedItems.value).toHaveLength(5)
      expect(paginatedItems.value[0]).toEqual({ id: 21 })
    })

    it('handles empty items', () => {
      const { totalPages, paginatedItems, totalItems } = usePagination({ items: [] })

      expect(totalItems.value).toBe(0)
      expect(totalPages.value).toBe(1) // Minimum 1 page
      expect(paginatedItems.value).toHaveLength(0)
    })

    it('calculates hasPrevious and hasNext correctly', () => {
      const items = createItems(30)
      const { hasPrevious, hasNext, goToPage } = usePagination({ items, pageSize: 10 })

      // Page 1
      expect(hasPrevious.value).toBe(false)
      expect(hasNext.value).toBe(true)

      // Page 2
      goToPage(2)
      expect(hasPrevious.value).toBe(true)
      expect(hasNext.value).toBe(true)

      // Page 3 (last)
      goToPage(3)
      expect(hasPrevious.value).toBe(true)
      expect(hasNext.value).toBe(false)
    })
  })

  describe('navigation', () => {
    it('goToPage navigates to valid pages', () => {
      const items = createItems(50)
      const { currentPage, goToPage } = usePagination({ items })

      goToPage(3)
      expect(currentPage.value).toBe(3)

      goToPage(5)
      expect(currentPage.value).toBe(5)
    })

    it('goToPage clamps to valid range', () => {
      const items = createItems(30)
      const { currentPage, goToPage, totalPages } = usePagination({ items, pageSize: 10 })

      goToPage(0)
      expect(currentPage.value).toBe(1)

      goToPage(-1)
      expect(currentPage.value).toBe(1)

      goToPage(100)
      expect(currentPage.value).toBe(totalPages.value)
    })

    it('nextPage advances to next page', () => {
      const items = createItems(30)
      const { currentPage, nextPage } = usePagination({ items })

      nextPage()
      expect(currentPage.value).toBe(2)

      nextPage()
      expect(currentPage.value).toBe(3)
    })

    it('nextPage does nothing on last page', () => {
      const items = createItems(30)
      const { currentPage, nextPage, goToPage, totalPages } = usePagination({ items })

      goToPage(totalPages.value)
      nextPage()
      expect(currentPage.value).toBe(totalPages.value)
    })

    it('previousPage goes to previous page', () => {
      const items = createItems(30)
      const { currentPage, previousPage, goToPage } = usePagination({ items })

      goToPage(3)
      previousPage()
      expect(currentPage.value).toBe(2)

      previousPage()
      expect(currentPage.value).toBe(1)
    })

    it('previousPage does nothing on first page', () => {
      const items = createItems(30)
      const { currentPage, previousPage } = usePagination({ items })

      previousPage()
      expect(currentPage.value).toBe(1)
    })

    it('firstPage goes to first page', () => {
      const items = createItems(50)
      const { currentPage, firstPage, goToPage } = usePagination({ items })

      goToPage(4)
      firstPage()
      expect(currentPage.value).toBe(1)
    })

    it('lastPage goes to last page', () => {
      const items = createItems(50)
      const { currentPage, lastPage, totalPages } = usePagination({ items })

      lastPage()
      expect(currentPage.value).toBe(totalPages.value)
    })
  })

  describe('page size', () => {
    it('setPageSize changes page size and resets to page 1', () => {
      const items = createItems(50)
      const { currentPage, pageSize, setPageSize, goToPage, totalPages } = usePagination({ items })

      goToPage(3)
      expect(currentPage.value).toBe(3)

      setPageSize(20)
      expect(pageSize.value).toBe(20)
      expect(currentPage.value).toBe(1) // Reset to page 1
      expect(totalPages.value).toBe(3)
    })
  })

  describe('reset', () => {
    it('resets to initial state', () => {
      const items = createItems(50)
      const { currentPage, pageSize, reset, goToPage, setPageSize } = usePagination({
        items,
        pageSize: 15,
        initialPage: 2,
      })

      goToPage(4)
      setPageSize(5)

      reset()
      expect(currentPage.value).toBe(2)
      expect(pageSize.value).toBe(15)
    })
  })

  describe('reactive updates', () => {
    it('adjusts current page when items shrink', async () => {
      const itemsRef = ref(createItems(100))
      const { currentPage, goToPage } = usePagination({ items: itemsRef, pageSize: 10 })

      goToPage(10) // Last page
      expect(currentPage.value).toBe(10)

      // Shrink items to only 30
      itemsRef.value = createItems(30)

      // Wait for watcher to trigger
      await Promise.resolve()

      // Current page should adjust to valid range
      expect(currentPage.value).toBe(3)
    })

    it('stays on same page when items grow', async () => {
      const itemsRef = ref(createItems(30))
      const { currentPage, goToPage } = usePagination({ items: itemsRef, pageSize: 10 })

      goToPage(2)
      expect(currentPage.value).toBe(2)

      // Add more items
      itemsRef.value = createItems(100)

      await Promise.resolve()

      expect(currentPage.value).toBe(2) // Should stay on page 2
    })
  })
})
