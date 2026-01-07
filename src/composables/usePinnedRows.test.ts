import { describe, it, expect } from 'vitest'
import { usePinnedRows } from './usePinnedRows'

interface TestItem {
  id: number
  name: string
  [key: string]: unknown
}

describe('usePinnedRows', () => {
  const sampleItems: TestItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
  ]

  describe('initialization', () => {
    it('initializes with no pinned rows by default', () => {
      const { pinnedTop, pinnedBottom, pinnedKeys } = usePinnedRows<TestItem>()

      expect(pinnedTop.value).toHaveLength(0)
      expect(pinnedBottom.value).toHaveLength(0)
      expect(pinnedKeys.value.size).toBe(0)
    })

    it('respects initialPinned option', () => {
      const { pinnedTop, pinnedBottom, isPinned } = usePinnedRows<TestItem>({
        initialPinned: [
          { item: sampleItems[0], position: 'top' },
          { item: sampleItems[1], position: 'bottom' },
        ],
      })

      expect(pinnedTop.value).toHaveLength(1)
      expect(pinnedBottom.value).toHaveLength(1)
      expect(isPinned(sampleItems[0])).toBe(true)
      expect(isPinned(sampleItems[1])).toBe(true)
      expect(isPinned(sampleItems[2])).toBe(false)
    })
  })

  describe('pin', () => {
    it('pins an item to the top', () => {
      const { pin, pinnedTop, isPinned, getPinPosition } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')

      expect(pinnedTop.value).toHaveLength(1)
      expect(isPinned(sampleItems[0])).toBe(true)
      expect(getPinPosition(sampleItems[0])).toBe('top')
    })

    it('pins an item to the bottom', () => {
      const { pin, pinnedBottom, isPinned, getPinPosition } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'bottom')

      expect(pinnedBottom.value).toHaveLength(1)
      expect(isPinned(sampleItems[0])).toBe(true)
      expect(getPinPosition(sampleItems[0])).toBe('bottom')
    })

    it('respects maxPinnedTop limit', () => {
      const { pin, pinnedTop } = usePinnedRows<TestItem>({
        maxPinnedTop: 2,
      })

      pin(sampleItems[0], 'top')
      pin(sampleItems[1], 'top')
      pin(sampleItems[2], 'top') // Should not be added

      expect(pinnedTop.value).toHaveLength(2)
    })

    it('respects maxPinnedBottom limit', () => {
      const { pin, pinnedBottom } = usePinnedRows<TestItem>({
        maxPinnedBottom: 1,
      })

      pin(sampleItems[0], 'bottom')
      pin(sampleItems[1], 'bottom') // Should not be added

      expect(pinnedBottom.value).toHaveLength(1)
    })

    it('can repin same item to different position', () => {
      const { pin, getPinPosition, pinnedTop, pinnedBottom } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      expect(getPinPosition(sampleItems[0])).toBe('top')
      expect(pinnedTop.value).toHaveLength(1)
      expect(pinnedBottom.value).toHaveLength(0)

      pin(sampleItems[0], 'bottom')
      expect(getPinPosition(sampleItems[0])).toBe('bottom')
      expect(pinnedTop.value).toHaveLength(0)
      expect(pinnedBottom.value).toHaveLength(1)
    })
  })

  describe('unpin', () => {
    it('unpins an item', () => {
      const { pin, unpin, isPinned, pinnedTop } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      expect(isPinned(sampleItems[0])).toBe(true)

      unpin(sampleItems[0])
      expect(isPinned(sampleItems[0])).toBe(false)
      expect(pinnedTop.value).toHaveLength(0)
    })

    it('does nothing when unpinning non-pinned item', () => {
      const { unpin, pinnedKeys } = usePinnedRows<TestItem>()

      unpin(sampleItems[0])
      expect(pinnedKeys.value.size).toBe(0)
    })
  })

  describe('togglePin', () => {
    it('pins an unpinned item', () => {
      const { togglePin, isPinned } = usePinnedRows<TestItem>()

      togglePin(sampleItems[0])
      expect(isPinned(sampleItems[0])).toBe(true)
    })

    it('unpins a pinned item', () => {
      const { pin, togglePin, isPinned } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      togglePin(sampleItems[0])
      expect(isPinned(sampleItems[0])).toBe(false)
    })

    it('pins to specified position', () => {
      const { togglePin, getPinPosition } = usePinnedRows<TestItem>()

      togglePin(sampleItems[0], 'bottom')
      expect(getPinPosition(sampleItems[0])).toBe('bottom')
    })

    it('defaults to top position', () => {
      const { togglePin, getPinPosition } = usePinnedRows<TestItem>()

      togglePin(sampleItems[0])
      expect(getPinPosition(sampleItems[0])).toBe('top')
    })
  })

  describe('movePin', () => {
    it('moves a pinned item to a new position', () => {
      const { pin, movePin, getPinPosition, pinnedTop, pinnedBottom } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      expect(pinnedTop.value).toHaveLength(1)
      expect(pinnedBottom.value).toHaveLength(0)

      movePin(sampleItems[0], 'bottom')
      expect(pinnedTop.value).toHaveLength(0)
      expect(pinnedBottom.value).toHaveLength(1)
      expect(getPinPosition(sampleItems[0])).toBe('bottom')
    })

    it('does nothing for non-pinned item', () => {
      const { movePin, isPinned } = usePinnedRows<TestItem>()

      movePin(sampleItems[0], 'bottom')
      expect(isPinned(sampleItems[0])).toBe(false)
    })
  })

  describe('clearAll', () => {
    it('clears all pinned items', () => {
      const { pin, clearAll, pinnedTop, pinnedBottom, pinnedKeys } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      pin(sampleItems[1], 'top')
      pin(sampleItems[2], 'bottom')

      clearAll()

      expect(pinnedTop.value).toHaveLength(0)
      expect(pinnedBottom.value).toHaveLength(0)
      expect(pinnedKeys.value.size).toBe(0)
    })
  })

  describe('clear', () => {
    it('clears only top pinned items', () => {
      const { pin, clear, pinnedTop, pinnedBottom } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      pin(sampleItems[1], 'top')
      pin(sampleItems[2], 'bottom')

      clear('top')

      expect(pinnedTop.value).toHaveLength(0)
      expect(pinnedBottom.value).toHaveLength(1)
    })

    it('clears only bottom pinned items', () => {
      const { pin, clear, pinnedTop, pinnedBottom } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      pin(sampleItems[1], 'bottom')
      pin(sampleItems[2], 'bottom')

      clear('bottom')

      expect(pinnedTop.value).toHaveLength(1)
      expect(pinnedBottom.value).toHaveLength(0)
    })
  })

  describe('custom keyField', () => {
    it('uses custom keyField for identification', () => {
      const items = [
        { uuid: 'abc', name: 'Item A' },
        { uuid: 'def', name: 'Item B' },
      ]

      const { pin, isPinned, pinnedKeys } = usePinnedRows({
        keyField: 'uuid',
      })

      pin(items[0], 'top')

      expect(isPinned(items[0])).toBe(true)
      expect(pinnedKeys.value.has('abc')).toBe(true)
    })
  })

  describe('pinnedKeys', () => {
    it('returns set of all pinned item keys', () => {
      const { pin, pinnedKeys } = usePinnedRows<TestItem>()

      pin(sampleItems[0], 'top')
      pin(sampleItems[2], 'bottom')

      expect(pinnedKeys.value.has('1')).toBe(true)
      expect(pinnedKeys.value.has('2')).toBe(false)
      expect(pinnedKeys.value.has('3')).toBe(true)
    })
  })
})
