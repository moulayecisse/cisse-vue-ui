<script lang="ts" setup>
import type { InputProps } from '@/types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const modelValue = defineModel<string>()
</script>

<template>
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
    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm user-invalid:border-red-500 user-invalid:text-red-600 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden focus:user-invalid:border-red-500 focus:user-invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-primary dark:focus:ring-primary dark:disabled:border-gray-800 dark:disabled:bg-gray-950 dark:disabled:text-gray-500"
    v-bind="$attrs"
  >
</template>
