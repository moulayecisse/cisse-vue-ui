<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    /** Button variant */
    variant?: ButtonVariant
    /** Button size */
    size?: ButtonSize
    /** Icon to show (left side) */
    icon?: string
    /** Icon on right side */
    iconRight?: string
    /** Loading state */
    loading?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Full width */
    block?: boolean
    /** Link href (renders as <a>) */
    href?: string
    /** Router link (renders as RouterLink) */
    to?: string
    /** Button type */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary',
  outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-primary dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
  xl: 'px-6 py-3 text-lg gap-2.5',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-6',
}

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block && 'w-full',
])

const component = computed(() => {
  if (props.to) {
    try {
      const RouterLink = resolveComponent('RouterLink')
      if (typeof RouterLink !== 'string') return RouterLink
    } catch {
      // RouterLink not available
    }
  }
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: props.type, disabled: props.disabled || props.loading }
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <component
    :is="component"
    v-bind="componentProps"
    :class="classes"
    @click="handleClick"
  >
    <Icon
      v-if="loading"
      icon="lucide:loader-2"
      :class="[iconSizeClasses[size], 'animate-spin']"
    />
    <Icon
      v-else-if="icon"
      :icon="icon"
      :class="iconSizeClasses[size]"
    />
    <slot />
    <Icon
      v-if="iconRight && !loading"
      :icon="iconRight"
      :class="iconSizeClasses[size]"
    />
  </component>
</template>
