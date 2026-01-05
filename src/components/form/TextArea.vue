<script setup lang="ts">
import { computed, toRef } from 'vue'
import FormLabel from './FormLabel.vue'
import FormHelp from './FormHelp.vue'
import { useInputStyles, type InputSize } from '@/composables/useInputStyles'

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
  /** Input size */
  size?: InputSize
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 3,
  resize: 'vertical',
  showCount: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const charCount = computed(() => props.modelValue?.length ?? 0)

const { inputClass } = useInputStyles({
  disabled: toRef(props, 'disabled'),
  invalid: computed(() => !!props.error),
  size: toRef(props, 'size'),
})

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
        inputClass,
        resizeClass,
        label || $slots.label ? 'mt-2' : '',
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
