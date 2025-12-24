import { describe, it, expect } from 'vitest'
import * as Components from './index'

describe('Components index', () => {
  it('exports core components', () => {
    expect(Components.Button).toBeDefined()
    expect(Components.CardComponent).toBeDefined()
    expect(Components.TableComponent).toBeDefined()
    expect(Components.Tabs).toBeDefined()
  })

  it('exports form components', () => {
    expect(Components.FormInput).toBeDefined()
    expect(Components.FormSelect).toBeDefined()
    expect(Components.Switch).toBeDefined()
    expect(Components.Checkbox).toBeDefined()
  })

  it('exports feedback components', () => {
    expect(Components.Modal).toBeDefined()
    expect(Components.Alert).toBeDefined()
    expect(Components.Toast).toBeDefined()
    expect(Components.LoadingSpinner).toBeDefined()
  })

  it('exports layout components', () => {
    expect(Components.BaseLayout).toBeDefined()
    expect(Components.PageLayout).toBeDefined()
  })

  it('exports type components', () => {
    expect(Components.TextType).toBeDefined()
    expect(Components.NumberType).toBeDefined()
    expect(Components.DateType).toBeDefined()
    expect(Components.BooleanType).toBeDefined()
    expect(Components.BadgeType).toBeDefined()
  })
})
