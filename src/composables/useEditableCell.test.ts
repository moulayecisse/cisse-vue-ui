import { describe, it, expect, vi } from 'vitest'
import { useEditableCell } from './useEditableCell'

interface TestItem {
  id: number
  name: string
  email: string
  [key: string]: unknown
}

describe('useEditableCell', () => {
  const sampleItem: TestItem = { id: 1, name: 'John', email: 'john@example.com' }

  describe('initialization', () => {
    it('initializes with no cell editing', () => {
      const { editingCell, editValue, error, saving } = useEditableCell<TestItem>()

      expect(editingCell.value).toBeNull()
      expect(editValue.value).toBeNull()
      expect(error.value).toBeNull()
      expect(saving.value).toBe(false)
    })
  })

  describe('startEdit', () => {
    it('starts editing a cell', () => {
      const { startEdit, editingCell, editValue, isEditing } = useEditableCell<TestItem>()

      startEdit(sampleItem, 'name', 'John')

      expect(editingCell.value).toEqual({ rowKey: '1', field: 'name' })
      expect(editValue.value).toBe('John')
      expect(isEditing('1', 'name')).toBe(true)
      expect(isEditing('1', 'email')).toBe(false)
      expect(isEditing('2', 'name')).toBe(false)
    })

    it('cancels previous edit when starting new one', () => {
      const onCancel = vi.fn()
      const { startEdit, isEditing } = useEditableCell<TestItem>({ onCancel })

      startEdit(sampleItem, 'name', 'John')
      expect(isEditing('1', 'name')).toBe(true)

      startEdit(sampleItem, 'email', 'john@example.com')
      expect(isEditing('1', 'name')).toBe(false)
      expect(isEditing('1', 'email')).toBe(true)
      expect(onCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateValue', () => {
    it('updates the edit value', () => {
      const { startEdit, updateValue, editValue } = useEditableCell<TestItem>()

      startEdit(sampleItem, 'name', 'John')
      expect(editValue.value).toBe('John')

      updateValue('Jane')
      expect(editValue.value).toBe('Jane')
    })

    it('clears error on value change', () => {
      const { startEdit, updateValue, error } = useEditableCell<TestItem>({
        validate: () => 'Error',
      })

      startEdit(sampleItem, 'name', 'John')
      error.value = 'Some error'

      updateValue('Jane')
      expect(error.value).toBeNull()
    })
  })

  describe('confirmEdit', () => {
    it('calls onSave with edit event', async () => {
      const onSave = vi.fn()
      const { startEdit, updateValue, confirmEdit } = useEditableCell<TestItem>({ onSave })

      startEdit(sampleItem, 'name', 'John')
      updateValue('Jane')
      await confirmEdit()

      expect(onSave).toHaveBeenCalledWith({
        item: sampleItem,
        field: 'name',
        originalValue: 'John',
        newValue: 'Jane',
      })
    })

    it('clears editing state after successful save', async () => {
      const onSave = vi.fn()
      const { startEdit, confirmEdit, editingCell } = useEditableCell<TestItem>({ onSave })

      startEdit(sampleItem, 'name', 'John')
      await confirmEdit()

      expect(editingCell.value).toBeNull()
    })

    it('sets saving state during save', async () => {
      let resolveSave: () => void
      const onSave = vi.fn().mockImplementation(
        () => new Promise<void>((resolve) => {
          resolveSave = resolve
        })
      )

      const { startEdit, confirmEdit, saving } = useEditableCell<TestItem>({ onSave })

      startEdit(sampleItem, 'name', 'John')
      const confirmPromise = confirmEdit()

      expect(saving.value).toBe(true)

      resolveSave!()
      await confirmPromise

      expect(saving.value).toBe(false)
    })

    it('sets error on save failure', async () => {
      const onSave = vi.fn().mockRejectedValue(new Error('Save failed'))
      const { startEdit, confirmEdit, error, editingCell } = useEditableCell<TestItem>({ onSave })

      startEdit(sampleItem, 'name', 'John')
      await confirmEdit()

      expect(error.value).toBe('Save failed')
      expect(editingCell.value).not.toBeNull() // Still editing
    })

    it('validates before saving', async () => {
      const onSave = vi.fn()
      const validate = vi.fn().mockReturnValue('Name is required')

      const { startEdit, confirmEdit, error } = useEditableCell<TestItem>({
        onSave,
        validate,
      })

      startEdit(sampleItem, 'name', 'John')
      await confirmEdit()

      expect(validate).toHaveBeenCalled()
      expect(error.value).toBe('Name is required')
      expect(onSave).not.toHaveBeenCalled()
    })

    it('saves when validation passes', async () => {
      const onSave = vi.fn()
      const validate = vi.fn().mockReturnValue(null)

      const { startEdit, confirmEdit } = useEditableCell<TestItem>({
        onSave,
        validate,
      })

      startEdit(sampleItem, 'name', 'John')
      await confirmEdit()

      expect(onSave).toHaveBeenCalled()
    })
  })

  describe('cancelEdit', () => {
    it('clears editing state', () => {
      const { startEdit, cancelEdit, editingCell, editValue } = useEditableCell<TestItem>()

      startEdit(sampleItem, 'name', 'John')
      cancelEdit()

      expect(editingCell.value).toBeNull()
      expect(editValue.value).toBeNull()
    })

    it('calls onCancel callback', () => {
      const onCancel = vi.fn()
      const { startEdit, cancelEdit } = useEditableCell<TestItem>({ onCancel })

      startEdit(sampleItem, 'name', 'John')
      cancelEdit()

      expect(onCancel).toHaveBeenCalledWith({
        item: sampleItem,
        field: 'name',
        originalValue: 'John',
      })
    })

    it('clears error', () => {
      const { startEdit, cancelEdit, error } = useEditableCell<TestItem>()

      startEdit(sampleItem, 'name', 'John')
      error.value = 'Some error'
      cancelEdit()

      expect(error.value).toBeNull()
    })
  })

  describe('editingItem', () => {
    it('returns the item being edited', () => {
      const { startEdit, editingItem } = useEditableCell<TestItem>()

      expect(editingItem.value).toBeNull()

      startEdit(sampleItem, 'name', 'John')
      expect(editingItem.value).toStrictEqual(sampleItem)
    })
  })

  describe('custom keyField', () => {
    it('uses custom key field', () => {
      interface CustomItem {
        uuid: string
        name: string
        [key: string]: unknown
      }

      const item: CustomItem = { uuid: 'abc-123', name: 'Test' }
      const { startEdit, isEditing } = useEditableCell<CustomItem>({
        keyField: 'uuid',
      })

      startEdit(item, 'name', 'Test')
      expect(isEditing('abc-123', 'name')).toBe(true)
    })
  })
})
