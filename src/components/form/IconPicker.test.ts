import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import IconPicker from './IconPicker.vue'
import { nextTick } from 'vue'

// Mock fetch for icon search
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('IconPicker', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    mockFetch.mockReset()
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ icons: ['mdi:home', 'mdi:star', 'mdi:heart'] }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders trigger button', () => {
      const wrapper = mount(IconPicker)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders placeholder when no value', () => {
      const wrapper = mount(IconPicker, {
        props: { placeholder: 'Select an icon' },
      })
      expect(wrapper.text()).toContain('Select an icon')
    })

    it('renders default placeholder', () => {
      const wrapper = mount(IconPicker)
      expect(wrapper.text()).toContain('Rechercher une icône')
    })

    it('renders label when provided', () => {
      const wrapper = mount(IconPicker, {
        props: { label: 'Choose Icon' },
      })
      expect(wrapper.text()).toContain('Choose Icon')
    })

    it('renders required indicator', () => {
      const wrapper = mount(IconPicker, {
        props: { label: 'Icon', required: true },
      })
      expect(wrapper.text()).toContain('*')
    })

    it('renders help text', () => {
      const wrapper = mount(IconPicker, {
        props: { help: 'Select an icon for your item' },
      })
      expect(wrapper.text()).toContain('Select an icon for your item')
    })
  })

  describe('Selected Value', () => {
    it('displays selected icon', () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart' },
      })
      expect(wrapper.text()).toContain('mdi:heart')
    })

    it('shows icon preview when value selected', () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart' },
      })
      // Should have the icon wrapper
      expect(wrapper.find('.size-8').exists()).toBe(true)
    })

    it('shows clear button when value selected', () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart' },
      })
      // Clear button exists when there's a value
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThan(1)
    })

    it('clears value on clear button click', async () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart' },
      })

      // Find clear button (nested button with x icon)
      const clearButton = wrapper.find('button button')
      await clearButton.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    })
  })

  describe('Dropdown', () => {
    it('opens dropdown on click', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      expect(document.body.querySelector('.fixed.inset-0')).toBeTruthy()
    })

    it('closes dropdown on backdrop click', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const backdrop = document.body.querySelector('.fixed.inset-0') as HTMLElement
      backdrop?.click()
      await flushPromises()

      expect(document.body.querySelector('.fixed.inset-0')).toBeFalsy()
    })

    it('shows search input in dropdown', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]')
      expect(searchInput).toBeTruthy()
    })

    it('shows popular icons by default', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const grid = document.body.querySelector('.grid')
      expect(grid).toBeTruthy()
      // Popular icons are displayed
      const iconButtons = grid?.querySelectorAll('button')
      expect(iconButtons?.length).toBeGreaterThan(0)
    })

    it('shows close button', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      expect(document.body.textContent).toContain('Fermer')
    })
  })

  describe('Icon Selection', () => {
    it('emits update:modelValue when icon selected', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      // Click first icon in grid
      const grid = document.body.querySelector('.grid')
      const firstIcon = grid?.querySelector('button') as HTMLElement
      firstIcon?.click()
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('closes dropdown after selection', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const grid = document.body.querySelector('.grid')
      const firstIcon = grid?.querySelector('button') as HTMLElement
      firstIcon?.click()
      await flushPromises()

      expect(document.body.querySelector('.fixed.inset-0')).toBeFalsy()
    })

    it('highlights selected icon in grid', async () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart' },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      // Find the selected icon button (has bg-primary class)
      const selectedButton = document.body.querySelector('.grid button.bg-primary')
      expect(selectedButton).toBeTruthy()
    })
  })

  describe('Search', () => {
    // Helper to wait for debounce (300ms) + some buffer
    const waitForDebounce = () => new Promise((resolve) => setTimeout(resolve, 350))

    it('searches icons when typing', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'home'
      searchInput.dispatchEvent(new Event('input'))

      // Wait for debounce
      await waitForDebounce()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalled()
    })

    it('does not search for queries less than 2 characters', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'h'
      searchInput.dispatchEvent(new Event('input'))

      await waitForDebounce()
      await flushPromises()

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('uses custom collections in search', async () => {
      const wrapper = mount(IconPicker, {
        props: { collections: ['heroicons'] },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'home'
      searchInput.dispatchEvent(new Event('input'))

      await waitForDebounce()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('prefixes=heroicons'))
    })

    it('uses custom limit in search', async () => {
      const wrapper = mount(IconPicker, {
        props: { limit: 24 },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'home'
      searchInput.dispatchEvent(new Event('input'))

      await waitForDebounce()
      await flushPromises()

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('limit=24'))
    })

    it('falls back to popular icons when search returns empty', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ icons: [] }),
      })

      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'xyznonexistent'
      searchInput.dispatchEvent(new Event('input'))

      await waitForDebounce()
      await flushPromises()
      await nextTick()

      // When search returns empty, component falls back to popular icons
      const grid = document.body.querySelector('.grid')
      const iconButtons = grid?.querySelectorAll('button')
      // Popular icons should still be displayed
      expect(iconButtons?.length).toBeGreaterThan(0)
    })
  })

  describe('Disabled State', () => {
    it('has disabled attribute when disabled', () => {
      const wrapper = mount(IconPicker, {
        props: { disabled: true },
      })

      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('does not open dropdown when disabled', async () => {
      const wrapper = mount(IconPicker, {
        props: { disabled: true },
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      expect(document.body.querySelector('.fixed.inset-0')).toBeFalsy()
    })

    it('applies disabled styling', () => {
      const wrapper = mount(IconPicker, {
        props: { disabled: true },
      })

      expect(wrapper.find('button').classes()).toContain('cursor-not-allowed')
    })

    it('does not show clear button when disabled', () => {
      const wrapper = mount(IconPicker, {
        props: { modelValue: 'mdi:heart', disabled: true },
      })

      // Only the main trigger button should exist
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBe(1)
    })
  })

  describe('Error State', () => {
    it('shows error message', () => {
      const wrapper = mount(IconPicker, {
        props: { error: 'Please select an icon' },
      })

      expect(wrapper.text()).toContain('Please select an icon')
    })

    it('applies error styling to trigger', () => {
      const wrapper = mount(IconPicker, {
        props: { error: 'Error message' },
      })

      expect(wrapper.find('button').classes()).toContain('border-red-500')
    })

    it('has aria-invalid when error present', () => {
      const wrapper = mount(IconPicker, {
        props: { error: 'Error message' },
      })

      expect(wrapper.find('button').attributes('aria-invalid')).toBe('true')
    })

    it('has aria-describedby referencing error', () => {
      const wrapper = mount(IconPicker, {
        props: { error: 'Error message' },
      })

      const ariaDescribedby = wrapper.find('button').attributes('aria-describedby')
      expect(ariaDescribedby).toBeDefined()
    })

    it('does not show help when error is present', () => {
      const wrapper = mount(IconPicker, {
        props: { help: 'Help text', error: 'Error message' },
      })

      expect(wrapper.text()).not.toContain('Help text')
      expect(wrapper.text()).toContain('Error message')
    })
  })

  describe('Accessibility', () => {
    it('trigger has type="button"', () => {
      const wrapper = mount(IconPicker)
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })

    it('has ID for label association', () => {
      const wrapper = mount(IconPicker, {
        props: { label: 'Icon' },
      })

      const buttonId = wrapper.find('button').attributes('id')
      expect(buttonId).toBeDefined()
    })

    it('search input has autofocus in dropdown', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]')
      expect(searchInput?.hasAttribute('autofocus')).toBe(true)
    })

    it('icon buttons have title attribute', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const iconButton = document.body.querySelector('.grid button')
      expect(iconButton?.hasAttribute('title')).toBe(true)
    })
  })

  describe('Custom ID', () => {
    it('uses custom ID when provided', () => {
      const wrapper = mount(IconPicker, {
        props: { id: 'my-icon-picker' },
      })

      expect(wrapper.find('button').attributes('id')).toBe('my-icon-picker')
    })
  })

  describe('Footer', () => {
    const waitForDebounce = () => new Promise((resolve) => setTimeout(resolve, 350))

    it('shows result count when searching', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      const searchInput = document.body.querySelector('input[type="text"]') as HTMLInputElement
      searchInput.value = 'home'
      searchInput.dispatchEvent(new Event('input'))

      await waitForDebounce()
      await flushPromises()
      await nextTick()

      expect(document.body.textContent).toContain('résultats')
    })

    it('shows "Icônes populaires" when not searching', async () => {
      const wrapper = mount(IconPicker, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await flushPromises()

      expect(document.body.textContent).toContain('Icônes populaires')
    })
  })
})
