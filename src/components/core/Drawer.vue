<script lang="ts" setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const props = withDefaults(
  defineProps<{
    /** Whether the drawer is visible */
    modelValue: boolean
    /** Position of the drawer */
    position?: DrawerPosition
    /** Size of the drawer */
    size?: DrawerSize
    /** Title shown in header */
    title?: string
    /** Show close button */
    showClose?: boolean
    /** Close on overlay click */
    closeOnOverlay?: boolean
    /** Close on escape key */
    closeOnEscape?: boolean
    /** Show overlay */
    overlay?: boolean
  }>(),
  {
    position: 'right',
    size: 'md',
    showClose: true,
    closeOnOverlay: true,
    closeOnEscape: true,
    overlay: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  emit('update:modelValue', false)
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll when open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

const sizeClasses = computed(() => {
  const isHorizontal = props.position === 'left' || props.position === 'right'
  const sizes = {
    sm: isHorizontal ? 'w-64' : 'h-32',
    md: isHorizontal ? 'w-80' : 'h-48',
    lg: isHorizontal ? 'w-96' : 'h-64',
    xl: isHorizontal ? 'w-[32rem]' : 'h-96',
    full: isHorizontal ? 'w-screen' : 'h-screen',
  }
  return sizes[props.size]
})

const positionClasses = computed(() => {
  const base = 'fixed bg-white dark:bg-gray-800 shadow-xl flex flex-col'
  switch (props.position) {
    case 'left':
      return `${base} inset-y-0 left-0 ${sizeClasses.value}`
    case 'right':
      return `${base} inset-y-0 right-0 ${sizeClasses.value}`
    case 'top':
      return `${base} inset-x-0 top-0 ${sizeClasses.value}`
    case 'bottom':
      return `${base} inset-x-0 bottom-0 ${sizeClasses.value}`
    default:
      return base
  }
})

const transformClasses = computed(() => {
  switch (props.position) {
    case 'left':
      return { enter: '-translate-x-full', leave: '-translate-x-full' }
    case 'right':
      return { enter: 'translate-x-full', leave: 'translate-x-full' }
    case 'top':
      return { enter: '-translate-y-full', leave: '-translate-y-full' }
    case 'bottom':
      return { enter: 'translate-y-full', leave: 'translate-y-full' }
    default:
      return { enter: '', leave: '' }
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue && overlay"
        class="fixed inset-0 z-40 bg-black/50"
        @click="handleOverlayClick"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      :enter-from-class="transformClasses.enter"
      enter-to-class="translate-x-0 translate-y-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0 translate-y-0"
      :leave-to-class="transformClasses.leave"
    >
      <div
        v-if="modelValue"
        :class="positionClasses"
        class="z-50"
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div
          v-if="title || showClose || $slots.header"
          class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <slot name="header">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h2>
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="close"
          >
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="px-4 py-3 border-t border-gray-200 dark:border-gray-700"
        >
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
