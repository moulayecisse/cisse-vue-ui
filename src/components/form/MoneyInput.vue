<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { computed, ref, watch } from 'vue'
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

export type Currency = 'EUR' | 'USD' | 'GBP' | 'XOF' | 'MAD' | 'CHF' | 'CAD'

const currencyConfig: Record<Currency, { symbol: string; locale: string; position: 'prefix' | 'suffix' }> = {
  EUR: { symbol: '€', locale: 'fr-FR', position: 'suffix' },
  USD: { symbol: '$', locale: 'en-US', position: 'prefix' },
  GBP: { symbol: '£', locale: 'en-GB', position: 'prefix' },
  XOF: { symbol: 'CFA', locale: 'fr-FR', position: 'suffix' },
  MAD: { symbol: 'DH', locale: 'fr-MA', position: 'suffix' },
  CHF: { symbol: 'CHF', locale: 'fr-CH', position: 'suffix' },
  CAD: { symbol: 'CA$', locale: 'en-CA', position: 'prefix' },
}

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Currency code */
    currency?: Currency
    /** Minimum value */
    min?: number
    /** Maximum value */
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
    placeholder: '0.00',
    size: 'md',
    currency: 'EUR',
    decimals: 2,
  }
)

const modelValue = defineModel<number | null>({ default: null })

const config = computed(() => currencyConfig[props.currency])

const displayValue = ref('')

// Format number for display
function formatForDisplay(value: number | null): string {
  if (value === null) return ''
  return value.toLocaleString(config.value.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  })
}

// Parse display value to number
function parseDisplayValue(value: string): number | null {
  if (!value) return null
  // Remove formatting characters (spaces, commas as thousand separators)
  const cleaned = value.replace(/\s/g, '').replace(/,/g, '.')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? null : parsed
}

// Sync display value with model
watch(
  () => modelValue.value,
  (newValue) => {
    displayValue.value = formatForDisplay(newValue)
  },
  { immediate: true }
)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  displayValue.value = target.value
}

function handleBlur() {
  const parsed = parseDisplayValue(displayValue.value)

  if (parsed !== null) {
    let clampedValue = parsed
    if (props.min !== undefined) clampedValue = Math.max(clampedValue, props.min)
    if (props.max !== undefined) clampedValue = Math.min(clampedValue, props.max)
    modelValue.value = clampedValue
    displayValue.value = formatForDisplay(clampedValue)
  } else {
    modelValue.value = null
    displayValue.value = ''
  }
}
</script>

<template>
  <InputWrapper
    :size="size"
    :disabled="disabled"
  >
    <template v-if="config.position === 'prefix'" #icon>
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ config.symbol }}
      </span>
    </template>
    <template #default="{ inputClass }">
      <input
        :id="id ?? name"
        :value="displayValue"
        type="text"
        inputmode="decimal"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :class="[inputClass, 'text-right']"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
      />
    </template>
    <template v-if="config.position === 'suffix'" #actions>
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ config.symbol }}
      </span>
    </template>
  </InputWrapper>
</template>
