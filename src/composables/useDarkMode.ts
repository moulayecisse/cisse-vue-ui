import { ref, watch, onMounted } from 'vue'

export interface DarkModeOptions {
  selector?: string
  attribute?: string
  storageKey?: string
  defaultValue?: boolean
}

/**
 * Composable for managing dark mode state
 */
export function useDarkMode(options: DarkModeOptions = {}) {
  const {
    selector = 'html',
    attribute = 'class',
    storageKey = 'dark-mode',
    defaultValue = false,
  } = options

  const isDark = ref(defaultValue)

  const getInitialValue = (): boolean => {
    if (typeof window === 'undefined') return defaultValue

    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      return stored === 'true'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const updateDOM = (dark: boolean) => {
    if (typeof document === 'undefined') return

    const element = document.querySelector(selector)
    if (!element) return

    if (attribute === 'class') {
      element.classList.toggle('dark', dark)
    } else {
      element.setAttribute(attribute, dark ? 'dark' : 'light')
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
  }

  const set = (value: boolean) => {
    isDark.value = value
  }

  watch(isDark, (newValue) => {
    updateDOM(newValue)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, String(newValue))
    }
  })

  onMounted(() => {
    isDark.value = getInitialValue()
    updateDOM(isDark.value)
  })

  return {
    isDark,
    toggle,
    set,
  }
}
