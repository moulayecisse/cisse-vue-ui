<script lang="ts" setup>
import { computed, resolveComponent, ref, useSlots } from 'vue'
import { Icon } from '@iconify/vue'
import { useDropdown } from '@/composables/useDropdown'
import type { MenuItemProps } from '@/types'

const props = withDefaults(
  defineProps<{
    menuItem: MenuItemProps
    /** Whether sidebar is expanded (shows labels) */
    expanded?: boolean
    /** Override active state directly */
    active?: boolean
    /** Current route path (pass from parent using useRoute().path) */
    currentPath?: string
    /** Nesting depth level (used internally for indentation) */
    depth?: number
    /** Custom class for the label element (overrides menuItem.labelClass) */
    labelClass?: string
    /** Custom class for the icon element (overrides menuItem.iconClass) */
    iconClass?: string
    /** Custom class for the menu item wrapper/link (overrides menuItem.itemClass) */
    itemClass?: string
    /** Custom class applied when item is active (overrides menuItem.activeClass) */
    activeClass?: string
  }>(),
  {
    expanded: true,
    active: undefined,
    currentPath: undefined,
    depth: 0,
    labelClass: undefined,
    iconClass: undefined,
    itemClass: undefined,
    activeClass: undefined,
  },
)

// Resolved classes (props take precedence over menuItem)
const resolvedLabelClass = computed(() => props.labelClass ?? props.menuItem.labelClass)
const resolvedIconClass = computed(() => props.iconClass ?? props.menuItem.iconClass)
const resolvedItemClass = computed(() => props.itemClass ?? props.menuItem.itemClass)
const resolvedActiveClass = computed(() => props.activeClass ?? props.menuItem.activeClass)

const slots = useSlots() as { submenu?: () => unknown }
const submenuOpen = ref(false)

// Flyout popover for compacted mode
const triggerRef = ref<HTMLElement>()
const flyoutRef = ref<HTMLElement>()
const { isOpen: flyoutOpen, dropdownStyle, open: openFlyout, close: closeFlyout } = useDropdown(
  triggerRef,
  flyoutRef,
  {
    teleport: true,
    gap: 8,
    placement: 'right-start',
  },
)

const hasSlotContent = computed(() => !!slots.submenu)

const hasChildren = computed(() => {
  return props.menuItem.children && props.menuItem.children.length > 0
})

const hasSubmenu = computed(() => hasChildren.value || hasSlotContent.value)

const isRouteActive = computed(() => {
  // If active prop is explicitly set, use it
  if (props.active !== undefined) {
    return props.active
  }

  // Use currentPath prop if provided, otherwise fall back to window.location
  const path = props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')

  if (props.menuItem.link === '/') {
    return path === '/'
  }
  return path === props.menuItem.link || path.startsWith(props.menuItem.link + '/')
})

// Check if any child is active (to highlight parent)
const isChildActive = computed(() => {
  if (!hasChildren.value) return false

  const path = props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')

  const checkActive = (items: MenuItemProps[]): boolean => {
    return items.some((item) => {
      if (item.link === path || path.startsWith(item.link + '/')) {
        return true
      }
      if (item.children) {
        return checkActive(item.children)
      }
      return false
    })
  }

  return checkActive(props.menuItem.children!)
})

