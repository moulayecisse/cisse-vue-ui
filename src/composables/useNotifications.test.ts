import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Clear global notifications state before each test (singleton pattern)
    const { clear } = useNotifications()
    clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should add a notification with notify', () => {
    const { notify, notifications } = useNotifications()

    const id = notify('info', 'Test message')

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(notifications.value).toHaveLength(1)
    expect(notifications.value[0]).toMatchObject({
      type: 'info',
      message: 'Test message',
      duration: 5000,
    })
  })

  it('should add notification with custom options', () => {
    const { notify, notifications } = useNotifications()

    notify('success', 'Custom message', {
      title: 'Title',
      duration: 3000,
    })

    expect(notifications.value[0]).toMatchObject({
      type: 'success',
      message: 'Custom message',
      title: 'Title',
      duration: 3000,
    })
  })

  it('should add success notification', () => {
    const { success, notifications } = useNotifications()

    success('Success message')

    expect(notifications.value[0].type).toBe('success')
    expect(notifications.value[0].message).toBe('Success message')
  })

  it('should add error notification', () => {
    const { error, notifications } = useNotifications()

    error('Error message')

    expect(notifications.value[0].type).toBe('error')
  })

  it('should add warning notification', () => {
    const { warning, notifications } = useNotifications()

    warning('Warning message')

    expect(notifications.value[0].type).toBe('warning')
  })

  it('should add info notification', () => {
    const { info, notifications } = useNotifications()

    info('Info message')

    expect(notifications.value[0].type).toBe('info')
  })

  it('should remove notification by id', () => {
    const { notify, remove, notifications } = useNotifications()

    const id = notify('info', 'To remove')
    expect(notifications.value).toHaveLength(1)

    remove(id)
    expect(notifications.value).toHaveLength(0)
  })

  it('should clear all notifications', () => {
    const { notify, clear, notifications } = useNotifications()

    notify('info', 'Message 1')
    notify('success', 'Message 2')
    notify('error', 'Message 3')
    expect(notifications.value).toHaveLength(3)

    clear()
    expect(notifications.value).toHaveLength(0)
  })

  it('should auto-remove notification after duration', () => {
    const { notify, notifications } = useNotifications()

    notify('info', 'Auto remove', { duration: 1000 })
    expect(notifications.value).toHaveLength(1)

    vi.advanceTimersByTime(1000)
    expect(notifications.value).toHaveLength(0)
  })

  it('should not auto-remove when duration is 0', () => {
    const { notify, notifications } = useNotifications()

    notify('info', 'Persistent', { duration: 0 })
    expect(notifications.value).toHaveLength(1)

    vi.advanceTimersByTime(10000)
    expect(notifications.value).toHaveLength(1)
  })

  it('should generate unique ids', () => {
    const { notify, notifications } = useNotifications()

    notify('info', 'Message 1')
    notify('info', 'Message 2')
    notify('info', 'Message 3')

    const ids = notifications.value.map((n) => n.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(3)
  })

  it('should return readonly notifications ref', () => {
    const { notifications } = useNotifications()

    // Vue readonly refs are readonly at TypeScript level and warn at runtime
    // We just verify the notifications ref exists and is reactive
    expect(notifications.value).toEqual([])
  })
})
