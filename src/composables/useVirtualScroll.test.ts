import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useVirtualScroll } from './useVirtualScroll'

describe('useVirtualScroll', () => {
  const createItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

  describe('initialization', () => {
    it('initializes with correct values', () => {
      const items = createItems(1000)
      const { visibleItems, totalHeight, startIndex, endIndex, scrollTop } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 3,
      })

      expect(scrollTop.value).toBe(0)
      expect(totalHeight.value).toBe(1000 * 40) // 40000
      expect(startIndex.value).toBe(0)
      // 10 visible + 3 overscan = 13 (but starts at 0 so no previous overscan)
      expect(endIndex.value).toBe(16) // 10 visible + 6 overscan
      expect(visibleItems.value.length).toBe(16)
    })

    it('works with reactive items ref', () => {
      const itemsRef = ref(createItems(100))
      const { totalHeight } = useVirtualScroll({
        items: itemsRef,
        rowHeight: 40,
        containerHeight: 400,
      })

      expect(totalHeight.value).toBe(4000)

      // Update items
      itemsRef.value = createItems(200)
      expect(totalHeight.value).toBe(8000)
    })
  })

  describe('scrolling', () => {
    it('updates visible items on scroll', () => {
      const items = createItems(1000)
      const { visibleItems, startIndex, endIndex, onScroll } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 3,
      })

      // Simulate scroll to row 100 (4000px)
      const mockEvent = { target: { scrollTop: 4000 } } as unknown as Event
      onScroll(mockEvent)

      // Should start around row 97 (100 - 3 overscan)
      expect(startIndex.value).toBe(97)
      // Should end around row 113 (97 + 10 visible + 6 overscan)
      expect(endIndex.value).toBe(113)
      expect(visibleItems.value.length).toBe(16)
      // First visible item should be row 98 (index 97)
      expect(visibleItems.value[0]).toEqual({ id: 98, name: 'Item 98' })
    })

    it('clamps startIndex to 0', () => {
      const items = createItems(100)
      const { startIndex, onScroll } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 10,
      })

      // Scroll to near the top
      const mockEvent = { target: { scrollTop: 40 } } as unknown as Event
      onScroll(mockEvent)

      // Should be clamped to 0, not negative
      expect(startIndex.value).toBe(0)
    })

    it('clamps endIndex to items length', () => {
      const items = createItems(20)
      const { endIndex, onScroll } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 3,
      })

      // Scroll near the end
      const mockEvent = { target: { scrollTop: 400 } } as unknown as Event
      onScroll(mockEvent)

      // Should be clamped to items length
      expect(endIndex.value).toBeLessThanOrEqual(20)
    })
  })

  describe('offsetY', () => {
    it('calculates correct offset for visible items', () => {
      const items = createItems(1000)
      const { offsetY, onScroll } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 3,
      })

      expect(offsetY.value).toBe(0)

      // Scroll to row 100
      const mockEvent = { target: { scrollTop: 4000 } } as unknown as Event
      onScroll(mockEvent)

      // Offset should be startIndex * rowHeight = 97 * 40 = 3880
      expect(offsetY.value).toBe(97 * 40)
    })
  })

  describe('scrollToIndex', () => {
    it('scrolls to a specific index', () => {
      const items = createItems(1000)
      const { scrollTop, scrollToIndex } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
      })

      scrollToIndex(50)
      expect(scrollTop.value).toBe(50 * 40) // 2000
    })
  })

  describe('totalHeight', () => {
    it('calculates correct total height', () => {
      const items = createItems(500)
      const { totalHeight } = useVirtualScroll({
        items,
        rowHeight: 50,
        containerHeight: 300,
      })

      expect(totalHeight.value).toBe(500 * 50) // 25000
    })

    it('handles empty items', () => {
      const { totalHeight, visibleItems } = useVirtualScroll({
        items: [],
        rowHeight: 40,
        containerHeight: 400,
      })

      expect(totalHeight.value).toBe(0)
      expect(visibleItems.value).toHaveLength(0)
    })
  })

  describe('custom overscan', () => {
    it('respects custom overscan value', () => {
      const items = createItems(1000)
      const { visibleItems, onScroll } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        overscan: 10,
      })

      // Scroll to middle
      const mockEvent = { target: { scrollTop: 4000 } } as unknown as Event
      onScroll(mockEvent)

      // With overscan 10: 10 visible + 10*2 overscan = 30 items
      // startIndex = 90 (100 - 10), endIndex = 120 (90 + 10 + 20)
      expect(visibleItems.value.length).toBe(30)
    })

    it('uses default overscan of 3', () => {
      const items = createItems(1000)
      const { endIndex } = useVirtualScroll({
        items,
        rowHeight: 40,
        containerHeight: 400,
        // No overscan specified, defaults to 3
      })

      // At scroll 0: 10 visible + 6 overscan = 16
      expect(endIndex.value).toBe(16)
    })
  })
})
