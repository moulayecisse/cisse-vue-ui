import { describe, it, expect } from 'vitest'
import * as LayoutComponents from './index'

describe('Layout components index', () => {
  it('exports all layout components', () => {
    expect(LayoutComponents.AuthLayout).toBeDefined()
    expect(LayoutComponents.BaseLayout).toBeDefined()
    expect(LayoutComponents.PageLayout).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      LayoutComponents.AuthLayout,
      LayoutComponents.BaseLayout,
      LayoutComponents.PageLayout,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
