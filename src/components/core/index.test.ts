import { describe, it, expect } from 'vitest'
import * as CoreComponents from './index'

describe('Core components index', () => {
  it('exports all core components', () => {
    expect(CoreComponents.CardComponent).toBeDefined()
    expect(CoreComponents.TableComponent).toBeDefined()
    expect(CoreComponents.MobileList).toBeDefined()
    expect(CoreComponents.ResponsiveList).toBeDefined()
    expect(CoreComponents.AutocompleteComponent).toBeDefined()
    expect(CoreComponents.MenuItem).toBeDefined()
    expect(CoreComponents.TableAction).toBeDefined()
    expect(CoreComponents.StatusBadge).toBeDefined()
    expect(CoreComponents.Button).toBeDefined()
    expect(CoreComponents.Avatar).toBeDefined()
    expect(CoreComponents.Tabs).toBeDefined()
    expect(CoreComponents.TabPanel).toBeDefined()
    expect(CoreComponents.Dropdown).toBeDefined()
    expect(CoreComponents.Stepper).toBeDefined()
    expect(CoreComponents.CollapsibleCard).toBeDefined()
    expect(CoreComponents.Tooltip).toBeDefined()
    expect(CoreComponents.Popover).toBeDefined()
    expect(CoreComponents.Drawer).toBeDefined()
    expect(CoreComponents.Breadcrumb).toBeDefined()
    expect(CoreComponents.Accordion).toBeDefined()
    expect(CoreComponents.AccordionItem).toBeDefined()
    expect(CoreComponents.Timeline).toBeDefined()
    expect(CoreComponents.DarkModeToggle).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      CoreComponents.CardComponent,
      CoreComponents.TableComponent,
      CoreComponents.Button,
      CoreComponents.Avatar,
      CoreComponents.Tabs,
      CoreComponents.TabPanel,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
