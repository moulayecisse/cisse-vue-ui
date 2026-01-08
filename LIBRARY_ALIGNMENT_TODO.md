# Library Alignment TODO

Tracking alignment between **cisse-vue-ui** (Vue 3) and **ui-bundle** (Symfony/Twig).

**Goal:** Both libraries should have the same components with consistent visual design (using cisse-vue-ui styling as reference).

**Last Updated:** 2026-01-08

---

## Progress Summary

| Phase | Status | Details |
|-------|--------|---------|
| Phase 1: Vue additions | ✅ Complete | Menu component added, Table Selectable already existed |
| Phase 2: Symfony additions | ✅ Complete | All major components added |
| Phase 3: Visual alignment | 🔄 In Progress | Reviewing key components |
| Phase 4: Documentation | ⏳ Pending | |

---

## Component Comparison Summary

| Category | Vue Components | Symfony Components | Status |
|----------|---------------|-------------------|--------|
| Core UI | 26+ | 20+ | ✅ Aligned |
| Form | 30+ | 25+ | ✅ Aligned |
| Navigation | 6 | 8 | ✅ Aligned |
| Table | 15+ | 12+ | ✅ Aligned |
| Feedback | 14 | 12 | ✅ Aligned |
| Layout | 4 | 4 | ✅ Aligned |
| Type | 5 | 5 | ✅ Aligned |

---

## Completed - Vue Additions

### ✅ Menu Component
- Added `Menu.vue` wrapper component for consistent menu container styling
- MenuItem already had full submenu support

### ✅ Table Selectable
- Already existed in Vue DataTable with `selectable`, `selectedItems`, `selectableFilter` props

---

## Completed - Symfony Additions

### ✅ High Priority Components
- [x] **RangeSlider** - `range-slider.html.twig` + `range_slider_controller.js`
- [x] **Combobox** - `combobox.html.twig` + `combobox_controller.js`
- [x] **PhoneInput** - `input/phone.html.twig` + `phone_input_controller.js`

### ✅ Medium Priority Components
- [x] **FilterTabs** - `filter-tabs.html.twig` + `filter_tabs_controller.js`
- [x] **MobileList** - `mobile-list.html.twig` + `mobile_list_controller.js`
- [x] **ResponsiveList** - `responsive-list.html.twig`
- [x] **CollapsibleCard** - `collapsible-card.html.twig` + `collapsible_card_controller.js`
- [x] **DarkModeToggle** - `dark-mode-toggle.html.twig` + `dark_mode_toggle_controller.js`
- [x] **NotificationList** - `notification-list.html.twig` + `notification_list_controller.js`
- [x] **NotificationItem** - `notification-item.html.twig`

### ✅ Type Components
- [x] **TextType** - `type/text.html.twig`
- [x] **NumberType** - `type/number.html.twig`
- [x] **DateType** - `type/date.html.twig`
- [x] **BadgeType** - `type/badge.html.twig`

### ⏳ Still Missing (Low Priority)
- [ ] **IconPicker** - Complex component, requires icon library integration
- [ ] **CheckboxGroup** - Can be composed from existing Checkbox

---

## Visual Alignment Tasks

### Symfony needs styling updates to match Vue
- [ ] Review Button styling - ensure variants match (primary, secondary, outline, ghost, danger, success)
- [ ] Review Card component - ensure shadow, border, padding options match CardWrapper
- [ ] Review Badge styling - ensure color variants and sizes match
- [ ] Review Form input styling - ensure consistent sizing (sm/md/lg) and states
- [ ] Review Modal/Drawer styling - ensure animations and sizes match
- [ ] Review Table styling - ensure header, row, cell styling matches
- [ ] Review Alert styling - ensure variants and dismiss behavior match

---

## Component-by-Component Checklist

### Core Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| Button | ✅ | ✅ | ⏳ | Review variants |
| Avatar | ✅ | ✅ | ⏳ | Review colors |
| Badge/StatusBadge | ✅ | ✅ | ⏳ | |
| Divider | ✅ | ✅ | ⏳ | |
| Card/CardWrapper | ✅ | ✅ | ⏳ | Vue has more options |
| CollapsibleCard | ✅ | ✅ | ✅ | Added to Symfony |
| Tabs/TabPanel | ✅ | ✅ | ⏳ | |
| Dropdown | ✅ | ❌ | ⏳ | Vue-only (Menu covers this in Symfony) |
| Menu | ✅ | ✅ | ✅ | Added Menu wrapper to Vue |
| MenuItem | ✅ | ✅ | ⏳ | |
| Breadcrumb | ✅ | ✅ | ⏳ | |
| FilterTabs | ✅ | ✅ | ✅ | Added to Symfony |
| Tooltip | ✅ | ✅ | ⏳ | |
| Popover | ✅ | ✅ | ⏳ | |
| Stepper | ✅ | ✅ | ⏳ | |
| Accordion | ✅ | ✅ | ⏳ | |
| Timeline | ✅ | ✅ | ⏳ | |
| StatItem/Stats | ✅ | ✅ | ⏳ | |
| Drawer/SlideOver | ✅ | ✅ | ⏳ | |
| DarkModeToggle | ✅ | ✅ | ✅ | Added to Symfony |
| Autocomplete | ✅ | ❌ | ⏳ | Vue-only for now |

### Table Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| Table (atomic) | ✅ | ✅ | ⏳ | |
| DataTable | ✅ | ✅ | ⏳ | |
| Table Selectable | ✅ | ✅ | ✅ | Vue already had it |
| MobileList | ✅ | ✅ | ✅ | Added to Symfony |
| ResponsiveList | ✅ | ✅ | ✅ | Added to Symfony |
| DataList | ✅ | ✅ | ⏳ | |

