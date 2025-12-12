import { ref, readonly } from 'vue'
import { uid } from 'uid'
import type { Notification, NotificationType, NotificationOptions } from '@/types'

// Global state (singleton pattern) - shared across all useNotifications() calls
const notifications = ref<Notification[]>([])

/**
 * Composable for managing notifications/toasts
 * Uses singleton pattern - all components share the same notifications state
 */
export function useNotifications() {

  const notify = (
    type: NotificationType,
    message: string,
    options: NotificationOptions = {},
  ): string => {
    const id = uid()
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
