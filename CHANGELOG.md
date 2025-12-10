# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2024-12-10

### Added
- Unit tests for components: Button, Tooltip, Progress, Skeleton, Alert, Modal, Avatar
- Unit tests for composables: useToast, useNotifications
- Test configuration with Vitest and happy-dom

### Fixed
- FormInput error state now uses red instead of pink for invalid fields

## [0.3.0] - 2024-12-10

### Added
- **Tooltip** component - Info tooltips with position variants (top/bottom/left/right) and delay
- **Toast** component - Notification toasts with success/error/warning/info types
- **ToastContainer** component - Container for managing multiple toasts with 6 position options
- **Popover** component - Floating content container with click/hover triggers
- **DatePicker** component - Full calendar UI with locale support and min/max date validation
- **Slider** component - Range input with custom styling and value formatting
- **Progress** component - Progress bar with striped/animated/indeterminate modes
- **Skeleton** component - Loading placeholders with text/circular/rectangular/rounded variants
- **useToast** composable - Global toast state management
- Storybook documentation with 25+ story files (~120 stories)
- GitHub Pages auto-deployment for Storybook
- Storybook link in README

## [0.2.8] - 2024-12-09

### Added
- PaginationControls responsive design improvements

### Fixed
- TypeScript implicit any errors in TableComponent

## [0.2.7] - 2024-12-08

### Added
- `useDropdown` composable for DRY dropdown logic
- `useModal` composable for modal state management

## [0.2.6] - 2024-12-07

### Changed
- MobileList now uses CardComponent for items
- ResponsiveList styles harmonized with CardComponent

### Fixed
- TableComponent container-agnostic wrapper restored
- ResponsiveList uses VueUse useBreakpoints for responsive switching

## [0.2.5] - 2024-12-06

### Added
- MobileList component for mobile-friendly list views
- ResponsiveList component for adaptive table/list switching

## [0.2.4] - 2024-12-05

### Fixed
- FormGroup select boolean prop to avoid type conflict
- Dropdown right-aligned position calculation

### Added
- BaseLayout user menu support

## [0.2.3] - 2024-12-04

### Changed
- TableComponent made container-agnostic

### Fixed
- PageLayout responsive header layout (md breakpoint)

## [0.1.2] - 2024-12-03

### Fixed
- PageLayout header layout improvements

## [0.1.1] - 2024-12-02

### Added
- Route-aware active state to MenuItem and BaseLayout
- Improved dropdown components with teleport and animations

## [0.1.0] - 2024-12-01

### Added
- Initial release of cisse-vue-ui component library
- Core components: Button, Card, Table, Tabs, TabPanel, Dropdown, Avatar, Autocomplete, MenuItem, StatusBadge, Stepper, CollapsibleCard
- Form components: FormInput, FormSelect, FormGroup, FormLabel, FormHelp, SearchInput, Switch, Checkbox
- Feedback components: Modal, Alert, LoadingSpinner, PaginationControls, NotificationList, EmptyState
- Layout components: BaseLayout, PageLayout
- Type components: TextType, NumberType, DateType, BooleanType, BadgeType
- Composables: useNotifications, useDarkMode, useExportCSV
- Vue plugin for global component registration
- Pre-compiled Tailwind CSS v4 styles
