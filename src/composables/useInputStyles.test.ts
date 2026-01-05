import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useInputStyles } from './useInputStyles'

// Helper to flatten class arrays and check if a class is present
const hasClass = (classes: string[], className: string) => {
  return classes.some(c => c.includes(className))
}

describe('useInputStyles', () => {
  describe('inputClass', () => {
    it('returns base classes', () => {
      const { inputClass } = useInputStyles()

      expect(hasClass(inputClass.value, 'w-full')).toBe(true)
      expect(hasClass(inputClass.value, 'rounded-md')).toBe(true)
      expect(hasClass(inputClass.value, 'border')).toBe(true)
      expect(hasClass(inputClass.value, 'text-sm')).toBe(true)
      expect(hasClass(inputClass.value, 'transition-all')).toBe(true)
    })

    it('applies default (medium) size classes', () => {
      const { inputClass } = useInputStyles()

      expect(hasClass(inputClass.value, 'py-2')).toBe(true)
      expect(hasClass(inputClass.value, 'text-sm')).toBe(true)
    })

    it('applies small size classes', () => {
      const { inputClass } = useInputStyles({ size: 'sm' })

      expect(hasClass(inputClass.value, 'py-1.5')).toBe(true)
      expect(hasClass(inputClass.value, 'text-xs')).toBe(true)
    })

    it('applies large size classes', () => {
      const { inputClass } = useInputStyles({ size: 'lg' })

      expect(hasClass(inputClass.value, 'py-3')).toBe(true)
      expect(hasClass(inputClass.value, 'text-base')).toBe(true)
    })

    it('applies disabled state classes', () => {
      const { inputClass } = useInputStyles({ disabled: true })

      expect(hasClass(inputClass.value, 'cursor-not-allowed')).toBe(true)
      expect(hasClass(inputClass.value, 'border-gray-200')).toBe(true)
      expect(hasClass(inputClass.value, 'bg-gray-50')).toBe(true)
      expect(hasClass(inputClass.value, 'text-gray-500')).toBe(true)
    })

    it('applies invalid state classes', () => {
      const { inputClass } = useInputStyles({ invalid: true })

      expect(hasClass(inputClass.value, 'border-red-500')).toBe(true)
    })

    it('applies focused state classes', () => {
      const { inputClass } = useInputStyles({ focused: true })

      expect(hasClass(inputClass.value, 'border-primary')).toBe(true)
      expect(hasClass(inputClass.value, 'ring-2')).toBe(true)
      expect(hasClass(inputClass.value, 'ring-primary/20')).toBe(true)
    })

    it('applies left padding when hasLeftIcon is true', () => {
      const { inputClass } = useInputStyles({ hasLeftIcon: true })

      expect(hasClass(inputClass.value, 'pl-10')).toBe(true)
    })

    it('applies right padding when hasRightIcon is true', () => {
      const { inputClass } = useInputStyles({ hasRightIcon: true })

      expect(hasClass(inputClass.value, 'pr-10')).toBe(true)
    })

    it('applies default padding when no icons', () => {
      const { inputClass } = useInputStyles()

      expect(hasClass(inputClass.value, 'px-3')).toBe(true)
    })

    it('reacts to ref changes', async () => {
      const disabled = ref(false)
      const { inputClass } = useInputStyles({ disabled })

      expect(hasClass(inputClass.value, 'cursor-not-allowed')).toBe(false)

      disabled.value = true

      expect(hasClass(inputClass.value, 'cursor-not-allowed')).toBe(true)
    })
  })

  describe('triggerClass', () => {
    it('returns base trigger classes', () => {
      const { triggerClass } = useInputStyles()

      expect(hasClass(triggerClass.value, 'flex')).toBe(true)
      expect(hasClass(triggerClass.value, 'items-center')).toBe(true)
      expect(hasClass(triggerClass.value, 'justify-between')).toBe(true)
      expect(hasClass(triggerClass.value, 'text-left')).toBe(true)
      expect(hasClass(triggerClass.value, 'rounded-md')).toBe(true)
      expect(hasClass(triggerClass.value, 'border')).toBe(true)
    })

    it('applies placeholder color when hasValue is false', () => {
      const { triggerClass } = useInputStyles({ hasValue: false })

      expect(hasClass(triggerClass.value, 'text-gray-400')).toBe(true)
    })

    it('applies normal text color when hasValue is true', () => {
      const { triggerClass } = useInputStyles({ hasValue: true })

      expect(hasClass(triggerClass.value, 'text-gray-800')).toBe(true)
    })

    it('applies focused state for open dropdowns', () => {
      const { triggerClass } = useInputStyles({ focused: true })

      expect(hasClass(triggerClass.value, 'border-primary')).toBe(true)
      expect(hasClass(triggerClass.value, 'ring-2')).toBe(true)
    })
  })

  describe('wrapperClass', () => {
    it('returns base wrapper classes', () => {
      const { wrapperClass } = useInputStyles()

      expect(hasClass(wrapperClass.value, 'flex')).toBe(true)
      expect(hasClass(wrapperClass.value, 'flex-wrap')).toBe(true)
      expect(hasClass(wrapperClass.value, 'items-center')).toBe(true)
      expect(hasClass(wrapperClass.value, 'rounded-md')).toBe(true)
      expect(hasClass(wrapperClass.value, 'border')).toBe(true)
    })

    it('applies small wrapper size', () => {
      const { wrapperClass } = useInputStyles({ size: 'sm' })

      expect(hasClass(wrapperClass.value, 'min-h-9')).toBe(true)
    })

    it('applies medium wrapper size', () => {
      const { wrapperClass } = useInputStyles({ size: 'md' })

      expect(hasClass(wrapperClass.value, 'min-h-11')).toBe(true)
    })

    it('applies large wrapper size', () => {
      const { wrapperClass } = useInputStyles({ size: 'lg' })

      expect(hasClass(wrapperClass.value, 'min-h-13')).toBe(true)
    })

    it('applies disabled state', () => {
      const { wrapperClass } = useInputStyles({ disabled: true })

      expect(hasClass(wrapperClass.value, 'cursor-not-allowed')).toBe(true)
      expect(hasClass(wrapperClass.value, 'bg-gray-50')).toBe(true)
    })

    it('applies focus-within styles when not disabled', () => {
      const { wrapperClass } = useInputStyles({ disabled: false })

      expect(hasClass(wrapperClass.value, 'focus-within:border-primary')).toBe(true)
      expect(hasClass(wrapperClass.value, 'focus-within:ring-2')).toBe(true)
    })
  })

  describe('iconClass', () => {
    it('returns icon classes', () => {
      const { iconClass } = useInputStyles()

      expect(iconClass.value).toContain('size-4')
      expect(iconClass.value).toContain('text-gray-400')
    })
  })

  describe('priority of states', () => {
    it('disabled takes priority over invalid', () => {
      const { inputClass } = useInputStyles({ disabled: true, invalid: true })

      expect(hasClass(inputClass.value, 'cursor-not-allowed')).toBe(true)
      expect(hasClass(inputClass.value, 'bg-gray-50')).toBe(true)
    })

    it('invalid takes priority over focused', () => {
      const { inputClass } = useInputStyles({ invalid: true, focused: true })

      expect(hasClass(inputClass.value, 'border-red-500')).toBe(true)
    })
  })
})