// Try to resolve RouterLink, fallback to 'a' tag
const linkComponent = computed(() => {
  if (hasSubmenu.value) {
    return 'button'
  }
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

const linkProps = computed(() => {
  if (hasSubmenu.value) {
    return { type: 'button' as const }
  }
  if (linkComponent.value === 'a') {
    return { href: props.menuItem.link }
  }
  return { to: props.menuItem.link }
})

const toggleSubmenu = () => {
  if (hasSubmenu.value) {
    submenuOpen.value = !submenuOpen.value
  }
}

const paddingLeft = computed(() => {
  if (!props.expanded) return undefined
  const basePadding = 20 // px-5 = 20px
  const indentPerLevel = 16 // 16px per nesting level
  return `${basePadding + props.depth * indentPerLevel}px`
})

// Helper functions for flyout child items
const childLinkComponent = (child: MenuItemProps) => {
  if (child.children && child.children.length > 0) {
    return 'button'
  }
  try {
    const RouterLink = resolveComponent('RouterLink')
    if (typeof RouterLink !== 'string') {
      return RouterLink
    }
  } catch {
    // RouterLink not available
  }
  return 'a'
}

const childLinkProps = (child: MenuItemProps) => {
  if (child.children && child.children.length > 0) {
    return { type: 'button' as const }
  }
  const component = childLinkComponent(child)
  if (component === 'a') {
    return { href: child.link }
  }
  return { to: child.link }
}

const isChildRouteActive = (child: MenuItemProps) => {
  const path = props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  if (child.link === '/') {
    return path === '/'
  }
  return path === child.link || path.startsWith(child.link + '/')
}
</script>

<template>
  <div
    class="w-full"
    @mouseenter="!expanded && hasSubmenu && openFlyout()"
    @mouseleave="!expanded && hasSubmenu && closeFlyout()"
  >
    <component
      :is="linkComponent"
      ref="triggerRef"
      v-bind="linkProps"
      :class="[
        expanded ? 'flex-row' : 'flex-col',
        resolvedItemClass,
      ]"
      :style="expanded ? { paddingLeft } : undefined"
      class="group relative flex w-full items-center justify-center gap-2 pr-5 py-2"
      @click="toggleSubmenu"
    >
      <div class="relative">
        <Icon
          :class="[
            resolvedIconClass
              ? resolvedIconClass
              : isRouteActive || isChildActive
                ? (resolvedActiveClass ?? 'text-white')
                : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500',
            expanded ? 'size-5' : 'size-8',
          ]"
          class="transition-all duration-300"
          :icon="menuItem.icon"
        />

        <span
          v-if="menuItem.notification"
          class="absolute top-0.25 right-0.25 size-1.5 rounded-full bg-red-600"
        />
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-2"
      >
        <span
          v-if="expanded"
          :class="
            resolvedLabelClass
              ? resolvedLabelClass
              : isRouteActive || isChildActive
                ? (resolvedActiveClass ?? 'text-white')
                : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500'
          "
          class="flex-1 text-left text-sm font-semibold whitespace-nowrap"
        >{{ menuItem.label }}</span>
      </Transition>

      <!-- Chevron for submenu -->
      <Icon
        v-if="hasSubmenu && expanded"
        :class="[
          submenuOpen ? 'rotate-90' : '',
          resolvedIconClass
            ? resolvedIconClass
            : isRouteActive || isChildActive
              ? (resolvedActiveClass ?? 'text-white')
              : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500',
        ]"
        class="size-4 transition-transform duration-200"
        icon="lucide:chevron-right"
      />
    </component>

    <!-- Submenu content (expanded mode - inline) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="hasSubmenu && submenuOpen && expanded"
        class="overflow-hidden"
      >
        <!-- Slot for custom submenu content -->
        <slot
          name="submenu"
          :depth="depth + 1"
          :expanded="expanded"
          :current-path="currentPath"
        />

        <!-- Default children from prop -->
        <MenuItem
          v-for="(child, index) in menuItem.children"
          :key="index"
          :menu-item="child"
          :expanded="expanded"
          :current-path="currentPath"
          :depth="depth + 1"
          :label-class="labelClass"
          :icon-class="iconClass"
          :item-class="itemClass"
          :active-class="activeClass"
        />
      </div>
    </Transition>

    <!-- Flyout submenu (compacted mode - popover) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="hasSubmenu && flyoutOpen && !expanded"
          ref="flyoutRef"
          :style="dropdownStyle"
          class="z-9999 min-w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          @mouseenter="openFlyout()"
          @mouseleave="closeFlyout()"
        >
          <!-- Label header -->
          <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
            {{ menuItem.label }}
          </div>

          <!-- Slot for custom submenu content -->
          <slot
            name="submenu"
            :depth="0"
            :expanded="true"
            :current-path="currentPath"
          />

          <!-- Default children from prop -->
          <template v-if="menuItem.children">
            <component
              :is="childLinkComponent(child)"
              v-for="(child, index) in menuItem.children"
              :key="index"
              v-bind="childLinkProps(child)"
              :class="[
                'flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                child.itemClass ?? itemClass,
                isChildRouteActive(child)
                  ? (child.activeClass ?? activeClass ?? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400')
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
              ]"
              @click="closeFlyout()"
            >
              <Icon
                :icon="child.icon"
                :class="child.iconClass ?? iconClass ?? 'size-4'"
              />
              <span :class="child.labelClass ?? labelClass">{{ child.label }}</span>
            </component>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
