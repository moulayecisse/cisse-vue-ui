<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export interface PageHeroStat {
  label: string
  value: string | number
  icon?: string
}

withDefaults(
  defineProps<{
    /** Main title */
    title: string
    /** Subtitle/description */
    subtitle?: string
    /** Badge text (shown above title) */
    badge?: string
    /** Badge icon */
    badgeIcon?: string
    /** Show animated background blobs */
    showBlobs?: boolean
    /** Show wave decoration at bottom */
    showWave?: boolean
    /** Stats to display in grid */
    stats?: PageHeroStat[]
    /** Gradient direction: 'br' (bottom-right), 'r' (right), 'b' (bottom) */
    gradientDirection?: 'br' | 'r' | 'b'
    /** Decorative icons (shown faded in background) */
    decorativeIcons?: string[]
  }>(),
  {
    showBlobs: true,
    showWave: true,
    gradientDirection: 'br',
  }
)
</script>

<template>
  <div class="relative overflow-hidden bg-linear-to-br from-primary-600 via-primary-500 to-primary-400">
    <!-- Animated background blobs -->
    <div v-if="showBlobs" class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"
      />
      <div
        class="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float [animation-delay:1s]"
      />
    </div>

    <!-- Decorative icons -->
    <div v-if="decorativeIcons?.length" class="absolute inset-0 overflow-hidden pointer-events-none">
      <Icon
        v-if="decorativeIcons[0]"
        :icon="decorativeIcons[0]"
        class="absolute top-12 right-8 w-24 h-24 text-white/5 rotate-12"
      />
      <Icon
        v-if="decorativeIcons[1]"
        :icon="decorativeIcons[1]"
        class="absolute bottom-8 left-12 w-20 h-20 text-white/5 -rotate-12"
      />
    </div>

    <!-- Custom background slot -->
    <slot name="background" />

    <div class="relative px-4 pt-8 pb-10 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <!-- Header content -->
      <div class="text-center mb-8 animate-fade-in-up">
        <!-- Badge -->
        <div
          v-if="badge || badgeIcon || $slots.badge"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4"
        >
          <slot name="badge">
            <Icon v-if="badgeIcon" :icon="badgeIcon" class="w-5 h-5 text-white" />
            <span v-if="badge" class="text-sm font-medium text-white">{{ badge }}</span>
          </slot>
        </div>

        <!-- Title -->
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtitle -->
        <p v-if="subtitle || $slots.subtitle" class="text-primary-100 text-sm sm:text-base">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <!-- Stats Grid -->
      <div
        v-if="stats?.length || $slots.stats"
        class="animate-fade-in-up [animation-delay:0.1s]"
      >
        <slot name="stats">
          <div
            class="grid gap-3 sm:gap-4"
            :class="[
              stats?.length === 2 ? 'grid-cols-2' : '',
              stats?.length === 3 ? 'grid-cols-3' : '',
              stats?.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : '',
              stats && stats.length > 4 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : '',
            ]"
          >
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center"
            >
              <div
                v-if="stat.icon"
                class="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/20 flex items-center justify-center"
              >
                <Icon :icon="stat.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="text-2xl sm:text-3xl font-bold text-white">{{ stat.value }}</div>
              <div class="text-xs sm:text-sm text-primary-100">{{ stat.label }}</div>
            </div>
          </div>
        </slot>
      </div>

      <!-- Additional content -->
      <slot name="content" />
    </div>

    <!-- Wave decoration -->
    <div v-if="showWave" class="absolute bottom-0 left-0 right-0">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80L60 74.7C120 69 240 59 360 53.3C480 48 600 48 720 53.3C840 59 960 69 1080 69.3C1200 69 1320 59 1380 53.3L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
          class="fill-gray-50 dark:fill-slate-900"
        />
      </svg>
    </div>
  </div>
</template>
