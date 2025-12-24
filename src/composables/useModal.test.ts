import { describe, it, expect, vi } from 'vitest'
import { useModal, useModals } from './useModal'

describe('useModal', () => {
  it('returns isOpen, data, open, close, and toggle', () => {
    const modal = useModal()

    expect(modal.isOpen).toBeDefined()
    expect(modal.data).toBeDefined()
    expect(typeof modal.open).toBe('function')
    expect(typeof modal.close).toBe('function')
    expect(typeof modal.toggle).toBe('function')
  })

  it('starts closed by default', () => {
    const modal = useModal()
    expect(modal.isOpen.value).toBe(false)
  })

  it('starts with null data by default', () => {
    const modal = useModal()
    expect(modal.data.value).toBeNull()
  })

  it('respects initialOpen option', () => {
    const modal = useModal({ initialOpen: true })
    expect(modal.isOpen.value).toBe(true)
  })

  it('respects initialData option', () => {
    const modal = useModal({ initialData: { id: 1, name: 'Test' } })
    expect(modal.data.value).toEqual({ id: 1, name: 'Test' })
  })

  describe('open()', () => {
    it('opens the modal', () => {
      const modal = useModal()
      modal.open()
      expect(modal.isOpen.value).toBe(true)
    })

    it('sets data when provided', () => {
      const modal = useModal<{ id: number }>()
      modal.open({ id: 42 })
      expect(modal.data.value).toEqual({ id: 42 })
    })

    it('sets data to null when not provided', () => {
      const modal = useModal<{ id: number }>({ initialData: { id: 1 } })
      modal.open()
      expect(modal.data.value).toBeNull()
    })

    it('calls onOpen callback with data', () => {
      const onOpen = vi.fn()
      const modal = useModal({ onOpen })

      modal.open({ test: 'value' })

      expect(onOpen).toHaveBeenCalledWith({ test: 'value' })
    })
  })

  describe('close()', () => {
    it('closes the modal', () => {
      const modal = useModal({ initialOpen: true })
      modal.close()
      expect(modal.isOpen.value).toBe(false)
    })

    it('clears data', () => {
      const modal = useModal<{ id: number }>()
      modal.open({ id: 42 })
      expect(modal.data.value).toEqual({ id: 42 })

      modal.close()
      expect(modal.data.value).toBeNull()
    })

    it('calls onClose callback', () => {
      const onClose = vi.fn()
      const modal = useModal({ initialOpen: true, onClose })

      modal.close()

      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('toggle()', () => {
    it('opens when closed', () => {
      const modal = useModal()
      expect(modal.isOpen.value).toBe(false)

      modal.toggle()
      expect(modal.isOpen.value).toBe(true)
    })

    it('closes when open', () => {
      const modal = useModal({ initialOpen: true })
      expect(modal.isOpen.value).toBe(true)

      modal.toggle()
      expect(modal.isOpen.value).toBe(false)
    })

    it('clears data when closing', () => {
      const modal = useModal<{ id: number }>()
      modal.open({ id: 42 })
      expect(modal.data.value).toEqual({ id: 42 })

      modal.toggle() // closes
      expect(modal.data.value).toBeNull()
    })
  })

  describe('typed modals', () => {
    interface User {
      id: number
      name: string
      email: string
    }

    it('works with typed data', () => {
      const modal = useModal<User>()

      modal.open({ id: 1, name: 'John', email: 'john@example.com' })

      expect(modal.data.value).toEqual({
        id: 1,
        name: 'John',
        email: 'john@example.com',
      })
    })
  })
})

describe('useModals', () => {
  it('returns the same modals object', () => {
    const createModal = useModal()
    const editModal = useModal<{ id: number }>()
    const deleteModal = useModal<{ id: number }>()

    const modals = useModals({
      create: createModal,
      edit: editModal,
      delete: deleteModal,
    })

    expect(modals.create).toBe(createModal)
    expect(modals.edit).toBe(editModal)
    expect(modals.delete).toBe(deleteModal)
  })

  it('allows accessing individual modals', () => {
    const createModal = useModal()
    const editModal = useModal<{ id: number }>()
    const modals = useModals({
      create: createModal,
      edit: editModal,
    })

    modals.create.open()
    expect(modals.create.isOpen.value).toBe(true)
    expect(modals.edit.isOpen.value).toBe(false)

    modals.edit.open({ id: 1 })
    expect(modals.edit.isOpen.value).toBe(true)
    expect(modals.edit.data.value).toEqual({ id: 1 })
  })
})
