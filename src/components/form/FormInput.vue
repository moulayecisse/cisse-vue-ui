<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import type { InputProps } from '@/types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const modelValue = defineModel<string>()

const baseInputClass = 'block w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-hidden disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:bg-slate-600 dark:disabled:bg-slate-800 dark:disabled:text-gray-500'
</script>

<template>
  <!-- With icon(s) wrapper -->
  <div v-if="props.icon || props.iconRight" class="relative">
    <!-- Left icon -->
    <Icon
      v-if="props.icon"
      :icon="props.icon"
      class="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none"
    />

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
      :class="[
        baseInputClass,
        'py-3',
        props.icon ? 'pl-10' : 'pl-4',
        props.iconRight ? 'pr-10' : 'pr-4',
      ]"
      v-bind="$attrs"
    >

    <!-- Right icon -->
    <Icon
      v-if="props.iconRight"
      :icon="props.iconRight"
      class="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none"
    />
  </div>

  <!-- Without icon (simple input) -->
  <input
    v-else
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
    :class="[baseInputClass, 'px-4 py-3']"
    v-bind="$attrs"
  >
</template>
