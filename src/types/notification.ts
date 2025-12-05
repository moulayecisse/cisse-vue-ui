export type NotificationType = 'success' | 'warning' | 'error' | 'info'

export interface Notification {
  id?: string
  type: NotificationType
  message: string
  title?: string | null
  duration?: number
}

export interface NotificationOptions {
  duration?: number
  title?: string
}
