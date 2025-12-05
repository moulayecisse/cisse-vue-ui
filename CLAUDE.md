# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
bun run build          # Type-check, build library, and compile CSS
bun run build:css      # Build pre-compiled Tailwind CSS only
bun run build:watch    # Watch mode for library build
bun run dev            # Run playground dev server
bun run type-check     # TypeScript type checking only
bun run lint           # ESLint with auto-fix
bun run test           # Run tests with Vitest
```

## Architecture

This is a Vue 3 component library using TypeScript and Tailwind CSS v4, built with Vite in library mode.

### Module Structure

- **`src/components/`** - Vue components organized by category:
  - `core/` - Base UI: Button, Card, Table, Tabs, TabPanel, Dropdown, Avatar, Autocomplete, MenuItem, StatusBadge, Stepper, CollapsibleCard
  - `form/` - Form controls: FormInput, FormSelect, FormGroup, FormLabel, FormHelp, SearchInput, Switch, Checkbox
  - `feedback/` - User feedback: Modal, Alert, LoadingSpinner, PaginationControls, NotificationList, EmptyState
  - `layout/` - Page structure: BaseLayout (sidebar + main), PageLayout (breadcrumbs wrapper)
  - `type/` - Data display: TextType, NumberType, DateType, BooleanType, BadgeType

- **`src/composables/`** - Reusable logic: useNotifications, useDarkMode, useExportCSV

- **`src/types/`** - TypeScript interfaces: Property (table columns), notification types, form props

- **`src/plugin.ts`** - Vue plugin for global component registration with optional prefix

- **`src/styles/components.css`** - Pre-compiled Tailwind CSS with `@source` scanning all components

### Export Strategy

Each category has its own entry point for tree-shaking:
```typescript
import { Button } from 'cisse-vue-ui'                    // Main entry
import { Button } from 'cisse-vue-ui/components/core'    // Direct category import
import { useNotifications } from 'cisse-vue-ui/composables'
import type { Property } from 'cisse-vue-ui/types'
```

### CSS Strategy

The library ships pre-compiled CSS (`dist/style.css`) built with `@tailwindcss/cli`. Consumers import it as:
```css
@import 'cisse-vue-ui/dist/style.css';
```

This avoids requiring consumers to configure `@source` paths for the library's Vue files.

### Peer Dependencies

- `vue >=3.4.0`
- `tailwindcss >=4.0.0`
- `@iconify/vue >=4.0.0`
- `vue-router` and `pinia` are optional (for MenuItem routing and store factories)

### Key Patterns

- Components use `<script lang="ts" setup>` with typed props via `defineProps<T>()`
- Dark mode uses `@custom-variant dark (&:is(.dark *))` pattern
- Tabs/TabPanel communicate via Vue's provide/inject (`activeTab` key)
- Primary and secondary color scales defined in CSS theme (primary-50 through primary-950, secondary-50 through secondary-950)
- Consumers can override `--color-primary-*` and `--color-secondary-*` CSS variables to customize theme colors
