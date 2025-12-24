import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDropdown } from './useDropdown'

describe('useDropdown', () => {
  let triggerEl: HTMLElement
  let dropdownEl: HTMLElement

  beforeEach(() => {
    triggerEl = document.createElement('button')
    triggerEl.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 50,
      right: 150,
      bottom: 130,
      width: 100,
      height: 30,
      x: 50,
      y: 100,
      toJSON: () => ({}),
    }))
    document.body.appendChild(triggerEl)

    dropdownEl = document.createElement('div')
    document.body.appendChild(dropdownEl)
  })

  afterEach(() => {
    document.body.removeChild(triggerEl)
    document.body.removeChild(dropdownEl)
  })

  it('returns all expected properties and methods', () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const result = useDropdown(triggerRef, dropdownRef)

    expect(result.isOpen).toBeDefined()
    expect(result.highlightedIndex).toBeDefined()
    expect(result.dropdownPosition).toBeDefined()
    expect(result.dropdownStyle).toBeDefined()
    expect(typeof result.open).toBe('function')
    expect(typeof result.close).toBe('function')
    expect(typeof result.toggle).toBe('function')
    expect(typeof result.updatePosition).toBe('function')
    expect(typeof result.handleKeydown).toBe('function')
    expect(typeof result.scrollToHighlighted).toBe('function')
  })

  it('starts with dropdown closed', () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { isOpen } = useDropdown(triggerRef, dropdownRef)

    expect(isOpen.value).toBe(false)
  })

  it('opens dropdown when open() is called', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)
    const onOpen = vi.fn()

    const { isOpen, open } = useDropdown(triggerRef, dropdownRef, { onOpen })

    open()
    await nextTick()

    expect(isOpen.value).toBe(true)
    expect(onOpen).toHaveBeenCalled()
  })

  it('closes dropdown when close() is called', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)
    const onClose = vi.fn()

    const { isOpen, open, close, highlightedIndex } = useDropdown(triggerRef, dropdownRef, {
      onClose,
    })

    open()
    await nextTick()
    expect(isOpen.value).toBe(true)

    close()
    await nextTick()
    expect(isOpen.value).toBe(false)
    expect(highlightedIndex.value).toBe(-1)
    expect(onClose).toHaveBeenCalled()
  })

  it('toggles dropdown state', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { isOpen, toggle } = useDropdown(triggerRef, dropdownRef)

    toggle()
    await nextTick()
    expect(isOpen.value).toBe(true)

    toggle()
    await nextTick()
    expect(isOpen.value).toBe(false)
  })

  it('calculates position based on trigger element', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { open, dropdownPosition } = useDropdown(triggerRef, dropdownRef, { gap: 8 })

    open()
    await nextTick()

    expect(dropdownPosition.value.top).toBe(130 + window.scrollY + 8) // bottom + scrollY + gap
    expect(dropdownPosition.value.left).toBe(50 + window.scrollX)
    expect(dropdownPosition.value.width).toBe(100)
  })

  it('generates correct dropdown style for left alignment', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { open, dropdownStyle } = useDropdown(triggerRef, dropdownRef, { align: 'left' })

    open()
    await nextTick()

    expect(dropdownStyle.value.position).toBe('absolute')
    expect(dropdownStyle.value.right).toBe('auto')
  })

  it('generates correct dropdown style for right alignment', async () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { open, dropdownStyle } = useDropdown(triggerRef, dropdownRef, { align: 'right' })

    open()
    await nextTick()

    expect(dropdownStyle.value.position).toBe('absolute')
    expect(dropdownStyle.value.left).toBe('auto')
  })

  it('returns empty style when teleport is disabled', () => {
    const triggerRef = ref(triggerEl)
    const dropdownRef = ref(dropdownEl)

    const { dropdownStyle } = useDropdown(triggerRef, dropdownRef, { teleport: false })

    expect(dropdownStyle.value).toEqual({})
  })

  describe('keyboard navigation', () => {
    it('navigates down with ArrowDown', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, highlightedIndex, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      vi.spyOn(event, 'preventDefault')

      handleKeydown(event, { itemCount: 5 })
      expect(highlightedIndex.value).toBe(0)

      handleKeydown(event, { itemCount: 5 })
      expect(highlightedIndex.value).toBe(1)
    })

    it('navigates up with ArrowUp', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, highlightedIndex, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()

      // Start at index 2
      highlightedIndex.value = 2

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      vi.spyOn(event, 'preventDefault')

      handleKeydown(event, { itemCount: 5 })
      expect(highlightedIndex.value).toBe(1)

      handleKeydown(event, { itemCount: 5 })
      expect(highlightedIndex.value).toBe(0)
    })

    it('does not go below 0 with ArrowUp', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, highlightedIndex, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()
      highlightedIndex.value = 0

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      handleKeydown(event, { itemCount: 5 })

      expect(highlightedIndex.value).toBe(0)
    })

    it('does not exceed itemCount with ArrowDown', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, highlightedIndex, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()
      highlightedIndex.value = 4

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      handleKeydown(event, { itemCount: 5 })

      expect(highlightedIndex.value).toBe(4)
    })

    it('calls onSelect when Enter is pressed', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)
      const onSelect = vi.fn()

      const { open, highlightedIndex, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()
      highlightedIndex.value = 2

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      handleKeydown(event, { itemCount: 5, onSelect })

      expect(onSelect).toHaveBeenCalledWith(2)
    })

    it('closes dropdown on Escape', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, isOpen, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()
      expect(isOpen.value).toBe(true)

      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      handleKeydown(event, { itemCount: 5 })

      expect(isOpen.value).toBe(false)
    })

    it('closes dropdown on Tab', async () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)

      const { open, isOpen, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      open()
      await nextTick()
      expect(isOpen.value).toBe(true)

      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      handleKeydown(event, { itemCount: 5 })

      expect(isOpen.value).toBe(false)
    })

    it('opens dropdown with handleOpenKeys when closed', () => {
      const triggerRef = ref(triggerEl)
      const dropdownRef = ref(dropdownEl)
      const onOpenNav = vi.fn()

      const { isOpen, handleKeydown } = useDropdown(triggerRef, dropdownRef)

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      vi.spyOn(event, 'preventDefault')

      handleKeydown(event, { itemCount: 5, handleOpenKeys: true, onOpen: onOpenNav })

      expect(isOpen.value).toBe(true)
      expect(onOpenNav).toHaveBeenCalled()
    })
  })
})
