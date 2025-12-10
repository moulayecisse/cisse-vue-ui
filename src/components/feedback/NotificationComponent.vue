<script lang="ts" setup>
import type { Notification } from '@/types'
import { computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  notification: Notification
  autoDismiss?: boolean
  duration?: number
}>()

const emit = defineEmits<{
  dismiss: [id: string]
}>()

const iconName = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return 'lucide:check-circle'
    case 'info':
      return 'lucide:info'
    case 'warning':
      return 'lucide:alert-triangle'
    case 'error':
      return 'lucide:x-circle'
    default:
      return 'lucide:bell'
  }
})

const iconColor = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return 'text-green-600 dark:text-green-400'
    case 'info':
      return 'text-blue-600 dark:text-blue-400'
    case 'warning':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'error':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
})

const bgColor = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return 'bg-green-50 dark:bg-green-950'
    case 'info':
      return 'bg-blue-50 dark:bg-blue-950'
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-950'
    case 'error':
      return 'bg-red-50 dark:bg-red-950'
    default:
      return 'bg-gray-50 dark:bg-gray-950'
  }
})

const handleDismiss = () => {
  if (props.notification.id) {
    emit('dismiss', props.notification.id)
  }
}

onMounted(() => {
  const duration = props.notification.duration ?? props.duration ?? 5000
  if (props.autoDismiss !== false && duration > 0) {
    setTimeout(() => {
      handleDismiss()
    }, duration)
  }
})
</script>

<template>
  <div
    class="flex max-w-md items-start space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-black"
  >
    <div :class="[bgColor, 'flex items-center justify-center rounded-full p-2']">
      <Icon
        :class="iconColor"
        :icon="iconName"
        class="h-5 w-5"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <h4
        v-if="notification.title"
        class="text-sm font-semibold text-gray-900 dark:text-gray-100"
      >
        {{ notification.title }}
      </h4>
      <p
        v-if="notification.message"
        class="mt-1 text-sm text-gray-600 dark:text-gray-400"
      >
        {{ notification.message }}
      </p>
    </div>

    <button
      class="shrink-0 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
      @click="handleDismiss"
    >
      <Icon
        class="h-4 w-4"
        icon="lucide:x"
      />
    </button>
  </div>
</template>
