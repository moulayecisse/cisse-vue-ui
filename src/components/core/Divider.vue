<script lang="ts" setup>
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'
export type DividerSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Divider orientation */
    orientation?: DividerOrientation
    /** Divider style variant */
    variant?: DividerVariant
    /** Divider thickness */
    size?: DividerSize
    /** Custom class for styling */
    class?: string
    /** Label text to show in the middle of the divider */
    label?: string
    /** Color variant */
    color?: 'default' | 'primary' | 'muted'
  }>(),
  {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    color: 'default',
  }
)

const sizeClasses = {
  horizontal: {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1',
  },
  vertical: {
    sm: 'w-px',
    md: 'w-0.5',
    lg: 'w-1',
  },
}

const variantClasses = {
  solid: '',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
}

const colorClasses = {
  default: 'bg-gray-200 dark:bg-gray-700',
  primary: 'bg-primary-200 dark:bg-primary-800',
  muted: 'bg-gray-100 dark:bg-gray-800',
}
</script>

<template>
  <div
    v-if="!label"
    :class="[
      colorClasses[color],
      orientation === 'vertical'
        ? ['h-full mx-2', sizeClasses.vertical[size]]
        : ['w-full my-2', sizeClasses.horizontal[size]],
      variant !== 'solid' && `border-0 border-t ${variantClasses[variant]}`,
      props.class,
    ]"
    role="separator"
    :aria-orientation="orientation"
  />
  <div
    v-else
    :class="[
      'flex items-center gap-3',
      orientation === 'vertical' ? 'flex-col h-full mx-2' : 'w-full my-2',
      props.class,
    ]"
    role="separator"
    :aria-orientation="orientation"
  >
    <div
      :class="[
        colorClasses[color],
        orientation === 'vertical'
          ? ['flex-1', sizeClasses.vertical[size]]
          : ['flex-1', sizeClasses.horizontal[size]],
      ]"
    />
    <span class="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
      {{ label }}
    </span>
    <div
      :class="[
        colorClasses[color],
        orientation === 'vertical'
          ? ['flex-1', sizeClasses.vertical[size]]
          : ['flex-1', sizeClasses.horizontal[size]],
      ]"
    />
  </div>
</template>
