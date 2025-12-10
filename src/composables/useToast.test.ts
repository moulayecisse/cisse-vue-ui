import { describe, it, expect, beforeEach } from 'vitest'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    // Clear toasts before each test
    const { clear } = useToast()
    clear()
  })

  it('should add a toast with default values', () => {
    const { add, toasts } = useToast()

    const id = add({ message: 'Test message' })

    expect(id).toMatch(/^toast-\d+$/)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toMatchObject({
      message: 'Test message',
      type: 'info',
      duration: 5000,
    })
  })

  it('should add a toast with custom options', () => {
    const { add, toasts } = useToast()

    add({
      message: 'Custom toast',
      type: 'success',
      title: 'Success!',
      duration: 3000,
    })

    expect(toasts.value[0]).toMatchObject({
      message: 'Custom toast',
      type: 'success',
      title: 'Success!',
      duration: 3000,
    })
  })

  it('should remove a toast by id', () => {
    const { add, remove, toasts } = useToast()

    const id = add({ message: 'To be removed' })
    expect(toasts.value).toHaveLength(1)

    remove(id)
    expect(toasts.value).toHaveLength(0)
  })

  it('should not fail when removing non-existent toast', () => {
    const { remove, toasts } = useToast()

    remove('non-existent-id')
    expect(toasts.value).toHaveLength(0)
  })

  it('should clear all toasts', () => {
    const { add, clear, toasts } = useToast()

    add({ message: 'Toast 1' })
    add({ message: 'Toast 2' })
    add({ message: 'Toast 3' })
    expect(toasts.value).toHaveLength(3)

    clear()
    expect(toasts.value).toHaveLength(0)
  })

  it('should add success toast', () => {
    const { success, toasts } = useToast()

    success('Operation successful', 'Success')

    expect(toasts.value[0]).toMatchObject({
      message: 'Operation successful',
      type: 'success',
      title: 'Success',
    })
  })

  it('should add error toast', () => {
    const { error, toasts } = useToast()

    error('Something went wrong')

    expect(toasts.value[0]).toMatchObject({
      message: 'Something went wrong',
      type: 'error',
    })
  })

  it('should add warning toast', () => {
    const { warning, toasts } = useToast()

    warning('Be careful')

    expect(toasts.value[0]).toMatchObject({
      message: 'Be careful',
      type: 'warning',
    })
  })

  it('should add info toast', () => {
    const { info, toasts } = useToast()

    info('For your information')

    expect(toasts.value[0]).toMatchObject({
      message: 'For your information',
      type: 'info',
    })
  })

  it('should generate unique ids for each toast', () => {
    const { add, toasts } = useToast()

    add({ message: 'Toast 1' })
    add({ message: 'Toast 2' })
    add({ message: 'Toast 3' })

    const ids = toasts.value.map((t) => t.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(3)
  })

  it('should share state across multiple useToast calls', () => {
    const toast1 = useToast()
    const toast2 = useToast()

    toast1.add({ message: 'From toast1' })

    expect(toast2.toasts.value).toHaveLength(1)
    expect(toast2.toasts.value[0].message).toBe('From toast1')
  })
})
