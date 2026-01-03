<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarColor =
  | 'gray'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

const props = withDefaults(
  defineProps<{
    /** Image source URL */
    src?: string
    /** Alt text for image */
    alt?: string
    /** Fallback name (shows initials) */
    name?: string
    /** Size variant */
    size?: AvatarSize
    /** Show online status indicator */
    status?: 'online' | 'offline' | 'away' | 'busy'
    /** Rounded style */
    rounded?: 'full' | 'lg' | 'md'
    /** Background color (manual selection) */
    color?: AvatarColor
    /** Auto-generate color from name (like WhatsApp) */
    autoColor?: boolean
  }>(),
  {
    size: 'md',
    rounded: 'full',
    autoColor: false,
  },
)

const imageError = ref(false)

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-6 text-xs',
  sm: 'size-8 text-sm',
  md: 'size-10 text-base',
  lg: 'size-12 text-lg',
  xl: 'size-16 text-xl',
  '2xl': 'size-20 text-2xl',
}

const statusSizes: Record<AvatarSize, string> = {
  xs: 'size-1.5',
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
  xl: 'size-4',
  '2xl': 'size-5',
}

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
}

const roundedClasses: Record<string, string> = {
  full: 'rounded-full',
  lg: 'rounded-lg',
  md: 'rounded-md',
}

// Color classes for avatar backgrounds
const colorClasses: Record<AvatarColor, string> = {
  gray: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  lime: 'bg-lime-100 text-lime-700 dark:bg-lime-900/50 dark:text-lime-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
}

// Colors for auto-generation (excluding gray for more vibrant results)
const autoColorPalette: AvatarColor[] = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
]

// Generate a deterministic color from a string (like WhatsApp)
function getColorFromString(str: string): AvatarColor {
  if (!str) return 'gray'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % autoColorPalette.length
  return autoColorPalette[index]
}

// Computed color class based on props
const avatarColorClass = computed(() => {
  // Manual color takes priority
  if (props.color) {
    return colorClasses[props.color]
  }
  // Auto-generate from name if enabled
  if (props.autoColor && props.name) {
    return colorClasses[getColorFromString(props.name)]
  }
  // Default gray
  return colorClasses.gray
})

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const showImage = computed(() => props.src && !imageError.value)
</script>

<template>
  <div class="relative inline-block">
    <div
      :class="[
        'flex items-center justify-center overflow-hidden font-medium',
        avatarColorClass,
        sizeClasses[size],
        roundedClasses[rounded],
      ]"
    >
      <img
        v-if="showImage"
        :src="src"
        :alt="alt || name"
        class="size-full object-cover"
        @error="imageError = true"
      >
      <span v-else-if="initials">{{ initials }}</span>
      <Icon
        v-else
        icon="lucide:user"
        class="size-1/2"
      />
    </div>
    <span
      v-if="status"
      :class="[
        'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-900',
        statusSizes[size],
        statusColors[status],
      ]"
    />
  </div>
</template>
