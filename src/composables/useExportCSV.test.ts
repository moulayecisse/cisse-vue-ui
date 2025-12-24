import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useExportCSV } from './useExportCSV'

describe('useExportCSV', () => {
  let originalCreateObjectURL: typeof URL.createObjectURL
  let originalRevokeObjectURL: typeof URL.revokeObjectURL
  let appendChildSpy: ReturnType<typeof vi.spyOn>
  let removeChildSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    originalCreateObjectURL = URL.createObjectURL
    originalRevokeObjectURL = URL.revokeObjectURL

    URL.createObjectURL = vi.fn(() => 'blob:test-url')
    URL.revokeObjectURL = vi.fn()

    appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node)
    removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node)
  })

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
  })

  describe('escapeCSV', () => {
    it('returns empty string for null', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV(null)).toBe('')
    })

    it('returns empty string for undefined', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV(undefined)).toBe('')
    })

    it('returns string value as-is when no special characters', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV('hello')).toBe('hello')
      expect(escapeCSV('world')).toBe('world')
    })

    it('wraps value with quotes when contains comma', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV('hello, world')).toBe('"hello, world"')
    })

    it('wraps value with quotes when contains newline', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV('hello\nworld')).toBe('"hello\nworld"')
    })

    it('escapes double quotes by doubling them', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV('say "hello"')).toBe('"say ""hello"""')
    })

    it('converts numbers to strings', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV(123)).toBe('123')
      expect(escapeCSV(45.67)).toBe('45.67')
    })

    it('converts booleans to strings', () => {
      const { escapeCSV } = useExportCSV()
      expect(escapeCSV(true)).toBe('true')
      expect(escapeCSV(false)).toBe('false')
    })
  })

  describe('exportToCSV', () => {
    it('warns and returns early when data is empty', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { exportToCSV } = useExportCSV()

      exportToCSV([], [{ key: 'name', label: 'Name' }])

      expect(warnSpy).toHaveBeenCalledWith('No data to export')
      warnSpy.mockRestore()
    })

    it('warns and returns early when data is null-ish', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { exportToCSV } = useExportCSV()

      // @ts-expect-error - testing null input
      exportToCSV(null, [{ key: 'name', label: 'Name' }])

      expect(warnSpy).toHaveBeenCalledWith('No data to export')
      warnSpy.mockRestore()
    })

    it('creates a download link with correct attributes', () => {
      const { exportToCSV } = useExportCSV()
      const clickSpy = vi.fn()
      const originalCreateElement = document.createElement.bind(document)

      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        const element = originalCreateElement(tagName)
        if (tagName === 'a') {
          element.click = clickSpy
        }
        return element
      })

      const data = [{ name: 'John', age: 30 }]
      const columns = [
        { key: 'name' as const, label: 'Name' },
        { key: 'age' as const, label: 'Age' },
      ]

      exportToCSV(data, columns, 'test.csv')

      expect(clickSpy).toHaveBeenCalled()
      expect(URL.createObjectURL).toHaveBeenCalled()
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url')
    })

    it('generates correct CSV content with headers and data', () => {
      const { exportToCSV } = useExportCSV()
      let capturedBlob: Blob | null = null

      URL.createObjectURL = vi.fn((blob: Blob) => {
        capturedBlob = blob
        return 'blob:test-url'
      })

      const data = [
        { name: 'John', city: 'New York' },
        { name: 'Jane', city: 'Los Angeles' },
      ]
      const columns = [
        { key: 'name' as const, label: 'Name' },
        { key: 'city' as const, label: 'City' },
      ]

      exportToCSV(data, columns, 'test.csv')

      expect(capturedBlob).not.toBeNull()
      // Verify it's a blob with CSV content
      expect(capturedBlob!.type).toBe('text/csv;charset=utf-8;')
    })

    it('uses default filename when not provided', () => {
      const { exportToCSV } = useExportCSV()
      let downloadAttribute = ''
      const originalCreateElement = document.createElement.bind(document)

      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        const element = originalCreateElement(tagName)
        if (tagName === 'a') {
          const originalSetAttribute = element.setAttribute.bind(element)
          element.setAttribute = (name: string, value: string) => {
            if (name === 'download') downloadAttribute = value
            originalSetAttribute(name, value)
          }
          element.click = vi.fn()
        }
        return element
      })

      const data = [{ name: 'John' }]
      const columns = [{ key: 'name' as const, label: 'Name' }]

      exportToCSV(data, columns)

      expect(downloadAttribute).toBe('export.csv')
    })
  })
})
