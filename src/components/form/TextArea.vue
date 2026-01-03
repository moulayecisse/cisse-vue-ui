<script setup lang="ts">
import { computed } from 'vue'
import FormLabel from './FormLabel.vue'
import FormHelp from './FormHelp.vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 3,
  resize: 'vertical',
  showCount: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const charCount = computed(() => props.modelValue?.length ?? 0)

const resizeClass = computed(() => {
  switch (props.resize) {
    case 'none':
      return 'resize-none'
    case 'vertical':
      return 'resize-y'
    case 'horizontal':
      return 'resize-x'
    case 'both':
      return 'resize'
    default:
      return 'resize-y'
  }
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <FormLabel v-if="label || $slots.label" :error="error">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </FormLabel>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rows="rows"
      :maxlength="maxLength"
      :class="[
        'w-full px-4 py-3 rounded-xl border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        resizeClass,
        label || $slots.label ? 'mt-2' : '',
        error
          ? 'border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20'
          : 'border-gray-200 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500/20',
        disabled
          ? 'bg-gray-50 dark:bg-slate-800 text-gray-400 cursor-not-allowed'
          : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
      ]"
      @input="handleInput"
    />
    <div v-if="showCount || maxLength" class="flex justify-end mt-1">
      <span class="text-xs text-gray-400">
        {{ charCount }}<span v-if="maxLength"> / {{ maxLength }}</span>
      </span>
    </div>
    <FormHelp v-if="hint && !error">{{ hint }}</FormHelp>
    <FormHelp v-if="error" :error="true">{{ error }}</FormHelp>
  </div>
</template>
