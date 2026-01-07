<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { Icon } from '@iconify/vue'
import CardSkeleton from '@/components/feedback/CardSkeleton.vue'

export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardBorder = 'none' | 'default' | 'primary' | 'secondary'
export type CardVariant = 'default' | 'glass' | 'outline' | 'flat'
export type CardAccent = 'none' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type CardImagePosition = 'top' | 'bottom' | 'left' | 'right' | 'background'

const props = withDefaults(
  defineProps<{
    /** Card title */
    title?: string
    /** Card description */
    description?: string
    /** Header icon (Iconify format) */
    icon?: string
    /** Shadow level */
    shadow?: CardShadow
    /** Border radius */
    rounded?: CardRounded
    /** Content padding (defaults to none for CardComponent compatibility) */
    padding?: CardPadding
    /** Header/footer padding (defaults to md to match CardComponent header) */
    headerPadding?: CardPadding
    /** Border style */
    border?: CardBorder
    /** Visual variant */
    variant?: CardVariant
    /** Colored accent border (top or left depending on layout) */
    accent?: CardAccent
    /** Show header divider */
    headerDivider?: boolean
    /** Show footer divider */
    footerDivider?: boolean
    /** Make card clickable with hover effects */
    clickable?: boolean
    /** Selected state (adds visual indicator) */
    selected?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Image URL for card media */
    image?: string
    /** Image alt text */
    imageAlt?: string
    /** Image position */
    imagePosition?: CardImagePosition
    /** Image height (for top/bottom positions) */
    imageHeight?: string
    /** Image width (for left/right positions) */
    imageWidth?: string
    /** Loading state */
    loading?: boolean
    /** Number of skeleton lines */
    loadingLines?: number
    /** Show avatar in skeleton */
    loadingAvatar?: boolean
    /** Show actions in skeleton */
    loadingActions?: boolean
    /** Custom class for the card container */
    cardClass?: string
    /** Custom class for the header section */
    headerClass?: string
    /** Custom class for the title */
    titleClass?: string
    /** Custom class for the description */
    descriptionClass?: string
    /** Custom class for the icon wrapper */
    iconClass?: string
    /** Custom class for the icon element */
    iconElementClass?: string
    /** Custom class for the content/body */
    contentClass?: string
    /** Custom class for the footer */
    footerClass?: string
    /** Custom class for dividers */
    dividerClass?: string
    /** Custom class for the actions container */
    actionsClass?: string
    /** Custom class for the image */
    imageClass?: string
  }>(),
  {
    shadow: 'md',
    rounded: 'lg',
    padding: 'none',
    headerPadding: 'md',
    border: 'none',
    variant: 'default',
    accent: 'none',
    headerDivider: true,
    footerDivider: true,
    clickable: false,
    selected: false,
    disabled: false,
    imagePosition: 'top',
    imageHeight: '200px',
    imageWidth: '200px',
    loading: false,
    loadingLines: 3,
    loadingAvatar: false,
    loadingActions: false,
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const hasHeader = computed(
  () =>
    props.title ||
    props.description ||
    props.icon ||
    slots.header ||
    slots.title ||
    slots.description ||
    slots.icon ||
    slots.actions
)

const hasFooter = computed(() => !!slots.footer)
const hasImage = computed(() => !!props.image || !!slots.image)
const isHorizontal = computed(() => props.imagePosition === 'left' || props.imagePosition === 'right')

// Shadow classes
const shadowClasses = computed(() => {
  const map: Record<CardShadow, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }
  return map[props.shadow]
})

// Rounded classes
const roundedClasses = computed(() => {
  const map: Record<CardRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-3xl',
  }
  return map[props.rounded]
})

// Padding classes for content
const paddingClasses = computed(() => {
  const map: Record<CardPadding, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  }
  return map[props.padding]
})

// Header padding classes (uses headerPadding prop)
const headerPaddingClasses = computed(() => {
  const map: Record<CardPadding, string> = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  }
  return map[props.headerPadding]
})

// Footer padding classes (uses headerPadding prop for consistency)
const footerPaddingClasses = computed(() => {
  const map: Record<CardPadding, string> = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  }
  return map[props.headerPadding]
})

// Border classes
const borderClasses = computed(() => {
  const map: Record<CardBorder, string> = {
    none: '',
    default: 'border border-gray-200 dark:border-gray-700',
    primary: 'border border-primary-500 dark:border-primary-400',
    secondary: 'border border-secondary-500 dark:border-secondary-400',
  }
  return map[props.border]
})

// Variant classes
const variantClasses = computed(() => {
  const map: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-slate-950',
    glass: 'bg-white/15 backdrop-blur-sm',
    outline: 'bg-transparent',
    flat: 'bg-gray-50 dark:bg-slate-900',
  }
  return map[props.variant]
})

// Accent classes
const accentClasses = computed(() => {
  if (props.accent === 'none') return ''

  const colorMap: Record<Exclude<CardAccent, 'none'>, string> = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    success: 'border-emerald-500',
    warning: 'border-amber-500',
    danger: 'border-red-500',
    info: 'border-blue-500',
  }

  const position = isHorizontal.value ? 'border-l-4' : 'border-t-4'
  return `${position} ${colorMap[props.accent]}`
})

// Clickable/interactive classes
const interactiveClasses = computed(() => {
  if (props.disabled) {
    return 'opacity-60 cursor-not-allowed'
  }

  if (props.clickable) {
    return 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md'
  }

  return ''
})

