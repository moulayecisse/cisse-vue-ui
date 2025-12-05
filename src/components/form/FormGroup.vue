<script lang="ts" setup>
import { computed } from 'vue'
import type { FormGroupProps } from '@/types'
import FormLabel from './FormLabel.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormHelp from './FormHelp.vue'

const props = withDefaults(defineProps<FormGroupProps>(), {
  cols: 6,
})

const modelValue = defineModel()

const computedCols = computed(() => `span ${props.cols} / span ${props.cols}`)

const isSelect = computed(() => props.type === 'select')
</script>

<template>
  <div :style="{ gridColumn: computedCols }" :hidden="hidden">
    <slot>
      <slot name="label">
        <FormLabel v-if="label" :html-for="id ?? name" :error="error">
          {{ label }}
        </FormLabel>
      </slot>

      <slot name="input">
        <FormSelect
          v-if="isSelect"
          v-model="modelValue"
          v-bind="{ ...$attrs, ...$props }"
        />
        <FormInput
          v-else
          v-model="modelValue"
          v-bind="{ ...$attrs, ...$props }"
        />
      </slot>

      <FormHelp v-if="error && typeof error === 'string'" :error="true">
        {{ error }}
      </FormHelp>
    </slot>
  </div>
</template>
