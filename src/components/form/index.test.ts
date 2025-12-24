import { describe, it, expect } from 'vitest'
import * as FormComponents from './index'

describe('Form components index', () => {
  it('exports all form components', () => {
    expect(FormComponents.FormLabel).toBeDefined()
    expect(FormComponents.FormHelp).toBeDefined()
    expect(FormComponents.FormInput).toBeDefined()
    expect(FormComponents.FormSelect).toBeDefined()
    expect(FormComponents.FormGroup).toBeDefined()
    expect(FormComponents.SearchInput).toBeDefined()
    expect(FormComponents.Switch).toBeDefined()
    expect(FormComponents.Checkbox).toBeDefined()
    expect(FormComponents.Slider).toBeDefined()
    expect(FormComponents.DatePicker).toBeDefined()
    expect(FormComponents.FileUpload).toBeDefined()
    expect(FormComponents.Rating).toBeDefined()
    expect(FormComponents.ColorPicker).toBeDefined()
    expect(FormComponents.RangeSlider).toBeDefined()
    expect(FormComponents.Combobox).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      FormComponents.FormLabel,
      FormComponents.FormHelp,
      FormComponents.FormInput,
      FormComponents.FormSelect,
      FormComponents.Switch,
      FormComponents.Checkbox,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
