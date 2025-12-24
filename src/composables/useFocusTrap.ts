import { ref, watch, onUnmounted, getCurrentInstance, type Ref } from 'vue'

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ')

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  active?: Ref<boolean> | boolean
  /** Focus the first focusable element when trap activates */
  focusFirst?: boolean
  /** Restore focus to the previously focused element when trap deactivates */
  restoreFocus?: boolean
  /** Initial element to focus (selector or element) */
  initialFocus?: string | HTMLElement | null
}

export interface UseFocusTrapReturn {
  /** Ref to attach to the container element */
  containerRef: Ref<HTMLElement | null>
  /** Activate the focus trap manually */
  activate: () => void
  /** Deactivate the focus trap manually */
  deactivate: () => void
  /** Whether the focus trap is currently active */
  isActive: Ref<boolean>
}

/**
 * Composable for trapping focus within a container element (for modals, dialogs, etc.)
 *
 * @example
 * ```vue
 * <script setup>
 * const isOpen = ref(false)
 * const { containerRef } = useFocusTrap({ active: isOpen })
 * </script>
 *
 * <template>
 *   <div v-if="isOpen" ref="containerRef" role="dialog">
 *     <button>First focusable</button>
 *     <input type="text" />
 *     <button @click="isOpen = false">Close</button>
 *   </div>
 * </template>
 * ```
 */
export function useFocusTrap(options: UseFocusTrapOptions = {}): UseFocusTrapReturn {
  const { focusFirst = true, restoreFocus = true, initialFocus = null } = options

  const containerRef = ref<HTMLElement | null>(null)
  const isActive = ref(false)
  const previouslyFocusedElement = ref<HTMLElement | null>(null)

  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value) return []
    return Array.from(containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
      (el) => el.offsetParent !== null, // Element is visible
    )
  }

  function getInitialFocusElement(): HTMLElement | null {
    if (!containerRef.value) return null

    if (initialFocus) {
      if (typeof initialFocus === 'string') {
        return containerRef.value.querySelector<HTMLElement>(initialFocus)
      }
      return initialFocus
    }

    const focusable = getFocusableElements()
    return focusable[0] || null
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !containerRef.value) return

    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const firstFocusable = focusable[0]
    const lastFocusable = focusable[focusable.length - 1]
    const activeElement = document.activeElement as HTMLElement

    if (event.shiftKey) {
      // Shift + Tab: move backwards
      if (activeElement === firstFocusable || !containerRef.value.contains(activeElement)) {
        event.preventDefault()
        lastFocusable.focus()
      }
    } else {
      // Tab: move forwards
      if (activeElement === lastFocusable || !containerRef.value.contains(activeElement)) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }
  }

  function activate(): void {
    if (isActive.value) return

    // Store the currently focused element
    previouslyFocusedElement.value = document.activeElement as HTMLElement

    isActive.value = true

    // Add event listener
    document.addEventListener('keydown', handleKeyDown)

    // Focus initial element after a tick to ensure DOM is ready
    if (focusFirst) {
      requestAnimationFrame(() => {
        const initialElement = getInitialFocusElement()
        if (initialElement) {
          initialElement.focus()
        }
      })
    }
  }

  function deactivate(): void {
    if (!isActive.value) return

    isActive.value = false

    // Remove event listener
    document.removeEventListener('keydown', handleKeyDown)

    // Restore focus
    if (restoreFocus && previouslyFocusedElement.value) {
      previouslyFocusedElement.value.focus()
      previouslyFocusedElement.value = null
    }
  }

  // Handle reactive active option
  const activeOption = options.active
  if (activeOption !== undefined) {
    if (typeof activeOption === 'boolean') {
      if (activeOption) {
        // Wait for containerRef to be set
        const unwatch = watch(
          containerRef,
          (container) => {
            if (container) {
              activate()
              unwatch()
            }
          },
          { immediate: true },
        )
      }
    } else {
      // It's a Ref<boolean>
      watch(
        [activeOption, containerRef],
        ([active, container]) => {
          if (active && container) {
            activate()
          } else if (!active) {
            deactivate()
          }
        },
        { immediate: true },
      )
    }
  }

  // Cleanup on unmount (only when used inside a component)
  if (getCurrentInstance()) {
    onUnmounted(() => {
      deactivate()
    })
  }

  return {
    containerRef,
    activate,
    deactivate,
    isActive,
  }
}
