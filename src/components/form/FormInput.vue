<script lang="ts" setup>
import InputWrapper from './InputWrapper.vue'
import type { InputProps } from '@/types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const modelValue = defineModel<string>()
</script>

<template>
  <InputWrapper
    :icon="props.icon"
    :icon-right="props.iconRight"
    :disabled="props.disabled"
    :invalid="props.invalid"
  >
    <template #default="{ inputClass }">
      <input
        :id="props.id ?? props.name ?? ''"
        v-model="modelValue"
        :disabled="props.disabled"
        :name="props.name ?? ''"
        :placeholder="props.placeholder"
        :type="props.type"
        :required="props.required"
        :aria-invalid="props.invalid || undefined"
        :aria-required="props.required || undefined"
        :aria-describedby="props.describedBy || undefined"
        :class="inputClass"
        v-bind="$attrs"
      />
    </template>
  </InputWrapper>
</template>
