import { describe, it, expect } from 'vitest'
import * as LayoutComponents from './index'

describe('Layout components index', () => {
  it('exports all layout components', () => {
    expect(LayoutComponents.BaseLayout).toBeDefined()
    expect(LayoutComponents.PageLayout).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      LayoutComponents.BaseLayout,
      LayoutComponents.PageLayout,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
