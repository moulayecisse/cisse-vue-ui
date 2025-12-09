<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Checkbox from '@/components/form/Checkbox.vue'

export interface MobileListColumn {
  key: string
  label: string
  /** Hide this column on mobile */
  hideOnMobile?: boolean
  /** Mark as primary info (shown prominently) */
  primary?: boolean
  /** Mark as secondary info */
  secondary?: boolean
}

type ItemType = { id: number | string; [key: string]: unknown }

const props = withDefaults(
  defineProps<{
    /** Array of items to display */
    items: ItemType[]
    /** Key field for unique identification */
    keyField?: string
    /** Enable selection mode */
    selectable?: boolean
    /** Set of selected item keys */
    selectedItems?: Set<string>
    /** Filter function to determine if an item is selectable */
    selectableFilter?: (item: ItemType) => boolean
  }>(),
  {
    keyField: 'id',
    selectable: false,
  },
)

const emit = defineEmits<{
  /** Emitted when an item is selected/deselected */
  select: [id: string]
  /** Emitted when select all is toggled */
  selectAll: []
}>()

defineSlots<{
  /** Avatar/icon slot for each item */
  avatar?: (props: { item: ItemType }) => unknown
  /** Main content area for each item */
  content?: (props: { item: ItemType }) => unknown
  /** Actions slot (right side) for each item */
  actions?: (props: { item: ItemType }) => unknown
  /** Empty state slot */
  empty?: () => unknown
}>()

const slots = useSlots()

const getKey = (item: ItemType): string => {
  const keyValue = item[props.keyField]
  return String(keyValue ?? Math.random())
}

const selectableItems = computed(() => {
  if (!props.selectableFilter) return props.items
  return props.items.filter(props.selectableFilter)
})

const allSelected = computed(() => {
  if (selectableItems.value.length === 0) return false
  return selectableItems.value.every((item) => props.selectedItems?.has(getKey(item)))
})

const someSelected = computed(() => {
  return (props.selectedItems?.size || 0) > 0 && !allSelected.value
})

const isSelected = (item: ItemType): boolean => {
  return props.selectedItems?.has(getKey(item)) || false
}

const isSelectable = (item: ItemType): boolean => {
  if (!props.selectable) return false
  if (!props.selectableFilter) return true
  return props.selectableFilter(item)
}

const handleSelect = (item: ItemType) => {
  emit('select', getKey(item))
}

const hasEmptySlot = computed(() => !!slots.empty)
</script>

<template>
  <div class="space-y-3">
    <!-- Select All Header (when selectable) -->
    <div
      v-if="selectable && selectableItems.length > 0"
      class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
    >
      <Checkbox
        :model-value="allSelected"
        :indeterminate="someSelected"
        @update:model-value="emit('selectAll')"
      />
      <span class="text-sm text-gray-600 dark:text-gray-400">
        {{ allSelected ? 'Tout désélectionner' : 'Tout sélectionner' }}
      </span>
      <span
        v-if="selectedItems && selectedItems.size > 0"
        class="text-sm text-primary font-medium"
      >
        ({{ selectedItems.size }} sélectionné{{ selectedItems.size > 1 ? 's' : '' }})
      </span>
    </div>

    <!-- Items List -->
    <div
      v-for="item in items"
      :key="getKey(item)"
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200"
      :class="{
        'ring-2 ring-primary border-primary': isSelected(item),
      }"
    >
      <div class="p-4 flex items-center gap-4">
        <!-- Checkbox -->
        <div v-if="selectable" class="flex-shrink-0">
          <Checkbox
            v-if="isSelectable(item)"
            :model-value="isSelected(item)"
            @update:model-value="handleSelect(item)"
          />
          <div v-else class="w-5 h-5" />
        </div>

        <!-- Avatar slot -->
        <slot name="avatar" :item="item" />

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <slot name="content" :item="item" />
        </div>

        <!-- Actions -->
        <div class="flex-shrink-0">
          <slot name="actions" :item="item" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="items.length === 0 && hasEmptySlot">
      <slot name="empty" />
    </div>
  </div>
</template>
