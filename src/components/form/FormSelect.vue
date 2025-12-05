<script lang="ts" setup>
import type { SelectProps, SelectOption } from '@/types'

defineProps<SelectProps>()

const modelValue = defineModel<string | number | boolean | null>()
</script>

<template>
  <select
    :id="id ?? name ?? ''"
    v-model="modelValue"
    :disabled="disabled"
    :name="name ?? ''"
    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-primary dark:focus:ring-primary dark:disabled:border-gray-800 dark:disabled:bg-gray-950 dark:disabled:text-gray-500"
    v-bind="$attrs"
  >
    <slot>
      <option v-if="placeholder" :value="null" disabled>
        {{ placeholder }}
      </option>

      <option
        v-for="option in (options ?? []).filter((el: SelectOption) => !el.hidden)"
        :key="String(option.value)"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>
