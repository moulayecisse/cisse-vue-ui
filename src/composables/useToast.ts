import { ref } from 'vue'
import type { ToastType } from '@/components/feedback/Toast.vue'
import type { ToastItem } from '@/components/feedback/ToastContainer.vue'

export interface ToastOptions {
  message: string
  type?: ToastType
  title?: string
  duration?: number
}

const toasts = ref<ToastItem[]>([])

let toastId = 0

export function useToast() {
  const add = (options: ToastOptions): string => {
    const id = `toast-${++toastId}`
    const toast: ToastItem = {
      id,
      message: options.message,
      type: options.type || 'info',
      title: options.title,
      duration: options.duration ?? 5000,
    }
    toasts.value.push(toast)
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const success = (message: string, title?: string) => {
    return add({ message, title, type: 'success' })
  }

  const error = (message: string, title?: string) => {
    return add({ message, title, type: 'error' })
  }

  const warning = (message: string, title?: string) => {
    return add({ message, title, type: 'warning' })
  }

  const info = (message: string, title?: string) => {
    return add({ message, title, type: 'info' })
  }

  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  }
}
