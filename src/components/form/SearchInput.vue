<script lang="ts" setup>
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Search icon (Iconify format) */
    icon?: string
    /** Disabled state */
    disabled?: boolean
    /** Input size */
    size?: InputWrapperSize
    /** Input name */
    name?: string
  }>(),
  {
    placeholder: 'Search...',
    icon: 'lucide:search',
    size: 'md',
  }
)

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <InputWrapper
    :icon="props.icon"
    :size="props.size"
    :disabled="props.disabled"
  >
    <template #default="{ inputClass }">
      <input
        v-model="modelValue"
        type="text"
        :name="props.name"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :class="inputClass"
        v-bind="$attrs"
      />
    </template>
  </InputWrapper>
</template>
