<script lang="ts" setup>
import { computed } from 'vue'
import Toast from './Toast.vue'
import type { ToastType } from './Toast.vue'

export interface ToastItem {
  id: string
  message: string
  type?: ToastType
  title?: string
  duration?: number
}

const props = withDefaults(
  defineProps<{
    /** Array of toast items */
    toasts: ToastItem[]
    /** Position of the container */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
    /** Custom top offset (e.g., '80px', '5rem') to account for fixed headers */
    topOffset?: string
  }>(),
  {
    position: 'top-right',
  },
)

const emit = defineEmits<{
  close: [id: string]
}>()

const positionClasses: Record<string, string> = {
  'top-right': 'right-4',
  'top-left': 'left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

const isTopPosition = computed(() => props.position?.startsWith('top'))

const topStyle = computed(() => {
  if (!isTopPosition.value) return {}
  return { top: props.topOffset || '1rem' }
})
</script>

<template>
  <Teleport to="body">
    <div :class="['fixed z-[9999] flex flex-col gap-2 w-full max-w-sm', positionClasses[position]]" :style="topStyle">
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-4"
      >
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
          :title="toast.title"
          :duration="toast.duration"
          @close="emit('close', toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
