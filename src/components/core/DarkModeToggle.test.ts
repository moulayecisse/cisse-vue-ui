import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DarkModeToggle from './DarkModeToggle.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('DarkModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
  })

  it('renders with default size', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('p-2')
  })

  it('renders small size', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { size: 'sm' },
    })
    expect(wrapper.find('button').classes()).toContain('p-1.5')
  })

  it('renders large size', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { size: 'lg' },
    })
    expect(wrapper.find('button').classes()).toContain('p-2.5')
  })

  it('shows label when showLabel is true', () => {
    const wrapper = mount(DarkModeToggle, {
      props: { showLabel: true },
    })
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('hides label by default', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('toggles dark mode on click', async () => {
    const wrapper = mount(DarkModeToggle)
    await wrapper.find('button').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await wrapper.find('button').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('has correct aria-label for light mode', () => {
    const wrapper = mount(DarkModeToggle)
    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('has correct aria-label for dark mode', async () => {
    const wrapper = mount(DarkModeToggle)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to light mode')
  })

  it('uses custom storage key', () => {
    mount(DarkModeToggle, {
      props: { storageKey: 'custom-dark-mode' },
    })
    expect(localStorageMock.getItem).toHaveBeenCalledWith('custom-dark-mode')
  })
})
