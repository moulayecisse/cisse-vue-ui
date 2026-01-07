<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import CardWrapper from './CardWrapper.vue'

export type StatItemSize = 'sm' | 'md' | 'lg'
export type StatItemIconPosition = 'top' | 'left' | 'right'
export type StatItemVariant = 'default' | 'glass' | 'outline' | 'flat'
export type StatItemColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type StatItemTrend = 'up' | 'down' | 'neutral'

export interface StatItemData {
  label: string
  value: string | number
  icon?: string
  change?: number
  changeLabel?: string
  trend?: StatItemTrend
  color?: StatItemColor
}

const props = withDefaults(
  defineProps<{
    /** Stat label */
    label: string
    /** Stat value */
    value: string | number
    /** Icon name (iconify format) */
    icon?: string
    /** Icon position */
    iconPosition?: StatItemIconPosition
    /** Percentage change (positive or negative) */
    change?: number
    /** Change label (e.g., "vs last month") */
    changeLabel?: string
    /** Explicit trend direction (overrides change-based calculation) */
    trend?: StatItemTrend
    /** Show only trend arrow without percentage */
    trendOnly?: boolean
    /** Size variant */
    size?: StatItemSize
    /** Visual variant */
    variant?: StatItemVariant
    /** Color scheme */
    color?: StatItemColor
    /** Make the stat clickable */
    clickable?: boolean
    /** Center content (default: true for top icon, false for left/right) */
    centered?: boolean
    /** Custom class for the card */
    cardClass?: string
    /** Custom class for the icon wrapper */
    iconClass?: string
    /** Custom class for the value */
    valueClass?: string
    /** Custom class for the label */
    labelClass?: string
  }>(),
  {
    iconPosition: 'top',
    size: 'md',
    variant: 'default',
    color: 'primary',
    clickable: false,
    trendOnly: false,
  }
)

defineEmits<{
  click: [event: MouseEvent]
}>()

// Determine if content should be centered
const isCentered = computed(() => {
  if (props.centered !== undefined) return props.centered
  return props.iconPosition === 'top'
})

// Determine effective trend based on change value or explicit trend
const effectiveTrend = computed<StatItemTrend | undefined>(() => {
  if (props.trend) return props.trend
  if (props.change === undefined) return undefined
  if (props.change > 0) return 'up'
  if (props.change < 0) return 'down'
  return 'neutral'
})

// Size-based classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      padding: 'sm' as const,
      icon: 'size-8',
      iconInner: 'size-4',
      value: 'text-xl font-bold',
      label: 'text-xs',
      change: 'text-xs',
      gap: 'gap-1',
    },
    md: {
      padding: 'md' as const,
      icon: 'size-10',
      iconInner: 'size-5',
      value: 'text-2xl sm:text-3xl font-bold',
      label: 'text-xs sm:text-sm',
      change: 'text-xs',
      gap: 'gap-2',
    },
    lg: {
      padding: 'lg' as const,
      icon: 'size-12',
      iconInner: 'size-6',
      value: 'text-3xl sm:text-4xl font-bold',
      label: 'text-sm sm:text-base',
      change: 'text-sm',
      gap: 'gap-3',
    },
  }
  return sizes[props.size]
})

// Color-based classes for icon background
const iconBgClasses = computed(() => {
  if (props.variant === 'glass') return 'bg-white/20'

  const colors = {
    primary: 'bg-primary-100 dark:bg-primary-900/30',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30',
    success: 'bg-emerald-100 dark:bg-emerald-900/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30',
    danger: 'bg-red-100 dark:bg-red-900/30',
    info: 'bg-blue-100 dark:bg-blue-900/30',
  }
  return colors[props.color]
})

// Color-based classes for icon
const iconColorClasses = computed(() => {
  if (props.variant === 'glass') return 'text-white'

  const colors = {
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
  }
  return colors[props.color]
})

