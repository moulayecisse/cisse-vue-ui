import { ref, readonly } from 'vue'
import type { Notification, NotificationType, NotificationOptions } from '@/types'

/**
 * Composable for managing notifications/toasts
 * Standalone implementation without Pinia dependency
 */
export function useNotifications() {
  const notifications = ref<Notification[]>([])
  let idCounter = 0

  const generateId = () => `notification-${++idCounter}-${Date.now()}`

  const notify = (
    type: NotificationType,
    message: string,
    options: NotificationOptions = {},
  ): string => {
    const id = generateId()
    const notification: Notification = {
      id,
      type,
      message,
      title: options.title ?? null,
      duration: options.duration ?? 5000,
    }

    notifications.value.push(notification)

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => remove(id), notification.duration)
    }

    return id
  }

  const success = (message: string, options?: NotificationOptions) =>
    notify('success', message, options)

  const warning = (message: string, options?: NotificationOptions) =>
    notify('warning', message, options)

  const error = (message: string, options?: NotificationOptions) =>
    notify('error', message, options)

  const info = (message: string, options?: NotificationOptions) =>
    notify('info', message, options)

  const remove = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const clear = () => {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    notify,
    success,
    warning,
    error,
    info,
    remove,
    clear,
  }
}
