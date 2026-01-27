export type StatusBadgeVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'blue'
  | 'orange'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'gray'

export type TableActionColor = 'info' | 'warning' | 'success' | 'error'

export type ModalSize = 'sm' | 'default' | 'lg' | 'xl' | 'full'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface MenuItemProps {
  label: string
  icon: string
  link: string
  notification?: boolean
  /** Child menu items for nested/submenu support */
  children?: MenuItemProps[]
  /** Custom class for the label element */
  labelClass?: string
  /** Custom class for the icon element */
  iconClass?: string
  /** Custom class for the menu item wrapper/link */
  itemClass?: string
  /** Custom class applied when item is active */
  activeClass?: string
  /** Custom class applied on hover (added to group-hover) */
  hoverClass?: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  loading?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSize?: boolean
}

// Re-export component types for convenience
export type { ButtonVariant, ButtonSize } from '../components/core/Button.vue'
export type { AvatarSize } from '../components/core/Avatar.vue'
export type { Tab } from '../components/core/Tabs.vue'
export type { DropdownItem } from '../components/core/Dropdown.vue'
export type { Step } from '../components/core/Stepper.vue'
export type { AlertVariant } from '../components/feedback/Alert.vue'
export type { PageBreadcrumb } from '../components/layout/PageLayout.vue'
export type { SortDirection } from '../components/core/table'
export type { MenuPosition, UserMenuItem } from '../components/layout/BaseLayout.vue'
export type { PageHeroStat, PageHeroColorScheme } from '../components/layout/PageHero.vue'
