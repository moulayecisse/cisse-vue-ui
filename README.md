# cisse-vue-ui

A Vue 3 component library built with TypeScript and Tailwind CSS v4.

## Installation

```bash
npm install cisse-vue-ui
# or
bun add cisse-vue-ui
```

### Peer Dependencies

```bash
npm install vue@^3.4 tailwindcss@^4 @iconify/vue@^4
```

## Setup

### 1. Import Styles

Add the pre-compiled CSS to your main CSS file:

```css
@import 'cisse-vue-ui/style.css';
@import 'tailwindcss';
```

### 2. Configure Primary Color (Optional)

Override the default primary color in your CSS:

```css
@theme {
  --color-primary-50: oklch(97% 0.02 142);
  --color-primary-100: oklch(94% 0.05 142);
  --color-primary-200: oklch(88% 0.10 142);
  --color-primary-300: oklch(78% 0.15 142);
  --color-primary-400: oklch(65% 0.20 142);
  --color-primary-500: oklch(55% 0.22 142);
  --color-primary-600: oklch(48% 0.20 142);
  --color-primary-700: oklch(40% 0.17 142);
  --color-primary-800: oklch(32% 0.14 142);
  --color-primary-900: oklch(25% 0.10 142);
  --color-primary-950: oklch(18% 0.08 142);
}
```

## Usage

### Tree-Shaken Imports (Recommended)

```vue
<script setup lang="ts">
import { Button, CardComponent, FormInput } from 'cisse-vue-ui'
</script>
```

### Category Imports

```typescript
import { Button, Tabs, TabPanel } from 'cisse-vue-ui/components/core'
import { FormInput, FormSelect, Switch } from 'cisse-vue-ui/components/form'
import { Modal, Alert, LoadingSpinner } from 'cisse-vue-ui/components/feedback'
import { BaseLayout, PageLayout } from 'cisse-vue-ui/components/layout'
```

### Global Registration (Vue Plugin)

```typescript
import { createApp } from 'vue'
import { VueTailwindUI } from 'cisse-vue-ui'

const app = createApp(App)

// Register all components
app.use(VueTailwindUI)

// Or with a prefix
app.use(VueTailwindUI, { prefix: 'Ui' }) // <UiButton>, <UiCard>, etc.

// Or specific components only
app.use(VueTailwindUI, { components: ['Button', 'CardComponent'] })
```

## Components

### Core

| Component | Description |
|-----------|-------------|
| `Button` | Button with variants (primary, secondary, outline, ghost, danger, success), sizes, icons, loading state |
| `CardComponent` | Card container with header, content, and footer slots |
| `TableComponent` | Data table with sorting, selection, actions, and custom column rendering |
| `MobileList` | Mobile-optimized card-based list with selection support |
| `ResponsiveList` | Combines MobileList (mobile) and TableComponent (desktop) with automatic breakpoint switching |
| `Tabs` | Tab navigation with variants (underline, pills, boxed) |
| `TabPanel` | Tab content panel (use with Tabs) |
| `Dropdown` | Dropdown menu with items, icons, and dividers |
| `Avatar` | User avatar with image, initials, or icon fallback |
| `AutocompleteComponent` | Searchable select with keyboard navigation |
| `MenuItem` | Navigation menu item with icon, active state detection, and route support |
| `StatusBadge` | Colored status indicator badge |
| `TableAction` | Icon button for table row actions |
| `Stepper` | Multi-step progress indicator with horizontal/vertical orientation |
| `CollapsibleCard` | Card that can expand/collapse its content |

### Form

| Component | Description |
|-----------|-------------|
| `FormInput` | Text input with label, validation, and icons |
| `FormSelect` | Select dropdown with label and validation |
| `FormGroup` | Form field wrapper with label and help text |
| `FormLabel` | Styled form label |
| `FormHelp` | Help text for form fields |
| `SearchInput` | Search input with icon and clear button |
| `Switch` | Toggle switch with label and description |
| `Checkbox` | Checkbox with label and description |

### Feedback

| Component | Description |
|-----------|-------------|
| `Modal` | Modal dialog with header, body, footer slots |
| `Alert` | Alert banner with variants (info, success, warning, error) |
| `LoadingSpinner` | Loading indicator with size variants |
| `PaginationControls` | Pagination with page numbers and navigation |
| `NotificationList` | Toast notification container |
| `NotificationComponent` | Individual toast notification |
| `EmptyState` | Placeholder for empty content with icon and action slot |

### Layout

| Component | Description |
|-----------|-------------|
| `BaseLayout` | App shell with sidebar, header, main content area, and route-aware menu |
| `PageLayout` | Page wrapper with breadcrumbs |

### Type Display

