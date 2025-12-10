<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'

export interface Breadcrumb {
  label: string
  link: string
}

defineProps<{
  /** Page title */
  title?: string
  /** Page description */
  description?: string
  /** Breadcrumb navigation items */
  breadcrumbs?: Breadcrumb[]
}>()

// Try to resolve RouterLink
const linkComponent = computed(() => {
  try {
    const RouterLink = resolveComponent('RouterLink')
    if (typeof RouterLink !== 'string') {
      return RouterLink
    }
  } catch {
    // RouterLink not available
  }
  return 'a'
})

const getLinkProps = (link: string) => {
  if (linkComponent.value === 'a') {
    return { href: link }
  }
  return { to: link }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <nav
      v-if="breadcrumbs && breadcrumbs.length > 0"
      aria-label="Breadcrumb"
    >
      <ol class="flex items-center">
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="flex items-center"
        >
          <span
            v-if="index > 0"
            class="mx-3 text-sm font-semibold text-gray-400 dark:text-gray-600"
          >
            /
          </span>

          <slot
            name="breadcrumb"
            :breadcrumb="breadcrumb"
            :index="index"
            :is-last="index === breadcrumbs.length - 1"
          >
            <component
              :is="linkComponent"
              v-bind="getLinkProps(breadcrumb.link)"
              :class="[
                'text-sm transition-colors',
                index < breadcrumbs.length - 1
                  ? 'font-semibold text-gray-900 hover:text-primary/90 hover:underline dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-600',
              ]"
            >
              {{ breadcrumb.label }}
            </component>
          </slot>
        </li>
      </ol>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col gap-1">
        <h1
          v-if="title"
          class="text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <p
          v-if="description"
          class="text-sm text-gray-600 dark:text-gray-400"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- Page Content -->
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
