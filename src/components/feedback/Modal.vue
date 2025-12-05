<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted } from 'vue'
import type { ModalSize } from '@/types'

const {
  title = '',
  size = 'default',
  closeOnBackdrop = true,
  closeOnEscape = true,
  closeButtonLabel = 'Close',
} = defineProps<{
  title?: string
  size?: ModalSize
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  closeButtonLabel?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  default: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full mx-4',
}

const handleBackdropClick = () => {
  if (closeOnBackdrop) {
    emit('close')
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && closeOnEscape) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="handleBackdropClick"
  >
    <div
      :class="sizeClasses[size]"
      class="flex max-h-[90vh] w-full flex-col rounded-lg bg-white shadow-xl dark:bg-gray-900"
    >
      <!-- Header -->
      <div
        v-if="title || $slots.header || $slots.title"
        class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          <slot name="header">
            <slot name="title">
              {{ title }}
            </slot>
          </slot>
        </h3>
        <button
          class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          type="button"
          @click="emit('close')"
        >
          <Icon class="h-5 w-5" icon="lucide:x" />
          <span class="sr-only">{{ closeButtonLabel }}</span>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <slot />
      </div>

      <!-- Footer -->
      <div
        v-if="$slots.footer"
        class="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
