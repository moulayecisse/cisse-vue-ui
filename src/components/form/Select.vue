<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { Icon } from '@iconify/vue'
import { useInputStyles, type InputSize } from '@/composables/useInputStyles'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Options to display */
    options?: SelectOption[]
    /** Placeholder text */
    placeholder?: string
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Disabled state */
    disabled?: boolean
    /** Required field */
    required?: boolean
    /** Invalid/error state */
    invalid?: boolean
    /** Size variant */
    size?: InputSize
    /** Custom class */
    class?: string
  }>(),
  {
    placeholder: 'Sélectionnez une option',
    size: 'md',
  }
)

const modelValue = defineModel<string | number | null>()

const hasValue = computed(() => modelValue.value !== null && modelValue.value !== '')

const { inputClass } = useInputStyles({
  disabled: toRef(props, 'disabled'),
  invalid: toRef(props, 'invalid'),
  size: toRef(props, 'size'),
  hasValue,
})

const selectClasses = computed(() => [
  ...inputClass.value,
  'appearance-none cursor-pointer pr-10',
  props.class,
])
</script>

<template>
  <div class="relative grid grid-cols-1">
    <select
      v-model="modelValue"
      :name="name"
      :id="id"
      :disabled="disabled"
      :required="required"
      :class="selectClasses"
      class="col-start-1 row-start-1"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <slot>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </slot>
    </select>
    <Icon
      icon="heroicons:chevron-down"
      class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4"
      aria-hidden="true"
    />
  </div>
</template>
