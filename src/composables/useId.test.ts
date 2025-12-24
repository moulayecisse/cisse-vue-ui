import { describe, it, expect, beforeEach } from 'vitest'
import { useId, generateId, resetIdCounter } from './useId'

describe('useId', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  describe('generateId', () => {
    it('generates unique IDs with default prefix', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).toBe('cisse-id-1')
      expect(id2).toBe('cisse-id-2')
    })

    it('generates IDs with custom prefix', () => {
      const id = generateId('modal')
      expect(id).toBe('cisse-modal-1')
    })

    it('increments counter across different prefixes', () => {
      const id1 = generateId('modal')
      const id2 = generateId('button')

      expect(id1).toBe('cisse-modal-1')
      expect(id2).toBe('cisse-button-2')
    })
  })

  describe('resetIdCounter', () => {
    it('resets the counter to 0', () => {
      generateId()
      generateId()
      resetIdCounter()
      const id = generateId()

      expect(id).toBe('cisse-id-1')
    })
  })

  describe('useId composable', () => {
    it('returns a reactive ID', () => {
      const { id } = useId()
      expect(id.value).toBe('cisse-id-1')
    })

    it('uses custom prefix', () => {
      const { id } = useId({ prefix: 'dialog' })
      expect(id.value).toBe('cisse-dialog-1')
    })

    it('uses custom ID when provided', () => {
      const { id } = useId({ id: 'my-custom-id' })
      expect(id.value).toBe('my-custom-id')
    })

    it('generates related IDs with suffix', () => {
      const { id, related } = useId({ prefix: 'modal' })

      expect(id.value).toBe('cisse-modal-1')
      expect(related('title')).toBe('cisse-modal-1-title')
      expect(related('description')).toBe('cisse-modal-1-description')
      expect(related('close-btn')).toBe('cisse-modal-1-close-btn')
    })

    it('related IDs work with custom ID', () => {
      const { related } = useId({ id: 'custom' })

      expect(related('label')).toBe('custom-label')
      expect(related('help')).toBe('custom-help')
    })

    it('each useId call gets a unique ID', () => {
      const { id: id1 } = useId({ prefix: 'input' })
      const { id: id2 } = useId({ prefix: 'input' })
      const { id: id3 } = useId({ prefix: 'input' })

      expect(id1.value).toBe('cisse-input-1')
      expect(id2.value).toBe('cisse-input-2')
      expect(id3.value).toBe('cisse-input-3')
    })
  })
})
