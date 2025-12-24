<script lang="ts" setup>
import { computed } from 'vue'
import type { FormGroupProps } from '@/types'
import { useId } from '@/composables/useId'
import FormLabel from './FormLabel.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormHelp from './FormHelp.vue'

const props = withDefaults(defineProps<FormGroupProps>(), {
  cols: 6,
})

const modelValue = defineModel()

// Generate unique IDs for accessibility
const { id: generatedId, related } = useId({ prefix: 'field', id: props.id })
const inputId = computed(() => props.id ?? props.name ?? generatedId.value)
const helpId = computed(() => related('help'))

const computedCols = computed(() => `span ${props.cols} / span ${props.cols}`)

const isSelect = computed(() => props.select === true)

// Determine if we should link to error message
const hasError = computed(() => props.error && typeof props.error === 'string')
</script>

<template>
  <div
    :style="{ gridColumn: computedCols }"
    :hidden="hidden"
  >
    <slot>
      <slot name="label">
        <FormLabel
          v-if="label"
          :html-for="inputId"
          :error="error"
        >
          {{ label }}
        </FormLabel>
      </slot>

      <slot name="input">
        <FormSelect
          v-if="isSelect"
          v-model="modelValue"
          v-bind="{ ...$attrs, ...$props }"
          :id="inputId"
          :invalid="Boolean(error)"
          :described-by="hasError ? helpId : undefined"
        />
        <FormInput
          v-else
          v-model="modelValue"
          v-bind="{ ...$attrs, ...$props }"
          :id="inputId"
          :invalid="Boolean(error)"
          :described-by="hasError ? helpId : undefined"
        />
      </slot>

      <FormHelp
        v-if="hasError"
        :id="helpId"
        :error="true"
      >
        {{ error }}
      </FormHelp>
    </slot>
  </div>
</template>
