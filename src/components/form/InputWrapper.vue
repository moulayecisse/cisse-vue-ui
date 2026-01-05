<script lang="ts" setup>
import { computed, useSlots, toRef } from 'vue'
import { Icon } from '@iconify/vue'
import { useInputStyles, type InputSize } from '@/composables/useInputStyles'

export type InputWrapperSize = InputSize

const props = withDefaults(
  defineProps<{
    /** Icon on the left (Iconify format) */
    icon?: string
    /** Icon on the right (Iconify format) */
    iconRight?: string
    /** Input size */
    size?: InputWrapperSize
    /** Invalid/error state */
    invalid?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Focused state (for external control) */
    focused?: boolean
    /** Custom wrapper classes */
    wrapperClass?: string
  }>(),
  {
    size: 'md',
  }
)

const slots = useSlots() as { icon?: () => unknown; actions?: () => unknown }

const hasLeftIcon = computed(() => !!props.icon || !!slots.icon)
const hasRightContent = computed(() => !!props.iconRight || !!slots.actions)

const { inputClass, iconClass } = useInputStyles({
  disabled: toRef(props, 'disabled'),
  invalid: toRef(props, 'invalid'),
  focused: toRef(props, 'focused'),
  size: toRef(props, 'size'),
  hasLeftIcon,
  hasRightIcon: hasRightContent,
})

defineExpose({ inputClass })
</script>

<template>
  <div :class="['relative', wrapperClass]">
    <!-- Left icon -->
    <div
      v-if="hasLeftIcon"
      class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
    >
      <slot name="icon">
        <Icon v-if="icon" :icon="icon" :class="iconClass" />
      </slot>
    </div>

    <!-- Input slot with inputClass passed via scoped slot -->
    <slot :input-class="inputClass" />

    <!-- Right side: actions or icon -->
    <div
      v-if="hasRightContent"
      class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"
    >
      <slot name="actions">
        <Icon
          v-if="iconRight"
          :icon="iconRight"
          :class="[iconClass, 'pointer-events-none']"
        />
      </slot>
    </div>
  </div>
</template>
