import { ref, computed, watch, onUnmounted, nextTick, type Ref, type ComputedRef } from 'vue'

export interface UseDropdownOptions {
  /** Whether teleport is enabled (affects position calculation) */
  teleport?: boolean
  /** Alignment for position calculation */
  align?: 'left' | 'right'
  /** Gap between trigger and dropdown in pixels */
  gap?: number
  /** Callback when dropdown opens */
  onOpen?: () => void
  /** Callback when dropdown closes */
  onClose?: () => void
}

export interface UseDropdownReturn {
  /** Whether the dropdown is currently open */
  isOpen: Ref<boolean>
  /** Current highlighted index for keyboard navigation */
  highlightedIndex: Ref<number>
  /** Calculated position for teleported dropdown */
  dropdownPosition: Ref<{ top: number; left: number; right: number; width: number }>
  /** Computed style object for teleported dropdown */
  dropdownStyle: ComputedRef<Record<string, string>>
  /** Open the dropdown */
  open: () => void
  /** Close the dropdown */
  close: () => void
  /** Toggle the dropdown */
  toggle: () => void
  /** Update position (call after DOM changes) */
  updatePosition: () => void
  /** Handle keyboard navigation */
  handleKeydown: (event: KeyboardEvent, options: KeyboardNavigationOptions) => void
  /** Scroll to highlighted item */
  scrollToHighlighted: (dropdownEl: HTMLElement | null) => void
}

export interface KeyboardNavigationOptions {
  /** Total number of items to navigate */
  itemCount: number
  /** Called when Enter is pressed on a highlighted item */
  onSelect?: (index: number) => void
  /** Called when the dropdown should open (Space/Enter/ArrowDown when closed) */
  onOpen?: () => void
  /** Whether to handle open keys (Space/Enter/ArrowDown) when closed */
  handleOpenKeys?: boolean
}

export function useDropdown(
  triggerRef: Ref<HTMLElement | null | undefined>,
  dropdownRef: Ref<HTMLElement | null | undefined>,
  options: UseDropdownOptions = {}
): UseDropdownReturn {
  const { teleport = true, align = 'left', gap = 8, onOpen, onClose } = options

  const isOpen = ref(false)
  const highlightedIndex = ref(-1)
  const dropdownPosition = ref({ top: 0, left: 0, right: 0, width: 0 })

  const updatePosition = () => {
    if (!triggerRef.value || !teleport) return
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownPosition.value = {
      top: rect.bottom + window.scrollY + gap,
      left: rect.left + window.scrollX,
      right: window.innerWidth - rect.right - window.scrollX,
      width: rect.width,
    }
  }

  const open = () => {
    isOpen.value = true
    nextTick(updatePosition)
    onOpen?.()
  }

  const close = () => {
    isOpen.value = false
    highlightedIndex.value = -1
    onClose?.()
  }

  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node
    const isInsideTrigger = triggerRef.value?.contains(target)
    const isInsideDropdown = dropdownRef.value?.contains(target)
    if (!isInsideTrigger && !isInsideDropdown) {
      close()
    }
  }

  const scrollToHighlighted = (dropdownEl: HTMLElement | null) => {
    nextTick(() => {
      if (dropdownEl) {
        const highlighted = dropdownEl.querySelector(
          `[data-index="${highlightedIndex.value}"]`
        ) as HTMLElement
        if (highlighted) {
          highlighted.scrollIntoView({ block: 'nearest' })
        }
      }
    })
  }

  const handleKeydown = (event: KeyboardEvent, navOptions: KeyboardNavigationOptions) => {
    const { itemCount, onSelect, onOpen: onOpenNav, handleOpenKeys = false } = navOptions

    if (!isOpen.value) {
      if (handleOpenKeys && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
        event.preventDefault()
        onOpenNav?.()
        open()
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, itemCount - 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
        break
      case 'Enter':
        event.preventDefault()
        if (highlightedIndex.value >= 0) {
          onSelect?.(highlightedIndex.value)
        }
        break
      case 'Escape':
        event.preventDefault()
        close()
        break
      case 'Tab':
        close()
        break
    }
  }

  const dropdownStyle = computed(() => {
    if (!teleport) return {} as Record<string, string>
    return {
      position: 'absolute',
      top: `${dropdownPosition.value.top}px`,
      left: align === 'right' ? 'auto' : `${dropdownPosition.value.left}px`,
      right: align === 'right' ? `${dropdownPosition.value.right}px` : 'auto',
      width: `${dropdownPosition.value.width}px`,
    } as Record<string, string>
  })

  // Event listener management
  watch(isOpen, (newValue) => {
    if (newValue) {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    } else {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  })

  return {
    isOpen,
    highlightedIndex,
    dropdownPosition,
    dropdownStyle,
    open,
    close,
    toggle,
    updatePosition,
    handleKeydown,
    scrollToHighlighted,
  }
}
