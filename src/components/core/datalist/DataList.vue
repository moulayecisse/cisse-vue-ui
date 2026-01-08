<script lang="ts" setup>
import DataListItem from './DataListItem.vue'

export interface DataListItemData {
  /** Label text */
  label: string
  /** Value text */
  value: string
}

export type DataListSize = 'sm' | 'md' | 'lg'
export type DataListVariant = 'default' | 'striped' | 'bordered'

const props = withDefaults(
  defineProps<{
    /** Array of items to render (alternative to using slots) */
    items?: DataListItemData[]
    /** Size variant */
    size?: DataListSize
    /** Visual variant */
    variant?: DataListVariant
    /** Custom class */
    class?: string
  }>(),
  {
    items: () => [],
    size: 'md',
    variant: 'default',
  }
)

const variantClasses = {
  default: 'divide-y divide-gray-100 dark:divide-gray-800',
  striped: '',
  bordered: 'divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
}
</script>

<template>
  <dl
    :class="[
      variantClasses[variant],
      props.class,
    ]"
  >
    <slot>
      <DataListItem
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :value="item.value"
        :size="size"
        :striped="variant === 'striped'"
      />
    </slot>
  </dl>
</template>
