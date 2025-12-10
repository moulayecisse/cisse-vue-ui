<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

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
  }>(),
  {
    size: 'md',
    rounded: 'full',
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
        'flex items-center justify-center overflow-hidden bg-gray-200 font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300',
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
