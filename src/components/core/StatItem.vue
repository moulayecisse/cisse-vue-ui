<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import CardWrapper, { type CardShadow, type CardRounded, type CardBorder, type CardAccent } from './CardWrapper.vue'
import Skeleton from '@/components/feedback/Skeleton.vue'

export type StatItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type StatItemIconPosition = 'top' | 'left' | 'right' | 'bottom'
export type StatItemVariant = 'default' | 'glass' | 'outline' | 'flat' | 'solid'
export type StatItemColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type StatItemTrend = 'up' | 'down' | 'neutral'
export type StatItemIconRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface StatItemData {
  label: string
  value: string | number
  icon?: string
  change?: number
  changeLabel?: string
  trend?: StatItemTrend
  color?: StatItemColor
  description?: string
  prefix?: string
  suffix?: string
}

const props = withDefaults(
  defineProps<{
    /** Stat label */
    label: string
    /** Stat value */
    value: string | number
    /** Description text below label */
    description?: string
    /** Prefix for value (e.g., "$") */
    prefix?: string
    /** Suffix for value (e.g., "%", "users") */
    suffix?: string
    /** Icon name (iconify format) */
    icon?: string
    /** Icon position */
    iconPosition?: StatItemIconPosition
    /** Icon border radius */
    iconRounded?: StatItemIconRounded
    /** Hide icon background */
    hideIconBg?: boolean
    /** Percentage change (positive or negative) */
    change?: number
    /** Change label (e.g., "vs last month") */
    changeLabel?: string
    /** Explicit trend direction (overrides change-based calculation) */
    trend?: StatItemTrend
    /** Show only trend arrow without percentage */
    trendOnly?: boolean
    /** Hide trend icon, show only text */
    hideTrendIcon?: boolean
    /** Invert trend colors (green for down, red for up) */
    invertTrendColors?: boolean
    /** Size variant */
    size?: StatItemSize
    /** Visual variant */
    variant?: StatItemVariant
    /** Color scheme */
    color?: StatItemColor
    /** Make the stat clickable */
    clickable?: boolean
    /** Center content (default: true for top/bottom icon, false for left/right) */
    centered?: boolean
    /** Show label before value */
    labelFirst?: boolean
    /** Compact mode (reduced padding) */
    compact?: boolean
    /** Loading state */
    loading?: boolean
    /** Card shadow level */
    shadow?: CardShadow
    /** Card border radius */
    rounded?: CardRounded
    /** Card border style */
    border?: CardBorder
    /** Card accent color */
    accent?: CardAccent
    /** Custom class for the card */
    cardClass?: string
    /** Custom class for the icon wrapper */
    iconWrapperClass?: string
    /** Custom class for the icon element */
    iconClass?: string
    /** Custom class for the value */
    valueClass?: string
    /** Custom class for the label */
    labelClass?: string
    /** Custom class for the description */
    descriptionClass?: string
    /** Custom class for the trend indicator */
    trendClass?: string
    /** Custom class for the content wrapper */
    contentClass?: string
  }>(),
  {
    iconPosition: 'top',
    iconRounded: 'xl',
    size: 'md',
    variant: 'default',
    color: 'primary',
    clickable: false,
    trendOnly: false,
    hideTrendIcon: false,
    invertTrendColors: false,
    hideIconBg: false,
    labelFirst: false,
    compact: false,
    loading: false,
    shadow: 'sm',
    rounded: 'xl',
    border: 'none',
    accent: 'none',
  }
)

defineEmits<{
  click: [event: MouseEvent]
}>()

// Determine if content should be centered
const isCentered = computed(() => {
  if (props.centered !== undefined) return props.centered
  return props.iconPosition === 'top' || props.iconPosition === 'bottom'
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
    xs: {
      padding: (props.compact ? 'none' : 'sm') as 'none' | 'sm',
      icon: 'size-6',
      iconInner: 'size-3',
      value: 'text-lg font-bold',
      label: 'text-xs',
      description: 'text-xs',
      change: 'text-xs',
      gap: 'gap-0.5',
    },
    sm: {
      padding: (props.compact ? 'sm' : 'sm') as 'sm',
      icon: 'size-8',
      iconInner: 'size-4',
      value: 'text-xl font-bold',
      label: 'text-xs',
      description: 'text-xs',
      change: 'text-xs',
      gap: 'gap-1',
    },
    md: {
      padding: (props.compact ? 'sm' : 'md') as 'sm' | 'md',
      icon: 'size-10',
      iconInner: 'size-5',
      value: 'text-2xl sm:text-3xl font-bold',
      label: 'text-xs sm:text-sm',
      description: 'text-xs sm:text-sm',
      change: 'text-xs',
      gap: 'gap-2',
    },
    lg: {
      padding: (props.compact ? 'md' : 'lg') as 'md' | 'lg',
      icon: 'size-12',
      iconInner: 'size-6',
      value: 'text-3xl sm:text-4xl font-bold',
      label: 'text-sm sm:text-base',
      description: 'text-sm',
      change: 'text-sm',
      gap: 'gap-3',
    },
    xl: {
      padding: (props.compact ? 'md' : 'lg') as 'md' | 'lg',
      icon: 'size-14',
      iconInner: 'size-7',
      value: 'text-4xl sm:text-5xl font-bold',
      label: 'text-base sm:text-lg',
      description: 'text-sm sm:text-base',
      change: 'text-sm',
      gap: 'gap-4',
    },
  }
  return sizes[props.size]
})

// Icon rounded classes
const iconRoundedClasses = computed(() => {
  const map: Record<StatItemIconRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }
  return map[props.iconRounded]
})

