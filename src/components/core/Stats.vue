<script lang="ts" setup>
import StatItem, {
  type StatItemData,
  type StatItemSize,
  type StatItemVariant,
  type StatItemIconPosition,
  type StatItemIconRounded,
} from './StatItem.vue'
import type { CardShadow, CardRounded, CardBorder, CardAccent } from './CardWrapper.vue'

export type StatsColumns = 1 | 2 | 3 | 4 | 5 | 6
export type StatsGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

withDefaults(
  defineProps<{
    /** Array of stats to display */
    stats?: StatItemData[]
    /** Number of columns (auto-calculated if not provided) */
    cols?: StatsColumns
    /** Gap between items */
    gap?: StatsGap
    /** Visual variant for all items */
    variant?: StatItemVariant
    /** Size for all items */
    size?: StatItemSize
    /** Icon position for all items */
    iconPosition?: StatItemIconPosition
    /** Icon border radius for all items */
    iconRounded?: StatItemIconRounded
    /** Hide icon background for all items */
    hideIconBg?: boolean
    /** Default color for items without explicit color */
    color?: StatItemData['color']
    /** Show label before value for all items */
    labelFirst?: boolean
    /** Compact mode for all items */
    compact?: boolean
    /** Loading state for all items */
    loading?: boolean
    /** Card shadow for all items */
    shadow?: CardShadow
    /** Card border radius for all items */
    rounded?: CardRounded
    /** Card border for all items */
    border?: CardBorder
    /** Card accent for all items */
    accent?: CardAccent
    /** Make all items clickable */
    clickable?: boolean
    /** Center content in all items */
    centered?: boolean
    /** Invert trend colors for all items */
    invertTrendColors?: boolean
    /** Hide trend icon for all items */
    hideTrendIcon?: boolean
    /** Custom class for the grid container */
    gridClass?: string
    /** Custom class for all cards */
    cardClass?: string
    /** Custom class for all icon wrappers */
    iconWrapperClass?: string
    /** Custom class for all icons */
    iconClass?: string
    /** Custom class for all values */
    valueClass?: string
    /** Custom class for all labels */
    labelClass?: string
  }>(),
  {
    variant: 'default',
    size: 'md',
    iconPosition: 'top',
    iconRounded: 'xl',
    color: 'primary',
    gap: 'md',
    hideIconBg: false,
    labelFirst: false,
    compact: false,
    loading: false,
    shadow: 'sm',
    rounded: 'xl',
    border: 'none',
    accent: 'none',
    clickable: false,
    invertTrendColors: false,
    hideTrendIcon: false,
  }
)

defineEmits<{
  'item-click': [index: number, stat: StatItemData, event: MouseEvent]
}>()
</script>

<template>
  <div
    class="grid"
    :class="[
      gridClass,
      // Gap classes
      gap === 'none' && 'gap-0',
      gap === 'xs' && 'gap-1 sm:gap-2',
      gap === 'sm' && 'gap-2 sm:gap-3',
      gap === 'md' && 'gap-3 sm:gap-4',
      gap === 'lg' && 'gap-4 sm:gap-6',
      gap === 'xl' && 'gap-6 sm:gap-8',
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
      :description="stat.description"
      :prefix="stat.prefix"
      :suffix="stat.suffix"
      :variant="variant"
      :size="size"
      :icon-position="iconPosition"
      :icon-rounded="iconRounded"
      :hide-icon-bg="hideIconBg"
      :color="stat.color || color"
      :label-first="labelFirst"
      :compact="compact"
      :loading="loading"
      :shadow="shadow"
      :rounded="rounded"
      :border="border"
      :accent="accent"
      :clickable="clickable"
      :centered="centered"
      :invert-trend-colors="invertTrendColors"
      :hide-trend-icon="hideTrendIcon"
      :card-class="cardClass"
      :icon-wrapper-class="iconWrapperClass"
      :icon-class="iconClass"
      :value-class="valueClass"
      :label-class="labelClass"
      @click="$emit('item-click', index, stat, $event)"
    />

    <!-- Slot for custom StatItem components -->
    <slot />
  </div>
</template>