// Value text classes based on variant
const valueTextClasses = computed(() => {
  if (props.variant === 'glass') return 'text-white'
  return 'text-gray-900 dark:text-white'
})

// Label text classes based on variant
const labelTextClasses = computed(() => {
  if (props.variant === 'glass') return 'text-white/80'
  return 'text-gray-500 dark:text-gray-400'
})

// Trend color classes
const trendColorClasses = computed(() => {
  if (!effectiveTrend.value || effectiveTrend.value === 'neutral') {
    return 'text-gray-500'
  }
  return effectiveTrend.value === 'up' ? 'text-emerald-500' : 'text-red-500'
})

// Trend icon
const trendIcon = computed(() => {
  if (!effectiveTrend.value || effectiveTrend.value === 'neutral') {
    return 'heroicons:minus'
  }
  return effectiveTrend.value === 'up'
    ? 'heroicons:arrow-trending-up'
    : 'heroicons:arrow-trending-down'
})

// CardWrapper variant mapping
const cardVariant = computed(() => {
  const map: Record<StatItemVariant, 'default' | 'glass' | 'outline' | 'flat'> = {
    default: 'default',
    glass: 'glass',
    outline: 'outline',
    flat: 'flat',
  }
  return map[props.variant]
})

// Layout classes based on icon position
const layoutClasses = computed(() => {
  if (props.iconPosition === 'top') {
    return isCentered.value ? 'flex flex-col items-center text-center' : 'flex flex-col'
  }
  if (props.iconPosition === 'left') {
    return 'flex flex-row items-center'
  }
  // right
  return 'flex flex-row-reverse items-center'
})

// Content layout classes (for left/right icon positions)
const contentClasses = computed(() => {
  if (props.iconPosition === 'top') {
    return 'flex flex-col ' + sizeClasses.value.gap
  }
  // For left/right positions, content is vertically stacked
  return 'flex flex-col flex-1 min-w-0 ' + (props.iconPosition === 'left' ? 'ml-3' : 'mr-3')
})
</script>

<template>
  <CardWrapper
    :variant="cardVariant"
    :padding="sizeClasses.padding"
    :clickable="clickable"
    :shadow="variant === 'glass' ? 'none' : 'sm'"
    :border="variant === 'outline' ? 'default' : 'none'"
    rounded="xl"
    :header-divider="false"
    :class="cardClass"
    @click="$emit('click', $event)"
  >
    <div :class="layoutClasses">
      <!-- Icon -->
      <div
        v-if="icon"
        :class="[
          'rounded-xl flex items-center justify-center flex-shrink-0',
          sizeClasses.icon,
          iconBgClasses,
          iconPosition === 'top' && 'mb-2',
          iconClass,
        ]"
      >
        <slot name="icon">
          <Icon :icon="icon" :class="[sizeClasses.iconInner, iconColorClasses]" />
        </slot>
      </div>

      <!-- Content -->
      <div :class="contentClasses">
        <!-- Value -->
        <div :class="[sizeClasses.value, valueTextClasses, valueClass]">
          <slot name="value">{{ value }}</slot>
        </div>

        <!-- Label -->
        <div :class="[sizeClasses.label, labelTextClasses, labelClass]">
          <slot name="label">{{ label }}</slot>
        </div>

        <!-- Change indicator -->
        <div
          v-if="change !== undefined || trend"
          :class="[
            'mt-1 font-medium inline-flex items-center gap-1',
            sizeClasses.change,
            trendColorClasses,
          ]"
        >
          <Icon :icon="trendIcon" class="size-3.5" />
          <span v-if="!trendOnly && change !== undefined">
            {{ change >= 0 ? '+' : '' }}{{ change }}%
          </span>
          <span v-if="changeLabel" class="text-gray-400">{{ changeLabel }}</span>
        </div>
      </div>
    </div>

    <!-- Extra slot for additional content -->
    <slot name="extra" />
  </CardWrapper>
</template>