### Form Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| Form | ✅ | ✅ | ⏳ | |
| FormInput | ✅ | ✅ | ⏳ | |
| FormSelect | ✅ | ✅ | ⏳ | |
| Select/Option | ✅ | ✅ | ⏳ | |
| Combobox | ✅ | ✅ | ✅ | Added to Symfony |
| TextArea | ✅ | ✅ | ⏳ | |
| Checkbox | ✅ | ✅ | ⏳ | |
| CheckboxGroup | ✅ | ❌ | ⏳ | Vue-only for now |
| Switch | ✅ | ✅ | ⏳ | |
| SearchInput | ✅ | ✅ | ⏳ | |
| EmailInput | ✅ | ✅ | ⏳ | |
| PasswordInput | ✅ | ✅ | ⏳ | |
| PhoneInput | ✅ | ✅ | ✅ | Added to Symfony |
| NumberInput | ✅ | ✅ | ⏳ | |
| MoneyInput | ✅ | ✅ | ⏳ | |
| PercentInput | ✅ | ✅ | ⏳ | |
| QuantityInput | ✅ | ✅ | ⏳ | |
| URLInput | ✅ | ✅ | ⏳ | |
| OTPInput | ✅ | ✅ | ⏳ | |
| DatePicker | ✅ | ✅ | ⏳ | |
| ColorPicker | ✅ | ✅ | ⏳ | |
| FileUpload | ✅ | ✅ | ⏳ | |
| Rating | ✅ | ✅ | ⏳ | |
| Slider | ✅ | ✅ | ⏳ | |
| RangeSlider | ✅ | ✅ | ✅ | Added to Symfony |
| TagsInput | ✅ | ✅ | ⏳ | |
| IconPicker | ✅ | ❌ | ⏳ | Vue-only (complex) |
| InputWrapper | ✅ | ✅ | ⏳ | |
| InputGroup | ✅ | ✅ | ⏳ | |
| FormGroup | ✅ | ❌ | ⏳ | Review |
| FormLabel | ✅ | ✅ | ⏳ | |
| FormHelp | ✅ | ❌ | ⏳ | Review |
| FormSection | ✅ | ✅ | ⏳ | |
| FormActions | ✅ | ✅ | ⏳ | |

### Feedback Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| Modal | ✅ | ✅ | ⏳ | |
| ConfirmDialog | ✅ | ✅ | ⏳ | |
| Alert | ✅ | ✅ | ⏳ | |
| Toast | ✅ | ✅ | ⏳ | |
| ToastContainer | ✅ | ✅ | ⏳ | |
| LoadingSpinner | ✅ | ✅ | ⏳ | |
| Progress | ✅ | ✅ | ⏳ | |
| Skeleton | ✅ | ✅ | ⏳ | |
| CardSkeleton | ✅ | ✅ | ⏳ | |
| ListSkeleton | ✅ | ✅ | ⏳ | |
| TableSkeleton | ✅ | ✅ | ⏳ | |
| EmptyState | ✅ | ✅ | ⏳ | |
| Pagination | ✅ | ✅ | ⏳ | |
| NotificationList | ✅ | ✅ | ✅ | Added to Symfony |
| NotificationComponent | ✅ | ✅ | ✅ | Added to Symfony |

### Layout Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| BaseLayout | ✅ | ✅ | ⏳ | |
| AuthLayout | ✅ | ✅ | ⏳ | |
| PageLayout | ✅ | ✅ | ⏳ | |
| PageHero | ✅ | ✅ | ⏳ | |

### Type/Display Components
| Component | Vue | Symfony | Aligned | Notes |
|-----------|-----|---------|---------|-------|
| TextType | ✅ | ✅ | ✅ | Added to Symfony |
| NumberType | ✅ | ✅ | ✅ | Added to Symfony |
| DateType | ✅ | ✅ | ✅ | Added to Symfony |
| BooleanType | ✅ | ✅ | ⏳ | Symfony has `boolean` |
| BadgeType | ✅ | ✅ | ✅ | Added to Symfony |

---

## Legend

- ✅ = Component exists / Fully aligned
- ❌ = Component missing
- ⏳ = Needs visual alignment review
- ✔️ = Fully aligned

---

## New Symfony Components Added (2026-01-08)

### Twig Templates
```
templates/components/
├── collapsible-card.html.twig
├── combobox.html.twig
├── dark-mode-toggle.html.twig
├── filter-tabs.html.twig
├── mobile-list.html.twig
├── notification-item.html.twig
├── notification-list.html.twig
├── range-slider.html.twig
├── responsive-list.html.twig
├── input/
│   └── phone.html.twig
└── type/
    ├── badge.html.twig
    ├── date.html.twig
    ├── number.html.twig
    └── text.html.twig
```

### Stimulus Controllers
```
assets/src/controllers/
├── collapsible_card_controller.js
├── combobox_controller.js
├── dark_mode_toggle_controller.js
├── filter_tabs_controller.js
├── mobile_list_controller.js
├── notification_list_controller.js
├── phone_input_controller.js
└── range_slider_controller.js
```

---

## Notes

- Vue library uses `@iconify/vue` for icons
- Symfony bundle uses `twig:ux:icon` (Symfony UX Icons) for icons
- Symfony bundle uses Stimulus.js for interactivity
- Both use TailwindCSS v4 with similar color systems
- Both support dark mode via `@custom-variant dark (&:is(.dark *))`
- Both use OKLCH color space for primary/secondary color scales
