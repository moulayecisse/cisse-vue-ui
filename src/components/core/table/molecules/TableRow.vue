<script lang="ts" setup>
import type { Property } from '@/types'
import type { Component } from 'vue'
import Tr from '../atoms/Tr.vue'
import Td from '../atoms/Td.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import TextType from '@/components/type/TextType.vue'
import NumberType from '@/components/type/NumberType.vue'
import DateType from '@/components/type/DateType.vue'
import BooleanType from '@/components/type/BooleanType.vue'
import BadgeType from '@/components/type/BadgeType.vue'

type ItemType = { id: number | string; [key: string]: unknown }

withDefaults(
  defineProps<{
    /** The data item for this row */
    item: ItemType
    /** Column definitions */
    columns: Property[]
    /** Enable selection for this row */
    selectable?: boolean
    /** Whether this row is selected */
    selected?: boolean
    /** Whether this row can be selected */
    canSelect?: boolean
    /** Make the row clickable */
    clickable?: boolean
    /** Whether this is an even row (for striped tables) */
    even?: boolean
    /** Show action column */
    showActions?: boolean
  }>(),
  {
    selectable: false,
    selected: false,
    canSelect: true,
    clickable: false,
    even: false,
    showActions: false,
  }
)

const emit = defineEmits<{
  /** Emitted when the row checkbox is toggled */
  select: []
  /** Emitted when the row is clicked (if clickable) */
  click: [event: MouseEvent]
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
</script>

<template>
  <Tr
    :selected="selected"
    :clickable="clickable"
    :even="even"
    @click="(e) => emit('click', e)"
  >
    <!-- Selection cell -->
    <Td
      v-if="selectable"
      width="48px"
    >
      <Checkbox
        v-if="canSelect"
        :model-value="selected"
        @update:model-value="emit('select')"
      />
    </Td>

    <!-- Data cells -->
    <Td
      v-for="column in columns"
      :key="column.name"
      :align="column.align"
      :main="column.main"
      :class-name="column.className"
      :truncate="column.truncate"
      :width="column.width"
    >
      <slot
        :name="'cell-' + column.name"
        :item="item"
        :value="getItemValue(item, column)"
        :column="column"
      >
        <component
          :is="getTypeComponent(column.type || 'text')"
          :value="getItemValue(item, column)"
        />
      </slot>
    </Td>

    <!-- Action cell -->
    <Td
      v-if="showActions"
      align="right"
    >
      <div class="flex items-center justify-end gap-2">
        <slot
          name="actions"
          :item="item"
        />
      </div>
    </Td>
  </Tr>
</template>
