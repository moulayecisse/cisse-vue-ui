import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { useDarkMode } from './useDarkMode'

describe('useDarkMode', () => {
  let originalLocalStorage: Storage
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalLocalStorage = window.localStorage
    originalMatchMedia = window.matchMedia

    // Mock localStorage
    const storage: Record<string, string> = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => storage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          storage[key] = value
        }),
        removeItem: vi.fn((key: string) => {
          delete storage[key]
        }),
        clear: vi.fn(() => {
          Object.keys(storage).forEach((key) => delete storage[key])
        }),
      },
      writable: true,
    })

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    })

    // Setup DOM
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage, writable: true })
    Object.defineProperty(window, 'matchMedia', { value: originalMatchMedia, writable: true })
  })

  it('returns isDark, toggle, and set', () => {
    const { isDark, toggle, set } = useDarkMode()
    expect(isDark).toBeDefined()
    expect(typeof toggle).toBe('function')
    expect(typeof set).toBe('function')
  })

  it('uses defaultValue when no stored value', () => {
    const { isDark } = useDarkMode({ defaultValue: true })
    expect(isDark.value).toBe(true)
  })

  it('toggle switches dark mode', async () => {
    const { isDark, toggle } = useDarkMode({ defaultValue: false })
    expect(isDark.value).toBe(false)

    toggle()
    await nextTick()
    expect(isDark.value).toBe(true)

    toggle()
    await nextTick()
    expect(isDark.value).toBe(false)
  })

  it('set changes dark mode value', async () => {
    const { isDark, set } = useDarkMode({ defaultValue: false })
    expect(isDark.value).toBe(false)

    set(true)
    await nextTick()
    expect(isDark.value).toBe(true)

    set(false)
    await nextTick()
    expect(isDark.value).toBe(false)
  })

  it('saves to localStorage when value changes', async () => {
    const { set } = useDarkMode({ storageKey: 'test-dark-mode' })

    set(true)
    await nextTick()

    expect(localStorage.setItem).toHaveBeenCalledWith('test-dark-mode', 'true')
  })

  it('updates DOM class when value changes', async () => {
    const { set } = useDarkMode({ selector: 'html', attribute: 'class' })

    set(true)
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    set(false)
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('updates DOM attribute when using custom attribute', async () => {
    const testDiv = document.createElement('div')
    testDiv.id = 'test-element'
    document.body.appendChild(testDiv)

    const { set } = useDarkMode({ selector: '#test-element', attribute: 'data-theme' })

    set(true)
    await nextTick()
    expect(testDiv.getAttribute('data-theme')).toBe('dark')

    set(false)
    await nextTick()
    expect(testDiv.getAttribute('data-theme')).toBe('light')

    document.body.removeChild(testDiv)
  })

  it('uses custom storage key', async () => {
    const { set } = useDarkMode({ storageKey: 'my-custom-key' })

    set(true)
    await nextTick()

    expect(localStorage.setItem).toHaveBeenCalledWith('my-custom-key', 'true')
  })
})
