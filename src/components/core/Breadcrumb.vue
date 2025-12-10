<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export interface BreadcrumbItem {
  label: string
  href?: string
  to?: string | object
  icon?: string
}

withDefaults(
  defineProps<{
    /** Array of breadcrumb items */
    items: BreadcrumbItem[]
    /** Separator icon */
    separator?: string
    /** Home icon */
    homeIcon?: string
    /** Show home icon on first item */
    showHomeIcon?: boolean
  }>(),
  {
    separator: 'heroicons:chevron-right',
    homeIcon: 'heroicons:home',
    showHomeIcon: true,
  },
)

defineEmits<{
  click: [item: BreadcrumbItem, index: number]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center flex-wrap gap-1 text-sm">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
      >
        <!-- Separator -->
        <Icon
          v-if="index > 0"
          :icon="separator"
          class="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500 flex-shrink-0"
        />

        <!-- Item -->
        <component
          :is="item.to ? 'router-link' : item.href ? 'a' : 'span'"
          :to="item.to"
          :href="item.href"
          :class="[
            'flex items-center gap-1.5 transition-colors',
            index === items.length - 1
              ? 'text-gray-900 dark:text-white font-medium cursor-default'
              : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400',
          ]"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          @click="$emit('click', item, index)"
        >
          <!-- Home icon for first item -->
          <Icon
            v-if="index === 0 && showHomeIcon"
            :icon="item.icon || homeIcon"
            class="w-4 h-4"
          />
          <!-- Custom icon -->
          <Icon
            v-else-if="item.icon"
            :icon="item.icon"
            class="w-4 h-4"
          />
          <span>{{ item.label }}</span>
        </component>
      </li>
    </ol>
  </nav>
</template>
