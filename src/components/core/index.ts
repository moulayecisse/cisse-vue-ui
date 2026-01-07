export { default as CardComponent } from './CardComponent.vue'
export { default as CardWrapper } from './CardWrapper.vue'
export type {
  CardShadow,
  CardRounded,
  CardPadding,
  CardBorder,
  CardVariant,
  CardAccent,
  CardImagePosition,
} from './CardWrapper.vue'

// Table Components (Atomic Design)
export {
  // Atoms
  Table,
  TableContextKey,
  type TableContext,
  Caption,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  type SortDirection,
  Td,
  // Molecules
  TableHeader,
  TableRow,
  TableFooter,
  ExpandableRow,
  // Organisms
  DataTable,
} from './table'

// Backwards compatibility: TableComponent is now an alias for DataTable
export { DataTable as TableComponent } from './table'

export { default as MobileList } from './MobileList.vue'
export { default as ResponsiveList } from './ResponsiveList.vue'
export { default as AutocompleteComponent } from './AutocompleteComponent.vue'
export { default as MenuItem } from './MenuItem.vue'
export { default as TableAction } from './TableAction.vue'
export { default as StatusBadge } from './StatusBadge.vue'
export { default as Button } from './Button.vue'
export { default as Avatar } from './Avatar.vue'
export { default as Tabs } from './Tabs.vue'
export { default as TabPanel } from './TabPanel.vue'
export { default as Dropdown } from './Dropdown.vue'
export { default as Stepper } from './Stepper.vue'
export { default as CollapsibleCard } from './CollapsibleCard.vue'
export { default as Tooltip } from './Tooltip.vue'
export { default as Popover } from './Popover.vue'
export { default as Drawer } from './Drawer.vue'
export { default as Breadcrumb } from './Breadcrumb.vue'
export { default as Accordion } from './Accordion.vue'
export { default as AccordionItem } from './AccordionItem.vue'
export { default as Timeline } from './Timeline.vue'
export { default as DarkModeToggle } from './DarkModeToggle.vue'
export { default as StatsCard } from './StatsCard.vue'
export { default as StatsGrid } from './StatsGrid.vue'
export { default as FilterTabs } from './FilterTabs.vue'
export type { ButtonVariant, ButtonSize } from './Button.vue'
export type { StatItem } from './StatsCard.vue'
export type { FilterTab } from './FilterTabs.vue'
export type { DrawerPosition, DrawerSize } from './Drawer.vue'
export type { BreadcrumbItem } from './Breadcrumb.vue'
export type { AccordionMode } from './Accordion.vue'
export type { TimelineItem, TimelineItemStatus } from './Timeline.vue'
export type { TooltipPosition } from './Tooltip.vue'
export type { PopoverPosition } from './Popover.vue'
export type { Step } from './Stepper.vue'
export type { AvatarSize } from './Avatar.vue'
export type { Tab } from './Tabs.vue'
export type { DropdownItem } from './Dropdown.vue'
export type { MobileListColumn } from './MobileList.vue'
export type { ResponsiveListColumn } from './ResponsiveList.vue'
export type { DarkModeToggleSize } from './DarkModeToggle.vue'
