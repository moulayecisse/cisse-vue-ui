<script lang="ts" setup>
import { computed } from 'vue'
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Minimum value (0-100) */
    min?: number
    /** Maximum value (0-100) */
    max?: number
    /** Decimal places */
    decimals?: number
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Required field */
    required?: boolean
    /** Aria describedby */
    describedBy?: string
  }>(),
  {
    placeholder: '0',
    size: 'md',
    min: 0,
    max: 100,
    decimals: 0,
  }
)

const modelValue = defineModel<number | null>({ default: null })

const displayValue = computed({
  get: () => (modelValue.value !== null ? modelValue.value.toString() : ''),
  set: (val: string) => {
    if (val === '') {
      modelValue.value = null
      return
    }
    const parsed = parseFloat(val)
    if (!isNaN(parsed)) {
      let clamped = parsed
      if (props.min !== undefined) clamped = Math.max(clamped, props.min)
      if (props.max !== undefined) clamped = Math.min(clamped, props.max)
      modelValue.value = clamped
    }
  },
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  displayValue.value = target.value
}
</script>

<template>
  <InputWrapper
    :size="size"
    :disabled="disabled"
  >
    <template #default="{ inputClass }">
      <input
        :id="id ?? name"
        :value="displayValue"
        type="number"
        inputmode="decimal"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="decimals > 0 ? Math.pow(10, -decimals) : 1"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :class="[inputClass, 'text-right pr-10']"
        @input="handleInput"
      />
    </template>
    <template #actions>
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">%</span>
    </template>
  </InputWrapper>
</template>
