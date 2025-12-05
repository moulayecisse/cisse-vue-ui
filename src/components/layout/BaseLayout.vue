<script lang="ts" setup>
import { ref, computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'
import MenuItem from '@/components/core/MenuItem.vue'
import type { MenuItemProps } from '@/types'

const props = withDefaults(
  defineProps<{
    /** Menu items for the sidebar */
    menuItems?: MenuItemProps[]
    /** App/brand name displayed in sidebar */
    appName?: string
    /** App icon (iconify icon name) */
    appIcon?: string
    /** Whether sidebar is open (v-model:sidebarOpen) */
    sidebarOpen?: boolean
    /** Whether dark mode is enabled (v-model:dark) */
    dark?: boolean
    /** Show dark mode toggle in header */
    showDarkToggle?: boolean
    /** Primary color class for sidebar background */
    sidebarClass?: string
  }>(),
  {
    menuItems: () => [],
    appName: 'App',
    appIcon: 'lucide:box',
    sidebarOpen: true,
    dark: false,
    showDarkToggle: true,
    sidebarClass: 'bg-[#172b4c] dark:bg-slate-950',
  },
)

const emit = defineEmits<{
  'update:sidebarOpen': [value: boolean]
  'update:dark': [value: boolean]
}>()

const internalSidebarOpen = ref(props.sidebarOpen)
const internalDark = ref(props.dark)

const sidebarOpenModel = computed({
  get: () => props.sidebarOpen ?? internalSidebarOpen.value,
  set: (value: boolean) => {
    internalSidebarOpen.value = value
    emit('update:sidebarOpen', value)
  },
})

const darkModel = computed({
  get: () => props.dark ?? internalDark.value,
  set: (value: boolean) => {
    internalDark.value = value
    emit('update:dark', value)
  },
})

const toggleSidebar = () => {
  sidebarOpenModel.value = !sidebarOpenModel.value
}

const toggleDark = () => {
  darkModel.value = !darkModel.value
}

// Try to resolve RouterView
const routerViewComponent = computed(() => {
  try {
    const RouterView = resolveComponent('RouterView')
    if (typeof RouterView !== 'string') {
      return RouterView
    }
  } catch {
    // RouterView not available
  }
  return null
})
</script>

<template>
  <div class="font-inter relative flex h-dvh bg-gray-100 dark:bg-slate-900">
    <!-- Backdrop for mobile -->
    <div
      v-if="sidebarOpenModel"
      class="absolute z-40 h-full w-full bg-slate-950/20 lg:hidden dark:bg-white/20"
      @click="sidebarOpenModel = false"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        sidebarOpenModel ? 'lg:w-60' : '-translate-x-76 lg:w-16 lg:translate-x-0',
        sidebarClass,
      ]"
      class="@container absolute z-50 flex h-full w-76 flex-col justify-between gap-10 transition-all duration-1000 ease-in-out lg:relative"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center px-3">
        <div class="flex flex-1 items-center justify-center gap-3">
          <slot name="logo">
            <div
              class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-white/20"
            >
              <Icon class="size-5 text-white" :icon="appIcon" />
            </div>
            <span
              :class="sidebarOpenModel ? 'block' : 'hidden'"
              class="font-outfit flex-1 text-lg font-semibold text-white"
            >
              {{ appName }}
            </span>
          </slot>
        </div>

        <button
          class="rounded-lg bg-white/10 p-1 transition hover:bg-white/20 lg:hidden"
          @click="toggleSidebar"
        >
          <Icon class="size-6 text-white" icon="lucide:menu" />
        </button>
      </div>

      <!-- Menu Items -->
      <div
        :class="sidebarOpenModel ? 'items-start' : 'items-center'"
        class="flex flex-1 flex-col gap-8 px-2 lg:justify-center"
      >
        <slot name="menu">
          <MenuItem
            v-for="(item, index) in menuItems"
            :key="index"
            :menu-item="item"
            :expanded="sidebarOpenModel"
          />
        </slot>
      </div>

      <!-- Sidebar Footer -->
      <div class="flex flex-col gap-3 px-3 pb-3">
        <slot name="sidebar-footer" />
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col">
      <!-- Header -->
      <header
        class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950"
      >
        <div>
          <button
            class="rounded-lg bg-gray-100 p-1 transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
            @click="toggleSidebar"
          >
            <Icon
              class="size-6 text-gray-900 hover:text-gray-800 dark:text-gray-100"
              icon="lucide:menu"
            />
          </button>
        </div>

        <div class="flex-1">
          <slot name="header-center" />
        </div>

        <div class="flex items-center gap-3">
          <slot name="header-actions" />

          <button
            v-if="showDarkToggle"
            class="flex items-center justify-center rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
            @click="toggleDark"
          >
            <Icon
              :icon="darkModel ? 'lucide:sun' : 'lucide:moon'"
              class="size-5 text-gray-900 dark:text-gray-100"
            />
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex flex-1 flex-col overflow-y-auto">
        <main class="container mx-auto flex flex-1 flex-col gap-5 p-5">
          <slot>
            <component :is="routerViewComponent" v-if="routerViewComponent" />
          </slot>
        </main>
      </div>
    </div>
  </div>
</template>
