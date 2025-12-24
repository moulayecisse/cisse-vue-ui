<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useDropdown } from '@/composables/useDropdown'
import { useId } from '@/composables/useId'

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(
  defineProps<{
    /** Position of the popover */
    position?: PopoverPosition
    /** Trigger on hover instead of click */
    hover?: boolean
    /** Use teleport to body */
    teleport?: boolean
    /** Width of the popover */
    width?: 'auto' | 'sm' | 'md' | 'lg'
    /** Custom ID for accessibility */
    id?: string
  }>(),
  {
    position: 'bottom',
    hover: false,
    teleport: true,
    width: 'auto',
  },
)

// Generate unique IDs for accessibility
const { related } = useId({ prefix: 'popover', id: props.id })
const triggerId = computed(() => related('trigger'))
const popoverId = computed(() => related('content'))

const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()

const { isOpen, dropdownStyle, toggle, close, open } = useDropdown(triggerRef, popoverRef, {
  teleport: props.teleport,
  gap: 8,
})

const handleTrigger = () => {
  if (!props.hover) {
    toggle()
  }
}

const handleMouseEnter = () => {
  if (props.hover) {
    open()
  }
}

const handleMouseLeave = () => {
  if (props.hover) {
    close()
  }
}

const widthClasses = {
  auto: 'w-auto min-w-48',
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-80',
}
</script>

<template>
  <div
    class="relative inline-block"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="triggerRef"
      :id="triggerId"
      :aria-expanded="isOpen"
      :aria-controls="popoverId"
      @click="handleTrigger"
    >
      <slot name="trigger" />
    </div>

    <Teleport
      to="body"
      :disabled="!teleport"
    >
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          :id="popoverId"
          ref="popoverRef"
          role="dialog"
          :aria-labelledby="triggerId"
          :style="dropdownStyle"
          :class="[
            'z-9999 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800',
            widthClasses[width],
          ]"
        >
          <slot :close="close" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
