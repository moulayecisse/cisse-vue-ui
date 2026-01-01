<script lang="ts" setup>
import { computed, resolveComponent, useSlots } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Feature item for the branding panel
 */
export interface AuthFeature {
  /** Iconify icon name */
  icon: string
  /** Feature text */
  text: string
}

const props = withDefaults(defineProps<{
  /** App/brand name (used in default logo slots) */
  appName?: string
  /** App icon - Iconify icon name (used in default logo slots) */
  appIcon?: string
  /** Headline text (first line) */
  headline?: string
  /** Sub-headline text (second line, with optional underline) */
  subHeadline?: string
  /** Description paragraph below headlines */
  description?: string
  /** List of features to display in branding panel */
  features?: AuthFeature[]
  /** Primary gradient from color (Tailwind class) */
  gradientFrom?: string
  /** Primary gradient via color (Tailwind class, optional) */
  gradientVia?: string
  /** Primary gradient to color (Tailwind class) */
  gradientTo?: string
  /** Show decorative floating shapes and blurs */
  showDecorations?: boolean
  /** Show dot pattern overlay on branding panel */
  showPattern?: boolean
  /** Underline accent color for sub-headline (CSS color value) */
  underlineColor?: string
  /** Form panel title */
  formTitle?: string
  /** Form panel subtitle */
  formSubtitle?: string
  /** Home link URL (used for mobile logo link) */
  homeLink?: string
  /** CSS animation class for branding content entry */
  brandingAnimation?: string
  /** CSS animation class for form panel entry */
  formAnimation?: string
}>(), {
  appName: '',
  appIcon: 'lucide:box',
  headline: '',
  subHeadline: '',
  description: '',
  features: () => [],
  gradientFrom: 'from-primary-700',
  gradientVia: '',
  gradientTo: 'to-primary-800',
  showDecorations: true,
  showPattern: true,
  underlineColor: 'rgba(165, 180, 252, 0.5)',
  formTitle: '',
  formSubtitle: '',
  homeLink: '/',
  brandingAnimation: '',
  formAnimation: '',
})

const slots = useSlots()

// Check if branding panel has any content
const hasBrandingContent = computed(() => {
  return props.headline ||
    props.subHeadline ||
    props.description ||
    props.features.length > 0 ||
    slots['branding-logo'] ||
    slots['branding-headline'] ||
    slots['branding-content'] ||
    props.appName
})

// Try to resolve RouterLink (works with Vue Router)
const routerLinkComponent = computed(() => {
  try {
    const RouterLink = resolveComponent('RouterLink')
    if (typeof RouterLink !== 'string') {
      return RouterLink
    }
  } catch {
    // RouterLink not available
  }
  return 'a'
})

const getLinkProps = (link: string) => {
  if (routerLinkComponent.value === 'a') {
    return { href: link }
  }
  return { to: link }
}

const gradientClasses = computed(() => {
  const classes = [props.gradientFrom, props.gradientTo]
  if (props.gradientVia) {
    classes.splice(1, 0, props.gradientVia)
  }
  return classes.filter(Boolean)
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Left Panel - Branding (hidden on mobile) -->
    <div
      v-if="hasBrandingContent || $slots['branding-panel']"
      :class="[
        'hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br',
        ...gradientClasses,
      ]"
    >
      <!-- Allow complete customization of branding panel -->
      <slot name="branding-panel">
        <!-- Decorative floating blurs -->
        <div
          v-if="showDecorations"
          class="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div class="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div class="absolute top-1/3 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div class="absolute bottom-20 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        <!-- Dot pattern -->
        <div
          v-if="showPattern"
          class="absolute inset-0 opacity-20 pointer-events-none"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px); background-size: 24px 24px;"
        />

        <!-- Floating decorative shapes -->
        <template v-if="showDecorations">
          <div class="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-2xl rotate-12 pointer-events-none" />
          <div class="absolute bottom-32 left-16 w-12 h-12 border-2 border-white/20 rounded-full pointer-events-none" />
          <div class="absolute top-1/2 left-10 w-8 h-8 bg-white/10 rounded-lg rotate-45 pointer-events-none" />
        </template>

        <!-- Content -->
        <div class="relative z-10 flex flex-col justify-center px-16 py-12 text-white w-full">
          <div :class="brandingAnimation">
            <!-- Logo -->
            <div class="flex items-center gap-3 mb-12">
              <slot name="branding-logo">
                <template v-if="appName || appIcon">
                  <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Icon
                      :icon="appIcon"
                      class="w-8 h-8 text-white"
                    />
                  </div>
                  <span
                    v-if="appName"
                    class="text-3xl font-bold"
                  >
                    {{ appName }}
                  </span>
                </template>
              </slot>
            </div>

            <!-- Headlines -->
            <slot name="branding-headline">
              <h1
                v-if="headline || subHeadline"
                class="text-4xl xl:text-5xl font-bold leading-tight mb-6"
              >
                <template v-if="headline">
                  {{ headline }}<br>
                </template>
                <span
                  v-if="subHeadline"
                  class="relative inline-block"
                >
                  <span class="relative z-10">{{ subHeadline }}</span>
                  <svg
                    class="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 280 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 10C45 4 90 2 140 6C190 10 235 4 278 8"
                      :stroke="underlineColor"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </slot>

            <!-- Description -->
            <p
              v-if="description"
              class="text-lg text-white/80 max-w-md mb-10"
            >
              {{ description }}
            </p>

            <!-- Features list -->
            <slot name="branding-features">
              <div
                v-if="features.length > 0"
                class="space-y-4"
              >
                <div
                  v-for="(feature, index) in features"
                  :key="index"
                  class="flex items-center gap-3 text-white/90"
                >
                  <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Icon
                      :icon="feature.icon"
                      class="w-5 h-5"
                    />
                  </div>
                  <span>{{ feature.text }}</span>
                </div>
              </div>
            </slot>

            <!-- Additional branding content -->
            <slot name="branding-content" />
          </div>
        </div>
      </slot>
    </div>

    <!-- Right Panel - Form -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div
        :class="['w-full max-w-md', formAnimation]"
      >
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <component
            :is="routerLinkComponent"
            v-bind="getLinkProps(homeLink)"
            class="inline-flex items-center gap-3"
          >
            <slot name="mobile-logo">
              <template v-if="appName || appIcon">
                <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 dark:shadow-primary-900/30">
                  <Icon
                    :icon="appIcon"
                    class="w-6 h-6 text-white"
                  />
                </div>
                <span
                  v-if="appName"
                  class="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {{ appName }}
                </span>
              </template>
            </slot>
          </component>
        </div>

        <!-- Form Header (title/subtitle) -->
        <slot name="form-header">
          <div
            v-if="formTitle || formSubtitle"
            class="text-center lg:text-left mb-8"
          >
            <h2
              v-if="formTitle"
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ formTitle }}
            </h2>
            <p
              v-if="formSubtitle"
              class="text-gray-600 dark:text-gray-400"
            >
              {{ formSubtitle }}
            </p>
          </div>
        </slot>

        <!-- Form Card -->
        <div class="bg-white dark:bg-slate-800/80 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8">
          <slot />
        </div>

        <!-- Form Footer -->
        <slot name="form-footer" />
      </div>
    </div>
  </div>
</template>
