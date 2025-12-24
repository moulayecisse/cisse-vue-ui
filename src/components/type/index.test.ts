import { describe, it, expect } from 'vitest'
import * as TypeComponents from './index'

describe('Type components index', () => {
  it('exports all type display components', () => {
    expect(TypeComponents.TextType).toBeDefined()
    expect(TypeComponents.NumberType).toBeDefined()
    expect(TypeComponents.DateType).toBeDefined()
    expect(TypeComponents.BooleanType).toBeDefined()
    expect(TypeComponents.BadgeType).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      TypeComponents.TextType,
      TypeComponents.NumberType,
      TypeComponents.DateType,
      TypeComponents.BooleanType,
      TypeComponents.BadgeType,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
