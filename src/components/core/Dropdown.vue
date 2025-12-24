<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDropdown } from '@/composables/useDropdown'
import { useId } from '@/composables/useId'

export interface DropdownItem {
  key: string
  label: string
  icon?: string
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Dropdown items (optional if using default slot) */
    items?: DropdownItem[]
    /** Align dropdown */
    align?: 'left' | 'right'
    /** Dropdown width */
    width?: 'auto' | 'full' | 'sm' | 'md' | 'lg'
    /** Use teleport to body to avoid overflow clipping */
    teleport?: boolean
    /** Custom ID for accessibility */
    id?: string
  }>(),
  {
    items: () => [],
    align: 'left',
    width: 'auto',
    teleport: true,
  },
)

// Generate unique IDs for accessibility
const { id: generatedId, related } = useId({ prefix: 'dropdown', id: props.id })
const triggerId = computed(() => related('trigger'))
const menuId = computed(() => related('menu'))

const emit = defineEmits<{
  select: [item: DropdownItem]
}>()

const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()

const { isOpen, dropdownStyle, toggle, close } = useDropdown(triggerRef, menuRef, {
  teleport: props.teleport,
  align: props.align,
})

const selectItem = (item: DropdownItem) => {
  if (item.disabled || item.divider) return
  emit('select', item)
  close()
}

const widthClasses = {
  auto: 'w-auto min-w-[10rem]',
  full: 'w-full',
  sm: 'w-32',
  md: 'w-48',
  lg: 'w-64',
}

const computedDropdownStyle = computed(() => {
  if (!props.teleport) return {}
  const { width: _, ...rest } = dropdownStyle.value
  return rest
})
</script>

<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      @click="toggle"
    >
      <slot name="trigger">
        <button
          :id="triggerId"
          type="button"
          :aria-expanded="isOpen"
          aria-haspopup="menu"
          :aria-controls="menuId"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <slot name="trigger-label">
            Options
          </slot>
          <Icon
            icon="lucide:chevron-down"
            :class="['size-4 transition-transform', isOpen && 'rotate-180']"
            aria-hidden="true"
          />
        </button>
      </slot>
    </div>

    <Teleport
      to="body"
      :disabled="!teleport"
    >
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          :id="menuId"
          ref="menuRef"
          role="menu"
          :aria-labelledby="triggerId"
          :style="computedDropdownStyle"
          :class="[
            'z-[9999] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800',
            widthClasses[width],
            !teleport && (align === 'right' ? 'absolute mt-2 right-0' : 'absolute mt-2 left-0'),
          ]"
        >
          <!-- Custom content via default slot -->
          <slot :close="close">
            <!-- Default items rendering -->
            <template
              v-for="item in items"
              :key="item.key"
            >
              <div
                v-if="item.divider"
                role="separator"
                class="my-1 border-t border-gray-200 dark:border-gray-700"
              />
              <button
                v-else
                type="button"
                role="menuitem"
                :disabled="item.disabled"
                :class="[
                  'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors',
                  item.disabled
                    ? 'cursor-not-allowed opacity-50'
                    : item.danger
                      ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',
                ]"
                @click="selectItem(item)"
              >
                <Icon
                  v-if="item.icon"
                  :icon="item.icon"
                  class="size-4"
                  aria-hidden="true"
                />
                {{ item.label }}
              </button>
            </template>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
