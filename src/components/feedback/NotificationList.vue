<script lang="ts" setup>
import type { Notification } from '@/types'
import NotificationComponent from './NotificationComponent.vue'

defineProps<{
  notifications: Notification[]
  autoDismiss?: boolean
  duration?: number
}>()

const emit = defineEmits<{
  dismiss: [id: string]
}>()
</script>

<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-3">
    <NotificationComponent
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      :auto-dismiss="autoDismiss"
      :duration="duration"
      @dismiss="emit('dismiss', $event)"
    />
  </div>
</template>
