import { ref, type Ref } from 'vue'

export interface UseModalReturn<T = unknown> {
  /** Whether the modal is currently open */
  isOpen: Ref<boolean>
  /** Data associated with the modal (e.g., item being edited) */
  data: Ref<T | null>
  /** Open the modal, optionally with data */
  open: (newData?: T) => void
  /** Close the modal and clear data */
  close: () => void
  /** Toggle the modal state */
  toggle: () => void
}

/**
 * Composable for managing modal state
 *
 * @example
 * ```ts
 * // Simple modal
 * const createModal = useModal()
 * createModal.open()
 * createModal.close()
 *
 * // Modal with data (e.g., for editing)
 * const editModal = useModal<User>()
 * editModal.open(selectedUser)
 * // Access editModal.data.value in modal
 *
 * // With onClose callback
 * const deleteModal = useModal<Item>({ onClose: () => refetch() })
 * ```
 */
export function useModal<T = unknown>(options?: {
  /** Initial open state */
  initialOpen?: boolean
  /** Initial data */
  initialData?: T | null
  /** Callback when modal opens */
  onOpen?: (data: T | null) => void
  /** Callback when modal closes */
  onClose?: () => void
}): UseModalReturn<T> {
  const {
    initialOpen = false,
    initialData = null,
    onOpen,
    onClose,
  } = options ?? {}

  const isOpen = ref(initialOpen)
  const data = ref<T | null>(initialData) as Ref<T | null>

  const open = (newData?: T) => {
    data.value = newData ?? null
    isOpen.value = true
    onOpen?.(data.value)
  }

  const close = () => {
    isOpen.value = false
    data.value = null
    onClose?.()
  }

  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  }
}

/**
 * Create multiple related modals at once
 * Useful when a page has several modals (create, edit, delete, etc.)
 *
 * @example
 * ```ts
 * const modals = useModals({
 *   create: useModal(),
 *   edit: useModal<User>(),
 *   delete: useModal<User>(),
 * })
 *
 * modals.create.open()
 * modals.edit.open(user)
 * modals.delete.close()
 * ```
 */
export function useModals<T extends Record<string, UseModalReturn<unknown>>>(
  modals: T
): T {
  return modals
}
