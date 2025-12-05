<script lang="ts" setup>
import type { Property } from '@/types'
import TextType from '@/components/type/TextType.vue'
import NumberType from '@/components/type/NumberType.vue'
import DateType from '@/components/type/DateType.vue'
import BooleanType from '@/components/type/BooleanType.vue'
import BadgeType from '@/components/type/BadgeType.vue'
import { computed, type Component } from 'vue'

const { properties, items } = defineProps<{
  properties: Property[]
  items: { id: number | string; [key: string]: unknown }[]
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
const visibleProperties = computed(() => properties.filter((p) => !p.hidden))

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
</script>

<template>
  <table class="w-full divide-y divide-gray-300 text-left dark:divide-gray-700">
    <thead
      class="bg-gray-100 text-sm font-semibold text-gray-600 uppercase dark:bg-gray-800 dark:text-gray-400"
    >
      <tr>
        <th
          v-for="property in visibleProperties"
          :key="property.name"
          :class="[getAlignmentClass(property.align), 'px-3 py-3']"
        >
          <slot :name="'header-' + property.name" :property>
            {{ property.label ?? property.name }}
          </slot>
        </th>

        <th class="px-3 py-3 text-right"></th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-300 font-medium dark:divide-gray-700">
      <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
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

        <td class="flex items-center justify-end gap-2 px-3 py-4">
          <slot :item="item" name="action"></slot>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty state -->
  <div v-if="!items || items.length === 0">
    <slot name="empty"></slot>
  </div>
</template>
