<script lang="ts" setup>
import StatItem, { type StatItemData, type StatItemSize, type StatItemVariant, type StatItemIconPosition } from './StatItem.vue'

export type StatsColumns = 1 | 2 | 3 | 4 | 5 | 6

withDefaults(
  defineProps<{
    /** Array of stats to display */
    stats?: StatItemData[]
    /** Number of columns (auto-calculated if not provided) */
    cols?: StatsColumns
    /** Gap between items */
    gap?: 'sm' | 'md' | 'lg'
    /** Visual variant for all items */
    variant?: StatItemVariant
    /** Size for all items */
    size?: StatItemSize
    /** Icon position for all items */
    iconPosition?: StatItemIconPosition
    /** Default color for items without explicit color */
    color?: StatItemData['color']
  }>(),
  {
    variant: 'default',
    size: 'md',
    iconPosition: 'top',
    color: 'primary',
    gap: 'md',
  }
)
</script>

<template>
  <div
    class="grid"
    :class="[
      // Gap classes
      gap === 'sm' && 'gap-2 sm:gap-3',
      gap === 'md' && 'gap-3 sm:gap-4',
      gap === 'lg' && 'gap-4 sm:gap-6',
      // Column classes
      cols === 1 && 'grid-cols-1',
      cols === 2 && 'grid-cols-2',
      cols === 3 && 'grid-cols-3',
      cols === 4 && 'grid-cols-2 sm:grid-cols-4',
      cols === 5 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
      cols === 6 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      // Auto columns based on stats length
      !cols && stats?.length === 1 && 'grid-cols-1',
      !cols && stats?.length === 2 && 'grid-cols-2',
      !cols && stats?.length === 3 && 'grid-cols-3',
      !cols && stats?.length === 4 && 'grid-cols-2 sm:grid-cols-4',
      !cols && stats && stats.length > 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    ]"
  >
    <!-- Render from stats prop -->
    <StatItem
      v-for="(stat, index) in stats"
      :key="index"
      :label="stat.label"
      :value="stat.value"
      :icon="stat.icon"
      :change="stat.change"
      :change-label="stat.changeLabel"
      :trend="stat.trend"
      :variant="variant"
      :size="size"
      :icon-position="iconPosition"
      :color="stat.color || color"
    />

    <!-- Slot for custom StatItem components -->
    <slot />
  </div>
</template>