| Component | Description |
|-----------|-------------|
| `TextType` | Text value display |
| `NumberType` | Formatted number display |
| `DateType` | Formatted date display |
| `BooleanType` | Boolean value display (check/cross icons) |
| `BadgeType` | Badge value display with colors |

## Composables

```typescript
import { useNotifications, useDarkMode, useExportCSV } from 'cisse-vue-ui/composables'
```

### useNotifications

```typescript
const { notifications, addNotification, removeNotification } = useNotifications()

addNotification({
  type: 'success',
  title: 'Saved',
  message: 'Your changes have been saved.'
})
```

### useDarkMode

```typescript
const { isDark, toggle, enable, disable } = useDarkMode({
  selector: 'html',      // Element to add .dark class
  storageKey: 'theme',   // localStorage key
  defaultDark: false     // Default state
})
```

### useExportCSV

```typescript
const { exportToCSV } = useExportCSV()

exportToCSV(data, columns, 'export.csv')
```

## Types

```typescript
import type { Property, Notification, Breadcrumb } from 'cisse-vue-ui/types'

// Table column definition
const columns: Property[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', type: 'badge' }
]

// Breadcrumb navigation
const breadcrumbs: Breadcrumb[] = [
  { label: 'Home', to: '/' },
  { label: 'Users', to: '/users' },
  { label: 'Edit' }
]
```

## Component Examples

### Button

```vue
<Button variant="primary" size="md" :loading="isLoading">
  Save Changes
</Button>

<Button variant="outline" icon="lucide:plus">
  Add Item
</Button>

<Button variant="danger" icon="lucide:trash">
  Delete
</Button>
```

### Tabs

```vue
<script setup>
import { ref } from 'vue'
import { Tabs, TabPanel } from 'cisse-vue-ui'

const activeTab = ref('profile')
const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
  { key: 'notifications', label: 'Notifications' }
]
</script>

<template>
  <Tabs v-model="activeTab" :tabs="tabs" variant="underline">
    <TabPanel value="profile">Profile content</TabPanel>
    <TabPanel value="settings">Settings content</TabPanel>
    <TabPanel value="notifications">Notifications content</TabPanel>
  </Tabs>
</template>
```

### Switch

```vue
<Switch
  v-model="emailNotifications"
  label="Email notifications"
  description="Receive email updates about your account"
/>
```

### Alert

```vue
<Alert variant="success" title="Success!" dismissible>
  Your changes have been saved successfully.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

### Dropdown

```vue
<script setup>
import { Dropdown } from 'cisse-vue-ui'

const items = [
  { key: 'edit', label: 'Edit', icon: 'lucide:edit' },
  { key: 'duplicate', label: 'Duplicate', icon: 'lucide:copy' },
  { key: 'divider', divider: true },
  { key: 'delete', label: 'Delete', icon: 'lucide:trash', danger: true }
]

const handleSelect = (item) => {
  console.log('Selected:', item.key)
}
</script>

<template>
  <Dropdown :items="items" @select="handleSelect">
    <template #trigger-label>Actions</template>
  </Dropdown>
</template>
```

### Stepper

```vue
<script setup>
import { ref } from 'vue'
import { Stepper } from 'cisse-vue-ui'

const currentStep = ref('step2')
const steps = [
  { key: 'step1', title: 'Account', description: 'Create account', icon: 'lucide:user' },
  { key: 'step2', title: 'Profile', description: 'Set up profile', icon: 'lucide:settings' },
  { key: 'step3', title: 'Complete', description: 'Ready to go!', icon: 'lucide:check' }
]
</script>

<template>
  <Stepper v-model="currentStep" :steps="steps" />
</template>
```

### EmptyState

```vue
<EmptyState
  title="No results found"
  message="Try adjusting your search or filters"
  icon="lucide:search-x"
>
  <template #action>
    <Button variant="primary" size="sm">Clear filters</Button>
  </template>
</EmptyState>
```

### Checkbox

```vue
<Checkbox
  v-model="accepted"
  label="Accept terms"
  description="I agree to the terms and conditions"
/>
```

### TableComponent

```vue
<script setup>
import { ref } from 'vue'
import { TableComponent } from 'cisse-vue-ui'

const properties = [
  { name: 'name', label: 'Name', main: true },
  { name: 'email', label: 'Email' },
  { name: 'role', label: 'Role', type: 'badge' }
]

const items = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]

// Selection support
const selectedItems = ref(new Set())
const toggleSelect = (id) => {
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id)
  } else {
    selectedItems.value.add(id)
  }
}
</script>

<template>
  <TableComponent
    :properties="properties"
    :items="items"
    selectable
    :selected-items="selectedItems"
    @select="toggleSelect"
    @select-all="toggleSelectAll"
  >
    <template #action="{ item }">
      <TableAction icon="lucide:edit" @click="edit(item)" />
      <TableAction icon="lucide:trash" variant="danger" @click="delete(item)" />
    </template>
  </TableComponent>
