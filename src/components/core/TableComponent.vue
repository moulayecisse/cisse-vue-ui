<script lang="ts" setup>
import type { Property } from '@/types'
import TextType from '@/components/type/TextType.vue'
import NumberType from '@/components/type/NumberType.vue'
import DateType from '@/components/type/DateType.vue'
import BooleanType from '@/components/type/BooleanType.vue'
import BadgeType from '@/components/type/BadgeType.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import { computed, type Component, useSlots, type Slots } from 'vue'

type ItemType = { id: number | string; [key: string]: unknown }

const slots: Slots = useSlots()

const props = withDefaults(
  defineProps<{
    /** Column definitions */
    properties: Property[]
    /** Array of items to display */
    items: ItemType[]
    /** Enable selection mode */
    selectable?: boolean
    /** Set of selected item keys */
    selectedItems?: Set<string>
    /** Filter function to determine if an item is selectable */
    selectableFilter?: (item: ItemType) => boolean
    /** Key field for unique identification (default: 'id') */
    keyField?: string
  }>(),
  {
    selectable: false,
    keyField: 'id',
  },
)

const emit = defineEmits<{
  /** Emitted when an item is selected/deselected */
  select: [id: string]
  /** Emitted when select all is toggled */
  selectAll: []
}>()

// Type components mapping
const typeComponents: Record<string, Component> = {
  text: TextType,
  number: NumberType,
  date: DateType,
  boolean: BooleanType,
  badge: BadgeType,
}

const getTypeComponent = (type: string = 'text'): Component => {
  return typeComponents[type] || TextType
}

// Filter out hidden properties
const visibleProperties = computed(() => props.properties.filter((p) => !p.hidden))

// Get item key
const getKey = (item: ItemType): string => {
  const keyValue = item[props.keyField]
  return String(keyValue ?? Math.random())
}

// Get nested property value
const getItemValue = (item: Record<string, unknown>, property: Property): unknown => {
  if (property.name.includes('.')) {
    let value: unknown = item
    for (const key of property.name.split('.')) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key]
      } else {
        return undefined
      }
    }
    return value
  }
  return item[property.name]
}

const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
}

const getMainClass = (main?: boolean) => {
  if (main) {
    return 'text-sm font-semibold text-gray-900 dark:text-gray-100'
  }
  return 'text-xs font-medium text-gray-600 dark:text-gray-400'
}

// Selection logic
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

const hasActionSlot = computed((): boolean => !!slots.action)
</script>

<template>
  <div class="overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full divide-y divide-black/10 text-left dark:divide-white/10">
        <thead
          class="bg-black/5 text-sm font-semibold text-gray-600 uppercase dark:bg-white/5 dark:text-gray-400"
        >
          <tr>
            <!-- Selection header -->
            <th v-if="selectable" class="w-12 px-3 py-3">
              <Checkbox
                :model-value="allSelected"
                :indeterminate="someSelected"
                :disabled="selectableItems.length === 0"
                @update:model-value="emit('selectAll')"
              />
            </th>

            <th
              v-for="property in visibleProperties"
              :key="property.name"
              :class="[getAlignmentClass(property.align), 'px-3 py-3']"
            >
              <slot :name="'header-' + property.name" :property>
                {{ property.label ?? property.name }}
              </slot>
            </th>

            <th v-if="hasActionSlot" class="px-3 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-black/10 font-medium dark:divide-white/10">
          <tr
            v-for="item in items"
            :key="getKey(item)"
            class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            :class="{ 'bg-primary/5 dark:bg-primary/10': isSelected(item) }"
          >
            <!-- Selection cell -->
            <td v-if="selectable" class="px-3 py-4">
              <Checkbox
                v-if="isSelectable(item)"
                :model-value="isSelected(item)"
                @update:model-value="handleSelect(item)"
              />
            </td>

            <td
              v-for="property in visibleProperties"
              :key="property.name"
              :class="[
                getAlignmentClass(property.align),
                getMainClass(property.main),
                property.className,
                'px-3 py-4',
              ]"
            >
              <slot
                :item="item"
                :name="'item-' + property.name"
                :property
                :value="getItemValue(item, property)"
              >
                <component
                  :is="getTypeComponent(property.type || 'text')"
                  :value="getItemValue(item, property)"
                />
              </slot>
            </td>

            <td v-if="hasActionSlot" class="flex items-center justify-end gap-2 px-3 py-4">
              <slot :item="item" name="action"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    <div v-if="!items || items.length === 0">
      <slot name="empty"></slot>
    </div>
  </div>
</template>
