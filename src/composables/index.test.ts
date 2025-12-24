import { describe, it, expect } from 'vitest'
import * as Composables from './index'

describe('Composables index', () => {
  it('exports all composables', () => {
    expect(Composables.useNotifications).toBeDefined()
    expect(Composables.useDarkMode).toBeDefined()
    expect(Composables.useExportCSV).toBeDefined()
    expect(Composables.useDropdown).toBeDefined()
    expect(Composables.useModal).toBeDefined()
    expect(Composables.useModals).toBeDefined()
    expect(Composables.useToast).toBeDefined()
    expect(Composables.useId).toBeDefined()
    expect(Composables.useFocusTrap).toBeDefined()
  })

  it('exports composables as functions', () => {
    expect(typeof Composables.useNotifications).toBe('function')
    expect(typeof Composables.useDarkMode).toBe('function')
    expect(typeof Composables.useExportCSV).toBe('function')
    expect(typeof Composables.useDropdown).toBe('function')
    expect(typeof Composables.useModal).toBe('function')
    expect(typeof Composables.useModals).toBe('function')
    expect(typeof Composables.useToast).toBe('function')
    expect(typeof Composables.useId).toBe('function')
    expect(typeof Composables.useFocusTrap).toBe('function')
  })

  it('exports utility functions', () => {
    expect(typeof Composables.generateId).toBe('function')
    expect(typeof Composables.resetIdCounter).toBe('function')
  })
})
