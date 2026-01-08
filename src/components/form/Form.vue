<script lang="ts" setup>
import FormActions from './FormActions.vue'

export type FormLayout = 'vertical' | 'horizontal'

withDefaults(
  defineProps<{
    /** Form title */
    title?: string
    /** Form description */
    description?: string
    /** Layout mode */
    layout?: FormLayout
    /** Show divider between sections */
    divide?: boolean
    /** Hide footer with buttons */
    hideFooter?: boolean
    /** Submit button label */
    submitLabel?: string
    /** Cancel button label */
    cancelLabel?: string
    /** Loading state */
    loading?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Number of columns for the grid */
    cols?: number
  }>(),
  {
    layout: 'vertical',
    divide: false,
    hideFooter: false,
    submitLabel: 'Enregistrer',
    cancelLabel: 'Annuler',
    cols: 12,
  }
)

const emit = defineEmits<{
  submit: [event: Event]
  cancel: []
}>()

function handleSubmit(event: Event) {
  event.preventDefault()
  emit('submit', event)
}
</script>

<template>
  <form @submit="handleSubmit">
    <!-- Header -->
    <div v-if="title || description || $slots.header" class="pb-5 mb-5">
      <slot name="header">
        <h2
          v-if="title"
          class="text-base/7 font-semibold text-gray-900 dark:text-gray-100"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400"
        >
          {{ description }}
        </p>
      </slot>
    </div>

    <!-- Content grid -->
    <div
      :class="[
        'grid gap-6',
        layout === 'horizontal' && 'sm:grid-cols-12 gap-x-6 gap-y-8',
        layout === 'vertical' && `grid-cols-${cols}`,
        divide && 'sm:divide-y sm:divide-gray-900/10 dark:sm:divide-gray-100/10',
      ]"
      :style="layout === 'vertical' ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` } : undefined"
    >
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="!hideFooter || $slots.footer"
      class="border-t border-gray-900/10 dark:border-gray-100/10 pt-5 mt-5"
    >
      <slot name="footer">
        <FormActions
          :submit-label="submitLabel"
          :cancel-label="cancelLabel"
          :loading="loading"
          :disabled="disabled"
          @cancel="emit('cancel')"
        />
      </slot>
    </div>
  </form>
</template>
