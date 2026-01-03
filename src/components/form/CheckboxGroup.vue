<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'
import FormLabel from './FormLabel.vue'
import FormHelp from './FormHelp.vue'

interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  modelValue?: string[]
  options: Option[]
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  columns?: 1 | 2 | 3 | 4
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  columns: 2,
  inline: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const gridClass = computed(() => {
  if (props.inline) return 'flex flex-wrap gap-4'
  switch (props.columns) {
    case 1:
      return 'grid grid-cols-1 gap-2'
    case 2:
      return 'grid grid-cols-1 sm:grid-cols-2 gap-2'
    case 3:
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'
    case 4:
      return 'grid grid-cols-2 sm:grid-cols-4 gap-2'
    default:
      return 'grid grid-cols-1 sm:grid-cols-2 gap-2'
  }
})

function isChecked(value: string): boolean {
  return props.modelValue?.includes(value) ?? false
}

function toggleValue(value: string, checked: boolean) {
  const current = props.modelValue ?? []
  if (checked) {
    if (!current.includes(value)) {
      emit('update:modelValue', [...current, value])
    }
  } else {
    emit('update:modelValue', current.filter((v) => v !== value))
  }
}
</script>

<template>
  <div>
    <FormLabel v-if="label" :error="error">
      {{ label }}<span v-if="required" class="text-red-500 ml-1">*</span>
    </FormLabel>
    <div :class="[gridClass, label ? 'mt-2' : '']">
      <Checkbox
        v-for="option in options"
        :key="option.value"
        :model-value="isChecked(option.value)"
        :label="option.label"
        :disabled="disabled || option.disabled"
        @update:model-value="(checked: boolean) => toggleValue(option.value, checked)"
      />
    </div>
    <FormHelp v-if="hint && !error">{{ hint }}</FormHelp>
    <FormHelp v-if="error" :error="true">{{ error }}</FormHelp>
  </div>
</template>
