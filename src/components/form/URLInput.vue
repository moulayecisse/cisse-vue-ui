<script lang="ts" setup>
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
    placeholder: 'https://example.com',
    size: 'md',
    showValidation: true,
  }
)

const modelValue = defineModel<string>({ default: '' })

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

const isValid = computed(() => {
  if (!modelValue.value) return null
  return urlRegex.test(modelValue.value)
})

const isTouched = ref(false)

const showStatus = computed(() => {
  return props.showValidation && isTouched.value && !!modelValue.value
})

function handleBlur() {
  isTouched.value = true
}

function openUrl() {
  if (isValid.value && modelValue.value) {
    const url = modelValue.value.startsWith('http') ? modelValue.value : `https://${modelValue.value}`
    window.open(url, '_blank')
  }
}
</script>

<template>
  <InputWrapper
    icon="lucide:link"
    :size="size"
    :disabled="disabled"
    :invalid="showStatus && isValid === false"
  >
    <template #default="{ inputClass }">
      <input
        :id="id ?? name"
        v-model="modelValue"
        type="url"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="(showStatus && isValid === false) || undefined"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :class="inputClass"
        @blur="handleBlur"
      />
    </template>
    <template #actions>
      <button
        v-if="showStatus && isValid && modelValue"
        type="button"
        class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
        title="Open URL"
        @click="openUrl"
      >
        <Icon icon="lucide:external-link" class="size-4 text-gray-400 hover:text-primary-500" />
      </button>
      <Icon
        v-else-if="showStatus && isValid === false"
        icon="lucide:alert-circle"
        class="size-5 text-red-500"
      />
    </template>
  </InputWrapper>
</template>
