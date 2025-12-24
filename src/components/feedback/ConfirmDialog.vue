<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Modal from './Modal.vue'
import Button from '@/components/core/Button.vue'

export type ConfirmDialogVariant = 'info' | 'warning' | 'danger' | 'success'

const props = withDefaults(
  defineProps<{
    /** Whether the dialog is open */
    open?: boolean
    /** Dialog title */
    title?: string
    /** Dialog message */
    message?: string
    /** Confirm button text */
    confirmText?: string
    /** Cancel button text */
    cancelText?: string
    /** Dialog variant (affects icon and confirm button color) */
    variant?: ConfirmDialogVariant
    /** Show loading state on confirm button */
    loading?: boolean
    /** Icon to display */
    icon?: string
    /** Teleport target (e.g., 'body', '#app'). Set to false to disable teleport. */
    teleport?: string | false
  }>(),
  {
    open: false,
    title: 'Confirm',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'info',
    loading: false,
    teleport: 'body',
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const variantConfig: Record<ConfirmDialogVariant, { icon: string; iconClass: string; buttonVariant: 'primary' | 'danger' | 'success' }> = {
  info: {
    icon: 'lucide:info',
    iconClass: 'text-blue-500',
    buttonVariant: 'primary',
  },
  warning: {
    icon: 'lucide:alert-triangle',
    iconClass: 'text-yellow-500',
    buttonVariant: 'primary',
  },
  danger: {
    icon: 'lucide:alert-circle',
    iconClass: 'text-red-500',
    buttonVariant: 'danger',
  },
  success: {
    icon: 'lucide:check-circle',
    iconClass: 'text-green-500',
    buttonVariant: 'success',
  },
}

const config = variantConfig[props.variant]
</script>

<template>
  <Modal
    v-if="open"
    size="sm"
    :close-on-backdrop="!loading"
    :close-on-escape="!loading"
    :teleport="teleport"
    @close="emit('cancel')"
  >
    <div class="text-center">
      <!-- Icon -->
      <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon
          :icon="icon || config.icon"
          :class="[config.iconClass, 'h-8 w-8']"
        />
      </div>

      <!-- Title -->
      <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>

      <!-- Message -->
      <p class="mb-6 text-gray-600 dark:text-gray-400">
        <slot>{{ message }}</slot>
      </p>

      <!-- Actions -->
      <div class="flex justify-center gap-3">
        <Button
          variant="outline"
          :disabled="loading"
          @click="emit('cancel')"
        >
          {{ cancelText }}
        </Button>
        <Button
          :variant="config.buttonVariant"
          :loading="loading"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
