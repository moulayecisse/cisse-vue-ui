import { describe, it, expect } from 'vitest'
import * as Library from './index'

describe('Main library index', () => {
  it('exports components', () => {
    // Core
    expect(Library.Button).toBeDefined()
    expect(Library.CardComponent).toBeDefined()
    expect(Library.TableComponent).toBeDefined()

    // Form
    expect(Library.FormInput).toBeDefined()
    expect(Library.FormSelect).toBeDefined()

    // Feedback
    expect(Library.Modal).toBeDefined()
    expect(Library.Alert).toBeDefined()

    // Layout
    expect(Library.BaseLayout).toBeDefined()

    // Type
    expect(Library.TextType).toBeDefined()
  })

  it('exports composables', () => {
    expect(Library.useNotifications).toBeDefined()
    expect(Library.useDarkMode).toBeDefined()
    expect(Library.useExportCSV).toBeDefined()
    expect(Library.useDropdown).toBeDefined()
    expect(Library.useModal).toBeDefined()
    expect(Library.useToast).toBeDefined()
    expect(Library.useId).toBeDefined()
    expect(Library.useFocusTrap).toBeDefined()
  })

  it('exports Vue plugin', () => {
    expect(Library.VueTailwindUI).toBeDefined()
    expect(typeof Library.VueTailwindUI.install).toBe('function')
  })
})
