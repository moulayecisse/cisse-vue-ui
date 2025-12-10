<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    /** Toast message */
    message: string
    /** Toast type */
    type?: ToastType
    /** Title (optional) */
    title?: string
    /** Show close button */
    closable?: boolean
    /** Duration in ms (0 = no auto-close) */
    duration?: number
  }>(),
  {
    type: 'info',
    closable: true,
    duration: 5000,
  },
)

const emit = defineEmits<{
  close: []
}>()

const typeConfig: Record<ToastType, { icon: string; bg: string; iconColor: string }> = {
  success: {
    icon: 'lucide:check-circle',
    bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: 'lucide:x-circle',
    bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: 'lucide:alert-triangle',
    bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: 'lucide:info',
    bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    iconColor: 'text-blue-500',
  },
}

const config = typeConfig[props.type]

// Auto-close
if (props.duration > 0) {
  setTimeout(() => {
    emit('close')
  }, props.duration)
}
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 rounded-lg border p-4 shadow-lg',
      config.bg,
    ]"
    role="alert"
  >
    <Icon :icon="config.icon" :class="['size-5 shrink-0', config.iconColor]" />
    <div class="flex-1 min-w-0">
      <p v-if="title" class="font-medium text-gray-900 dark:text-white">
        {{ title }}
      </p>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        {{ message }}
      </p>
    </div>
    <button
      v-if="closable"
      type="button"
      class="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      @click="emit('close')"
    >
      <Icon icon="lucide:x" class="size-4" />
    </button>
  </div>
</template>
