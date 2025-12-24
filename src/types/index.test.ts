import { describe, it, expect } from 'vitest'
import type { Property } from './property'
import type { Notification, NotificationType, NotificationOptions } from './notification'

describe('Types index', () => {
  it('Property type can be used', () => {
    const prop: Property = {
      name: 'test',
      label: 'Test Label',
      type: 'text',
      sortable: true,
    }
    expect(prop.name).toBe('test')
    expect(prop.label).toBe('Test Label')
  })

  it('Notification type can be used', () => {
    const notification: Notification = {
      id: '1',
      type: 'success',
      message: 'Test message',
      title: 'Test title',
    }
    expect(notification.id).toBe('1')
    expect(notification.type).toBe('success')
  })

  it('NotificationType allows valid values', () => {
    const types: NotificationType[] = ['success', 'warning', 'error', 'info']
    expect(types).toHaveLength(4)
  })

  it('NotificationOptions can be used', () => {
    const options: NotificationOptions = {
      duration: 5000,
      title: 'Custom title',
    }
    expect(options.duration).toBe(5000)
  })
})
