<script lang="ts" setup>
import { computed } from 'vue'
import type { Notification } from '@/types'
import NotificationComponent from './NotificationComponent.vue'

const props = withDefaults(
  defineProps<{
    notifications: Notification[]
    autoDismiss?: boolean
    duration?: number
    /** Position of the container */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    /** Custom top offset (e.g., '80px', '5rem') to account for fixed headers */
    topOffset?: string
  }>(),
  {
    position: 'top-right',
  },
)

const emit = defineEmits<{
  dismiss: [id: string]
}>()

const positionClasses: Record<string, string> = {
  'top-right': 'top-5 right-5',
  'top-left': 'top-5 left-5',
  'bottom-right': 'bottom-5 right-5',
  'bottom-left': 'bottom-5 left-5',
}

const isTopPosition = computed(() => props.position?.startsWith('top'))

const topStyle = computed(() => {
  if (!isTopPosition.value || !props.topOffset) return {}
  return { top: props.topOffset }
})
</script>

<template>
  <Teleport to="body">
    <div
      :class="['fixed z-50 flex flex-col gap-3 w-full max-w-sm', positionClasses[position]]"
      :style="topStyle"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-4"
      >
        <NotificationComponent
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          :auto-dismiss="autoDismiss"
          :duration="duration"
          @dismiss="emit('dismiss', $event)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
