<script lang="ts" setup>
import { ref, computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'
import MenuItem from '@/components/core/MenuItem.vue'
import Dropdown from '@/components/core/Dropdown.vue'
import type { MenuItemProps } from '@/types'

export interface UserMenuItem {
  label: string
  icon?: string
  link?: string
  action?: () => void
}

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
    /** Current route path for menu active state (pass useRoute().path) */
    currentPath?: string
    /** User display name */
    userName?: string
    /** User avatar (initials or image URL) */
    userAvatar?: string
    /** User menu items (dropdown) */
    userMenuItems?: UserMenuItem[]
  }>(),
  {
    menuItems: () => [],
    appName: 'App',
    appIcon: 'lucide:box',
    sidebarOpen: true,
    dark: false,
    showDarkToggle: true,
    sidebarClass: 'bg-[#172b4c] dark:bg-slate-950',
    currentPath: undefined,
    userName: undefined,
    userAvatar: undefined,
    userMenuItems: () => [],
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

// Try to resolve RouterLink
const routerLinkComponent = computed(() => {
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
  if (routerLinkComponent.value === 'a') {
    return { href: link }
  }
  return { to: link }
}

const handleUserMenuClick = (item: UserMenuItem) => {
  if (item.action) {
    item.action()
  }
}
</script>

<template>
  <div class="font-inter relative flex h-dvh overflow-hidden bg-gray-100 dark:bg-slate-900">
    <!-- Backdrop for mobile -->
    <div
      v-if="sidebarOpenModel"
      class="absolute z-40 h-full w-full bg-slate-950/20 lg:hidden dark:bg-white/20"
      @click="sidebarOpenModel = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        sidebarOpenModel ? 'lg:w-60' : 'max-lg:-translate-x-76 lg:w-16',
        sidebarClass,
      ]"
      class="@container max-lg:absolute max-lg:z-50 flex h-full w-76 flex-col justify-between gap-10 transition-all duration-1000 ease-in-out"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center px-3">
        <div class="flex flex-1 items-center justify-center gap-3">
          <slot name="logo">
            <div
              class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-white/20"
            >
              <Icon
                class="size-5 text-white"
                :icon="appIcon"
              />
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
          <Icon
            class="size-6 text-white"
            icon="lucide:menu"
          />
        </button>
      </div>

      <!-- Menu Items -->
      <div
        :class="sidebarOpenModel ? 'items-start' : 'items-center'"
        class="flex flex-1 flex-col gap-8 px-2 lg:justify-center"
      >
        <slot
          name="menu"
          :current-path="currentPath"
        >
          <MenuItem
            v-for="(item, index) in menuItems"
            :key="index"
            :menu-item="item"
            :expanded="sidebarOpenModel"
            :current-path="currentPath"
          />
        </slot>
      </div>

      <!-- Sidebar Footer -->
      <div class="flex flex-col gap-3 px-3 pb-3">
        <slot name="sidebar-footer" />
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col min-w-0">
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

          <!-- User Menu -->
          <Dropdown
            v-if="userName || userAvatar"
            align="right"
          >
            <template #trigger>
              <button
                class="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div
                  class="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white"
                >
                  {{ userAvatar || '?' }}
                </div>
                <span class="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">
                  {{ userName }}
                </span>
                <Icon
                  icon="lucide:chevron-down"
                  class="size-4 text-gray-500"
                />
              </button>
            </template>

            <template #default="{ close }">
              <div class="min-w-48 py-1">
                <component
                  :is="item.link ? routerLinkComponent : 'button'"
                  v-for="item in userMenuItems"
                  :key="item.label"
                  v-bind="item.link ? getLinkProps(item.link) : {}"
                  class="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  @click="handleUserMenuClick(item); close()"
                >
                  <Icon
                    v-if="item.icon"
                    :icon="item.icon"
                    class="size-4"
                  />
                  {{ item.label }}
                </component>
              </div>
            </template>
          </Dropdown>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main class="container mx-auto flex flex-1 flex-col gap-5 p-5 max-w-full">
          <slot>
            <component
              :is="routerViewComponent"
              v-if="routerViewComponent"
            />
          </slot>
        </main>
      </div>
    </div>
  </div>
</template>
