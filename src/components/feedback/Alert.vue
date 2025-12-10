<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    /** Alert variant */
    variant?: AlertVariant
    /** Title text */
    title?: string
    /** Show close button */
    dismissible?: boolean
    /** Custom icon */
    icon?: string
  }>(),
  {
    variant: 'info',
  },
)

const emit = defineEmits<{
  dismiss: []
}>()

const variantStyles: Record<AlertVariant, { bg: string; border: string; icon: string; iconColor: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'lucide:info',
    iconColor: 'text-blue-500',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'lucide:check-circle',
    iconColor: 'text-green-500',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'lucide:alert-triangle',
    iconColor: 'text-yellow-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'lucide:alert-circle',
    iconColor: 'text-red-500',
  },
}

const styles = variantStyles[props.variant]
</script>

<template>
  <div
    :class="[
      'flex gap-3 rounded-lg border p-4',
      styles.bg,
      styles.border,
    ]"
    role="alert"
  >
    <Icon
      :icon="icon || styles.icon"
      :class="['size-5 shrink-0', styles.iconColor]"
    />
    <div class="flex-1">
      <h4
        v-if="title"
        class="mb-1 font-medium text-gray-900 dark:text-white"
      >
        {{ title }}
      </h4>
      <div class="text-sm text-gray-700 dark:text-gray-300">
        <slot />
      </div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      @click="emit('dismiss')"
    >
      <Icon
        icon="lucide:x"
        class="size-4"
      />
    </button>
  </div>
</template>
