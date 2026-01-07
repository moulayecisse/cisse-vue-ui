import { ref, computed, type Ref, type ComputedRef } from 'vue'

export type CellType = 'text' | 'number' | 'date' | 'boolean' | 'select'

export interface CellEditEvent<T = unknown> {
  /** Row item being edited */
  item: T
  /** Column/field name */
  field: string
  /** Original value before edit */
  originalValue: unknown
  /** New value after edit */
  newValue: unknown
}

export interface EditingCell {
  /** Row key */
  rowKey: string
  /** Column/field name */
  field: string
}

export interface UseEditableCellOptions<T = unknown> {
  /** Key field for row identification */
  keyField?: string
  /** Callback when edit is confirmed */
  onSave?: (event: CellEditEvent<T>) => void | Promise<void>
  /** Callback when edit is cancelled */
  onCancel?: (event: Omit<CellEditEvent<T>, 'newValue'>) => void
  /** Validate value before saving (return error message or null) */
  validate?: (event: CellEditEvent<T>) => string | null
}

export interface UseEditableCellReturn<T> {
  /** Currently editing cell (null if none) */
  editingCell: Ref<EditingCell | null>
  /** Current edit value */
  editValue: Ref<unknown>
  /** Validation error message */
  error: Ref<string | null>
  /** Whether currently saving */
  saving: Ref<boolean>
  /** Check if a specific cell is being edited */
  isEditing: (rowKey: string, field: string) => boolean
  /** Start editing a cell */
  startEdit: (item: T, field: string, currentValue: unknown) => void
  /** Confirm the edit and save */
  confirmEdit: () => Promise<void>
  /** Cancel the edit */
  cancelEdit: () => void
  /** Update the edit value */
  updateValue: (value: unknown) => void
  /** Get item being edited */
  editingItem: ComputedRef<T | null>
}

export function useEditableCell<T>(
  options: UseEditableCellOptions<T> = {}
): UseEditableCellReturn<T> {
  const {
    keyField = 'id',
    onSave,
    onCancel,
    validate,
  } = options

  const editingCell = ref<EditingCell | null>(null)
  const editValue = ref<unknown>(null)
  const error = ref<string | null>(null)
  const saving = ref(false)
  const currentItem = ref<T | null>(null)
  const originalValue = ref<unknown>(null)

  const getItemKey = (item: T): string => {
    const key = (item as Record<string, unknown>)[keyField]
    return String(key ?? Math.random())
  }

  const isEditing = (rowKey: string, field: string): boolean => {
    return editingCell.value?.rowKey === rowKey && editingCell.value?.field === field
  }

  const startEdit = (item: T, field: string, currentValue: unknown) => {
    // Cancel any existing edit
    if (editingCell.value) {
      cancelEdit()
    }

    currentItem.value = item as T
    originalValue.value = currentValue
    editValue.value = currentValue
    error.value = null
    editingCell.value = {
      rowKey: getItemKey(item),
      field,
    }
  }

  const confirmEdit = async () => {
    if (!editingCell.value || !currentItem.value) return

    const event: CellEditEvent<T> = {
      item: currentItem.value,
      field: editingCell.value.field,
      originalValue: originalValue.value,
      newValue: editValue.value,
    }

    // Validate if validator provided
    if (validate) {
      const validationError = validate(event)
      if (validationError) {
        error.value = validationError
        return
      }
    }

    // Save
    saving.value = true
    error.value = null

    try {
      if (onSave) {
        await onSave(event)
      }
      // Clear editing state on success
      editingCell.value = null
      editValue.value = null
      currentItem.value = null
      originalValue.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to save'
    } finally {
      saving.value = false
    }
  }

  const cancelEdit = () => {
    if (editingCell.value && currentItem.value && onCancel) {
      onCancel({
        item: currentItem.value,
        field: editingCell.value.field,
        originalValue: originalValue.value,
      })
    }

    editingCell.value = null
    editValue.value = null
    error.value = null
    currentItem.value = null
    originalValue.value = null
  }

  const updateValue = (value: unknown) => {
    editValue.value = value
    error.value = null // Clear error on value change
  }

  const editingItem = computed(() => currentItem.value)

  return {
    editingCell,
    editValue,
    error,
    saving,
    isEditing,
    startEdit,
    confirmEdit,
    cancelEdit,
    updateValue,
    editingItem,
  }
}
