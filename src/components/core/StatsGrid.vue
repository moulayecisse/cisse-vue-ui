<script lang="ts" setup>
import StatsCard, { type StatItem } from './StatsCard.vue'

withDefaults(
  defineProps<{
    /** Array of stats to display */
    stats: StatItem[]
    /** Number of columns (auto-calculated if not provided) */
    cols?: 2 | 3 | 4
    /** Visual variant for all cards */
    variant?: 'default' | 'glass' | 'solid' | 'outline'
    /** Color scheme for solid variant */
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    variant: 'default',
    color: 'primary',
  }
)
</script>

<template>
  <div
    class="grid gap-3 sm:gap-4"
    :class="[
      cols === 2 && 'grid-cols-2',
      cols === 3 && 'grid-cols-3',
      cols === 4 && 'grid-cols-2 sm:grid-cols-4',
      !cols && stats.length === 2 && 'grid-cols-2',
      !cols && stats.length === 3 && 'grid-cols-3',
      !cols && stats.length === 4 && 'grid-cols-2 sm:grid-cols-4',
      !cols && stats.length > 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    ]"
  >
    <StatsCard
      v-for="(stat, index) in stats"
      :key="index"
      :label="stat.label"
      :value="stat.value"
      :icon="stat.icon"
      :change="stat.change"
      :change-label="stat.changeLabel"
      :variant="variant"
      :color="color"
    />
  </div>
</template>