// Color-based classes for icon background
const iconBgClasses = computed(() => {
  if (props.hideIconBg) return ''
  if (props.variant === 'glass' || props.variant === 'solid') return 'bg-white/20'

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
  if (props.variant === 'glass' || props.variant === 'solid') return 'text-white'

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

// Solid variant background classes
const solidBgClasses = computed(() => {
  if (props.variant !== 'solid') return ''
  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  }
  return colors[props.color]
})

// Value text classes based on variant
const valueTextClasses = computed(() => {
  if (props.variant === 'glass' || props.variant === 'solid') return 'text-white'
  return 'text-gray-900 dark:text-white'
})

// Label text classes based on variant
const labelTextClasses = computed(() => {
  if (props.variant === 'glass') return 'text-white/80'
  if (props.variant === 'solid') return 'text-white/90'
  return 'text-gray-500 dark:text-gray-400'
})

// Description text classes based on variant
const descriptionTextClasses = computed(() => {
  if (props.variant === 'glass') return 'text-white/70'
  if (props.variant === 'solid') return 'text-white/80'
  return 'text-gray-400 dark:text-gray-500'
})

// Trend color classes
const trendColorClasses = computed(() => {
  if (!effectiveTrend.value || effectiveTrend.value === 'neutral') {
    return 'text-gray-500'
  }

  const isUp = effectiveTrend.value === 'up'
  const greenColor = 'text-emerald-500'
  const redColor = 'text-red-500'

  if (props.invertTrendColors) {
    return isUp ? redColor : greenColor
  }
  return isUp ? greenColor : redColor
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
  if (props.variant === 'solid') return 'default'
  return props.variant
})

// Effective shadow
const effectiveShadow = computed(() => {
  if (props.variant === 'glass') return 'none'
  return props.shadow
})

// Effective border
const effectiveBorder = computed(() => {
  if (props.variant === 'outline') return 'default'
  return props.border
})

// Layout classes based on icon position
const layoutClasses = computed(() => {
  const centered = isCentered.value ? 'items-center text-center' : ''

  switch (props.iconPosition) {
    case 'top':
      return `flex flex-col ${centered}`
    case 'bottom':
      return `flex flex-col-reverse ${centered}`
    case 'left':
      return 'flex flex-row items-center'
    case 'right':
      return 'flex flex-row-reverse items-center'
    default:
      return `flex flex-col ${centered}`
  }
})

// Icon margin classes based on position
const iconMarginClasses = computed(() => {
  switch (props.iconPosition) {
    case 'top':
      return 'mb-2'
    case 'bottom':
      return 'mt-2'
    case 'left':
      return 'mr-3'
    case 'right':
      return 'ml-3'
    default:
      return ''
  }
})

// Content layout classes
const computedContentClasses = computed(() => {
  const isVertical = props.iconPosition === 'top' || props.iconPosition === 'bottom'
  if (isVertical) {
    return `flex flex-col ${sizeClasses.value.gap}`
  }
  return `flex flex-col flex-1 min-w-0 ${sizeClasses.value.gap}`
})
</script>

<template>
  <CardWrapper
    :variant="cardVariant"
    :padding="sizeClasses.padding"
    :clickable="clickable"
    :shadow="effectiveShadow"
    :border="effectiveBorder"
    :rounded="rounded"
    :accent="accent"
    :header-divider="false"
    :class="[cardClass, solidBgClasses, variant === 'solid' && 'text-white']"
    @click="$emit('click', $event)"
  >
    <!-- Loading State -->
    <div v-if="loading" :class="layoutClasses">
      <Skeleton
        v-if="icon"
        :class="[sizeClasses.icon, iconRoundedClasses, iconMarginClasses]"
      />
      <div :class="computedContentClasses">
        <Skeleton :class="sizeClasses.value" width="60%" height="1.5em" />
        <Skeleton :class="sizeClasses.label" width="80%" height="1em" />
      </div>
    </div>

    <!-- Content -->
    <div v-else :class="layoutClasses">
      <!-- Icon -->
      <div
        v-if="icon || $slots.icon"
        :class="[
          'flex items-center justify-center flex-shrink-0',
          sizeClasses.icon,
          iconRoundedClasses,
          iconBgClasses,
          iconMarginClasses,
          iconWrapperClass,
        ]"
      >
        <slot name="icon">
          <Icon :icon="icon!" :class="[sizeClasses.iconInner, iconColorClasses, iconClass]" />
        </slot>
      </div>

      <!-- Content -->
      <div :class="[computedContentClasses, contentClass]">
        <!-- Label (if labelFirst) -->
        <div
          v-if="labelFirst"
          :class="[sizeClasses.label, labelTextClasses, labelClass]"
        >
          <slot name="label">{{ label }}</slot>
        </div>

        <!-- Value -->
        <div :class="[sizeClasses.value, valueTextClasses, valueClass]">
          <slot name="value">
            <span v-if="prefix" class="mr-0.5">{{ prefix }}</span>
            {{ value }}
            <span v-if="suffix" class="ml-0.5">{{ suffix }}</span>
          </slot>
        </div>

        <!-- Label (if not labelFirst) -->
        <div
          v-if="!labelFirst"
          :class="[sizeClasses.label, labelTextClasses, labelClass]"
        >
          <slot name="label">{{ label }}</slot>
        </div>

        <!-- Description -->
        <div
          v-if="description || $slots.description"
          :class="[sizeClasses.description, descriptionTextClasses, descriptionClass]"
        >
          <slot name="description">{{ description }}</slot>
        </div>

        <!-- Change indicator -->
        <div
          v-if="change !== undefined || trend"
          :class="[
            'mt-1 font-medium inline-flex items-center gap-1',
            sizeClasses.change,
            trendColorClasses,
            trendClass,
          ]"
        >
          <Icon v-if="!hideTrendIcon" :icon="trendIcon" class="size-3.5" />
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