// Selected state classes
const selectedClasses = computed(() => {
  if (!props.selected) return ''
  return 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900'
})

// Divider classes
const computedDividerClass = computed(
  () => props.dividerClass || 'border-gray-200 dark:border-gray-700'
)

// Title classes
const computedTitleClass = computed(
  () => props.titleClass || 'text-gray-800 dark:text-gray-200'
)

// Description classes
const computedDescriptionClass = computed(
  () => props.descriptionClass || 'text-gray-600 dark:text-gray-400'
)

// Icon wrapper classes
const computedIconClass = computed(
  () =>
    props.iconClass ||
    'flex items-center justify-center size-10 rounded-lg bg-primary-100 dark:bg-primary-900/30'
)

// Icon element classes
const computedIconElementClass = computed(
  () => props.iconElementClass || 'size-5 text-primary-600 dark:text-primary-400'
)

// Image container classes based on position
const imageContainerClasses = computed(() => {
  const base = 'overflow-hidden flex-shrink-0'

  switch (props.imagePosition) {
    case 'left':
      return `${base} rounded-l-lg`
    case 'right':
      return `${base} rounded-r-lg`
    case 'top':
      return `${base} rounded-t-lg`
    case 'bottom':
      return `${base} rounded-b-lg`
    case 'background':
      return 'absolute inset-0'
    default:
      return base
  }
})

// Image style
const imageStyle = computed(() => {
  if (props.imagePosition === 'background') {
    return {}
  }

  if (isHorizontal.value) {
    return { width: props.imageWidth }
  }

  return { height: props.imageHeight }
})

// Handle click
const handleClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled) return
  if (props.clickable) {
    emit('click', event as MouseEvent)
  }
}
</script>

<template>
  <!-- Loading State -->
  <CardSkeleton
    v-if="loading"
    :lines="loadingLines"
    :show-avatar="loadingAvatar"
    :show-actions="loadingActions"
  />

  <!-- Card Content -->
  <div
    v-else
    :class="[
      'overflow-hidden relative',
      isHorizontal ? 'flex' : 'flex flex-col',
      imagePosition === 'right' && 'flex-row-reverse',
      shadowClasses,
      roundedClasses,
      borderClasses,
      variantClasses,
      accentClasses,
      interactiveClasses,
      selectedClasses,
      cardClass,
    ]"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable && !disabled ? 0 : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Background Image -->
    <div
      v-if="hasImage && imagePosition === 'background'"
      :class="imageContainerClasses"
    >
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          :class="['w-full h-full object-cover', imageClass]"
        />
      </slot>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>

    <!-- Left/Top Image -->
    <div
      v-if="hasImage && (imagePosition === 'left' || imagePosition === 'top')"
      :class="imageContainerClasses"
      :style="imageStyle"
    >
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          :class="['w-full h-full object-cover', imageClass]"
        />
      </slot>
    </div>

    <!-- Main Content Area -->
    <div :class="['flex flex-col flex-1 min-w-0', imagePosition === 'background' && 'relative z-10']">
      <!-- Custom header slot (replaces standard header) -->
      <div
        v-if="$slots.header"
        :class="[
          headerDivider && 'border-b',
          computedDividerClass,
          headerClass,
        ]"
      >
        <slot name="header" />
      </div>

      <!-- Standard header with icon/title/description/actions -->
      <div
        v-else-if="hasHeader"
        :class="[
          'flex items-center justify-between gap-4',
          headerPaddingClasses,
          headerDivider && 'border-b',
          computedDividerClass,
          headerClass,
          imagePosition === 'background' && 'text-white border-white/20',
        ]"
      >
        <div class="flex items-center gap-3">
          <!-- Icon -->
          <div v-if="icon || $slots.icon" :class="computedIconClass">
            <slot name="icon">
              <Icon v-if="icon" :icon="icon" :class="computedIconElementClass" />
            </slot>
          </div>

          <!-- Title & Description -->
          <div class="flex flex-col gap-0.5">
            <span
              v-if="title || $slots.title"
              :class="[
                'text-md font-semibold',
                imagePosition === 'background' ? 'text-white' : computedTitleClass,
              ]"
            >
              <slot name="title">
                {{ title }}
              </slot>
            </span>

            <span
              v-if="description || $slots.description"
              :class="[
                'text-sm font-normal',
                imagePosition === 'background' ? 'text-white/80' : computedDescriptionClass,
              ]"
            >
              <slot name="description">
                {{ description }}
              </slot>
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions" :class="['flex gap-2', actionsClass]">
          <slot name="actions" />
        </div>
      </div>

      <!-- Content -->
      <div :class="['flex-1', paddingClasses, contentClass]">
        <slot />
      </div>

      <!-- Footer -->
      <div
        v-if="hasFooter"
        :class="[
          footerDivider && 'border-t',
          computedDividerClass,
          footerPaddingClasses,
          footerClass,
          imagePosition === 'background' && 'text-white border-white/20',
        ]"
      >
        <slot name="footer" />
      </div>
    </div>

    <!-- Right/Bottom Image -->
    <div
      v-if="hasImage && (imagePosition === 'right' || imagePosition === 'bottom')"
      :class="imageContainerClasses"
      :style="imageStyle"
    >
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          :class="['w-full h-full object-cover', imageClass]"
        />
      </slot>
    </div>
  </div>
</template>