</template>
```

### ResponsiveList

A component that automatically switches between a mobile card layout and a desktop table layout based on screen size.

```vue
<script setup>
import { ref } from 'vue'
import { ResponsiveList } from 'cisse-vue-ui'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
]

const items = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
]

const selectedItems = ref(new Set())

const toggleSelect = (id) => {
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id)
  } else {
    selectedItems.value.add(id)
  }
}

const toggleSelectAll = () => {
  if (selectedItems.value.size === items.length) {
    selectedItems.value.clear()
  } else {
    items.forEach(item => selectedItems.value.add(String(item.id)))
  }
}
</script>

<template>
  <ResponsiveList
    :items="items"
    :columns="columns"
    key-field="id"
    selectable
    :selected-items="selectedItems"
    breakpoint="lg"
    @select="toggleSelect"
    @select-all="toggleSelectAll"
  >
    <!-- Mobile view: avatar -->
    <template #avatar="{ item }">
      <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
        {{ item.name[0] }}
      </div>
    </template>

    <!-- Mobile view: content -->
    <template #mobileContent="{ item }">
      <h3 class="font-semibold">{{ item.name }}</h3>
      <p class="text-sm text-gray-500">{{ item.email }}</p>
    </template>

    <!-- Mobile view: actions -->
    <template #mobileActions="{ item }">
      <button @click="viewItem(item)">View</button>
    </template>

    <!-- Desktop table: custom cell rendering -->
    <template #cell-name="{ item }">
      <span class="font-medium">{{ item.name }}</span>
    </template>

    <template #cell-status="{ item }">
      <span :class="item.status === 'active' ? 'text-green-600' : 'text-red-600'">
        {{ item.status }}
      </span>
    </template>

    <!-- Desktop table: actions column -->
    <template #actions="{ item }">
      <Button size="sm" variant="ghost" @click="edit(item)">Edit</Button>
    </template>

    <!-- Empty state -->
    <template #empty>
      <EmptyState title="No items" message="No items to display" />
    </template>
  </ResponsiveList>
</template>
```

#### ResponsiveList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array` | required | Array of items to display |
| `columns` | `Array` | required | Column definitions with `key` or `name`, `label`, and optional `type` |
| `keyField` | `string` | `'id'` | Field to use as unique key for items |
| `selectable` | `boolean` | `false` | Enable selection mode |
| `selectedItems` | `Set<string>` | - | Set of selected item keys |
| `selectableFilter` | `Function` | - | Filter function to determine if an item is selectable |
| `breakpoint` | `string` | `'lg'` | Breakpoint for switching views: `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'` |

### MobileList

A mobile-optimized card-based list component with selection support.

```vue
<script setup>
import { MobileList } from 'cisse-vue-ui'
</script>

<template>
  <MobileList
    :items="items"
    key-field="id"
    selectable
    :selected-items="selectedItems"
    @select="toggleSelect"
    @select-all="toggleSelectAll"
  >
    <template #avatar="{ item }">
      <div class="w-12 h-12 rounded-full bg-blue-500" />
    </template>

    <template #content="{ item }">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </template>

    <template #actions="{ item }">
      <button>View</button>
    </template>
  </MobileList>
</template>
```

### MenuItem

```vue
<script setup>
import { useRoute } from 'vue-router'
import { MenuItem } from 'cisse-vue-ui'

const route = useRoute()

const menuItem = {
  label: 'Dashboard',
  link: '/dashboard',
  icon: 'lucide:layout-dashboard'
}
</script>

<template>
  <!-- Auto-detect active state from current route -->
  <MenuItem :menu-item="menuItem" :current-path="route.path" />

  <!-- Or manually control active state -->
  <MenuItem :menu-item="menuItem" :active="true" />
</template>
```

### BaseLayout

```vue
<script setup>
import { useRoute } from 'vue-router'
import { BaseLayout } from 'cisse-vue-ui'

const route = useRoute()

const menuItems = [
  { label: 'Dashboard', link: '/', icon: 'lucide:home' },
  { label: 'Users', link: '/users', icon: 'lucide:users' },
  { label: 'Settings', link: '/settings', icon: 'lucide:settings' }
]
</script>

<template>
  <BaseLayout
    :menu-items="menuItems"
    :current-path="route.path"
    :show-dark-toggle="true"
  >
    <template #logo>
      <img src="/logo.svg" alt="Logo" class="h-8" />
    </template>

    <RouterView />
  </BaseLayout>
</template>
```

## Dark Mode

Components support dark mode via the `.dark` class on a parent element:

```html
<html class="dark">
  <!-- Components will use dark theme -->
</html>
```

Use the `useDarkMode` composable or implement your own toggle:

```typescript
const { isDark, toggle } = useDarkMode()
```

## License

MIT
