<script lang="ts" setup>
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    /** Section title */
    title: string
    /** Section subtitle/description */
    subtitle?: string
    /** Icon name (iconify format) */
    icon?: string
    /** Icon color scheme */
    iconColor?: 'primary' | 'gray' | 'success' | 'warning' | 'danger'
    /** Show border around section */
    bordered?: boolean
    /** Collapsible section */
    collapsible?: boolean
    /** Initially collapsed (only when collapsible) */
    collapsed?: boolean
  }>(),
  {
    iconColor: 'primary',
    bordered: true,
    collapsible: false,
    collapsed: false,
  }
)

const isCollapsed = defineModel<boolean>('collapsed', { default: false })

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-slate-800 rounded-2xl overflow-hidden',
      bordered && 'border border-gray-100 dark:border-slate-700 shadow-sm',
    ]"
  >
    <!-- Header -->
    <div
      :class="[
        'p-5 border-b border-gray-100 dark:border-slate-700 bg-linear-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-800',
        collapsible && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors',
      ]"
      @click="collapsible && toggleCollapse()"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Icon -->
          <div
            v-if="icon"
            :class="[
              'size-10 rounded-xl flex items-center justify-center',
              iconColor === 'primary' && 'bg-primary-100 dark:bg-primary-900/30',
              iconColor === 'gray' && 'bg-gray-100 dark:bg-slate-700',
              iconColor === 'success' && 'bg-emerald-100 dark:bg-emerald-900/30',
              iconColor === 'warning' && 'bg-amber-100 dark:bg-amber-900/30',
              iconColor === 'danger' && 'bg-red-100 dark:bg-red-900/30',
            ]"
          >
            <Icon
              :icon="icon"
              :class="[
                'size-5',
                iconColor === 'primary' && 'text-primary-600 dark:text-primary-400',
                iconColor === 'gray' && 'text-gray-600 dark:text-gray-400',
                iconColor === 'success' && 'text-emerald-600 dark:text-emerald-400',
                iconColor === 'warning' && 'text-amber-600 dark:text-amber-400',
                iconColor === 'danger' && 'text-red-600 dark:text-red-400',
              ]"
            />
          </div>

          <!-- Title & Subtitle -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              <slot name="title">{{ title }}</slot>
            </h2>
            <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400">
              <slot name="subtitle">{{ subtitle }}</slot>
            </p>
          </div>
        </div>

        <!-- Collapse toggle -->
        <button
          v-if="collapsible"
          type="button"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          @click.stop="toggleCollapse"
        >
          <Icon
            icon="heroicons:chevron-down"
            :class="[
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              isCollapsed && '-rotate-90',
            ]"
          />
        </button>

        <!-- Header actions slot -->
        <slot name="header-actions" />
      </div>
    </div>

    <!-- Content -->
    <div
      v-show="!isCollapsed"
      class="p-5 sm:p-6"
    >
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      v-show="!isCollapsed"
      class="px-5 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
