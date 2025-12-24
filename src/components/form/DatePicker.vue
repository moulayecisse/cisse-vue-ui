<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDropdown } from '@/composables/useDropdown'
import { useId } from '@/composables/useId'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Date format for display */
    format?: string
    /** Locale for formatting */
    locale?: string
    /** Disabled state */
    disabled?: boolean
    /** Minimum selectable date */
    minDate?: Date
    /** Maximum selectable date */
    maxDate?: Date
    /** Use teleport */
    teleport?: boolean
    /** Custom ID for accessibility */
    id?: string
  }>(),
  {
    placeholder: 'Select date',
    format: 'short',
    locale: 'en-US',
    disabled: false,
    teleport: true,
  },
)

// Generate unique IDs for accessibility
const { related } = useId({ prefix: 'datepicker', id: props.id })
const triggerId = computed(() => related('trigger'))
const calendarId = computed(() => related('calendar'))
const gridId = computed(() => related('grid'))

const modelValue = defineModel<Date | null>({ default: null })

const triggerRef = ref<HTMLElement>()
const calendarRef = ref<HTMLElement>()

const { isOpen, dropdownStyle, toggle, close } = useDropdown(triggerRef, calendarRef, {
  teleport: props.teleport,
  gap: 4,
})

const currentMonth = ref(modelValue.value ? new Date(modelValue.value) : new Date())

const weekDays = computed(() => {
  const days = []
  const formatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, i) // Jan 2024 starts on Monday
    days.push(formatter.format(date))
  }
  return days
})

const monthYear = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { month: 'long', year: 'numeric' })
  return formatter.format(currentMonth.value)
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean }> = []

  // Get the day of week for the first day (0 = Sunday)
  let startDay = firstDay.getDay()
  // Adjust for Monday start
  startDay = startDay === 0 ? 6 : startDay - 1

  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: isDateDisabled(date),
    })
  }

  // Current month days
  const today = new Date()
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isSelected: modelValue.value ? isSameDay(date, modelValue.value) : false,
      isDisabled: isDateDisabled(date),
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: isDateDisabled(date),
    })
  }

  return days
})

const displayValue = computed(() => {
  if (!modelValue.value) return ''
  const formatter = new Intl.DateTimeFormat(props.locale, {
    dateStyle: props.format as 'short' | 'medium' | 'long' | 'full',
  })
  return formatter.format(modelValue.value)
})

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const isDateDisabled = (date: Date) => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return false
}

const prevMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

const selectDate = (day: typeof calendarDays.value[0]) => {
  if (day.isDisabled) return
  modelValue.value = day.date
  close()
}

const clear = () => {
  modelValue.value = null
}

// Generate accessible label for a date
const getDateLabel = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat(props.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formatter.format(date)
}
</script>

<template>
  <div class="relative">
    <button
      :id="triggerId"
      ref="triggerRef"
      type="button"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-haspopup="'dialog'"
      :aria-controls="calendarId"
      :class="[
        'flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm text-left transition',
        disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950'
          : isOpen
            ? 'border-primary ring-2 ring-primary/20 bg-white dark:bg-gray-900'
            : 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900',
        modelValue ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500',
      ]"
      @click="toggle"
    >
      <span class="flex-1 truncate">{{ displayValue || placeholder }}</span>
      <div class="flex items-center gap-1">
        <button
          v-if="modelValue"
          type="button"
          class="rounded p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Clear date"
          @click.stop="clear"
        >
          <Icon
            icon="lucide:x"
            class="size-4 text-gray-400"
            aria-hidden="true"
          />
        </button>
        <Icon
          icon="lucide:calendar"
          class="size-4 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </button>

    <Teleport
      to="body"
      :disabled="!teleport"
    >
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          :id="calendarId"
          ref="calendarRef"
          role="dialog"
          aria-modal="true"
          :aria-label="`Choose date, ${monthYear}`"
          :style="dropdownStyle"
          class="z-9999 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <!-- Header -->
          <div class="mb-4 flex items-center justify-between">
            <button
              type="button"
              class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous month"
              @click="prevMonth"
            >
              <Icon
                icon="lucide:chevron-left"
                class="size-5 text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </button>
            <span
              class="font-medium text-gray-900 dark:text-white"
              aria-live="polite"
              aria-atomic="true"
            >
              {{ monthYear }}
            </span>
            <button
              type="button"
              class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next month"
              @click="nextMonth"
            >
              <Icon
                icon="lucide:chevron-right"
                class="size-5 text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- Week days -->
          <div
            class="mb-2 grid grid-cols-7 gap-1"
            role="row"
          >
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
              role="columnheader"
              :abbr="day"
            >
              {{ day }}
            </div>
          </div>

          <!-- Days grid -->
          <div
            :id="gridId"
            class="grid grid-cols-7 gap-1"
            role="grid"
            :aria-label="monthYear"
          >
            <button
              v-for="(day, index) in calendarDays"
              :key="index"
              type="button"
              role="gridcell"
              :aria-label="getDateLabel(day.date)"
              :aria-selected="day.isSelected"
              :aria-disabled="day.isDisabled || undefined"
              :disabled="day.isDisabled"
              :class="[
                'size-8 rounded text-sm transition',
                day.isDisabled && 'cursor-not-allowed opacity-30',
                !day.isCurrentMonth && 'text-gray-400 dark:text-gray-600',
                day.isCurrentMonth && !day.isSelected && !day.isToday && 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                day.isToday && !day.isSelected && 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-700 dark:text-white',
                day.isSelected && 'bg-primary text-white font-semibold',
              ]"
              @click="selectDate(day)"
            >
              {{ day.date.getDate() }}
            </button>
          </div>

          <!-- Today button -->
          <div class="mt-4 border-t border-gray-200 pt-3 dark:border-gray-700">
            <button
              type="button"
              class="w-full rounded py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
              @click="selectDate({ date: new Date(), isCurrentMonth: true, isToday: true, isSelected: false, isDisabled: false })"
            >
              Today
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
