<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Button from '../core/Button.vue'

withDefaults(
  defineProps<{
    /** Submit button label */
    submitLabel?: string
    /** Cancel button label */
    cancelLabel?: string
    /** Submit button icon */
    submitIcon?: string
    /** Cancel button icon */
    cancelIcon?: string
    /** Loading state */
    loading?: boolean
    /** Loading label */
    loadingLabel?: string
    /** Disable submit button */
    disabled?: boolean
    /** Show cancel button */
    showCancel?: boolean
    /** Alignment */
    align?: 'left' | 'center' | 'right' | 'stretch'
    /** Stack buttons on mobile */
    stackOnMobile?: boolean
    /** Submit button variant */
    submitVariant?: 'primary' | 'success' | 'danger'
  }>(),
  {
    submitLabel: 'Enregistrer',
    cancelLabel: 'Annuler',
    submitIcon: 'heroicons:check',
    cancelIcon: 'heroicons:x-mark',
    showCancel: true,
    align: 'right',
    stackOnMobile: false,
    submitVariant: 'primary',
  }
)

const emit = defineEmits<{
  submit: []
  cancel: []
}>()
</script>

<template>
  <div
    :class="[
      'flex gap-3 pt-2',
      align === 'left' && 'justify-start',
      align === 'center' && 'justify-center',
      align === 'right' && 'justify-end',
      align === 'stretch' && '[&>*]:flex-1',
      stackOnMobile && 'flex-col sm:flex-row',
    ]"
  >
    <!-- Cancel button -->
    <Button
      v-if="showCancel"
      type="button"
      variant="outline"
      :disabled="loading"
      :class="[
        stackOnMobile && 'order-2 sm:order-1',
      ]"
      @click="emit('cancel')"
    >
      <Icon v-if="cancelIcon" :icon="cancelIcon" class="w-5 h-5" />
      {{ cancelLabel }}
    </Button>

    <!-- Submit button -->
    <Button
      type="submit"
      :variant="submitVariant"
      :disabled="disabled || loading"
      :loading="loading"
      :class="[
        stackOnMobile && 'order-1 sm:order-2',
      ]"
      @click="emit('submit')"
    >
      <template v-if="!loading">
        <Icon v-if="submitIcon" :icon="submitIcon" class="w-5 h-5" />
        {{ submitLabel }}
      </template>
      <span v-else>{{ loadingLabel || submitLabel + '...' }}</span>
    </Button>

    <!-- Extra actions slot -->
    <slot name="extra" />
  </div>
</template>
