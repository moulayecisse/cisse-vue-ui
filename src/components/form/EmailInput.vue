<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
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
    /** Show validation state */
    showValidation?: boolean
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
    placeholder: 'Enter email address...',
    size: 'md',
    showValidation: true,
  }
)

const modelValue = defineModel<string>({ default: '' })

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValid = computed(() => {
  if (!modelValue.value) return null
  return emailRegex.test(modelValue.value)
})

const isTouched = ref(false)

const showStatus = computed(() => {
  return props.showValidation && isTouched.value && !!modelValue.value
})

function handleBlur() {
  isTouched.value = true
}
</script>

<template>
  <InputWrapper
    icon="lucide:mail"
    :size="size"
    :disabled="disabled"
    :invalid="showStatus && isValid === false"
  >
    <template #default="{ inputClass }">
      <input
        :id="id ?? name"
        v-model="modelValue"
        type="email"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="(showStatus && isValid === false) || undefined"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :class="inputClass"
        v-bind="$attrs"
        @blur="handleBlur"
      />
    </template>
    <template #actions>
      <Icon
        v-if="showStatus && isValid"
        icon="lucide:check-circle"
        class="size-5 text-emerald-500"
      />
      <Icon
        v-else-if="showStatus && isValid === false"
        icon="lucide:alert-circle"
        class="size-5 text-red-500"
      />
    </template>
  </InputWrapper>
</template>
