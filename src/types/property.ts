/**
 * Table column property definition
 *
 * This interface defines how table columns are configured and rendered.
 * The `type` field automatically loads the corresponding type component.
 *
 * Built-in types:
 * - 'text': Default text display (TextType.vue)
 * - 'number': Formatted number display (NumberType.vue)
 * - 'date': Formatted date display (DateType.vue)
 * - 'boolean': Yes/No with icons (BooleanType.vue)
 * - 'badge': Badge display (BadgeType.vue)
 */
export interface Property {
  /** Column key - corresponds to the data field name */
  name: string

  /** Display label for the column header */
  label?: string

  /**
   * Column type for automatic rendering (default: 'text')
   * Built-in: 'text' | 'number' | 'date' | 'badge' | 'boolean'
   */
  type?: 'text' | 'number' | 'date' | 'badge' | 'boolean' | string

  /** Whether the column is sortable (default: false) */
  sortable?: boolean

  /** Whether to hide the column (default: false) */
  hidden?: boolean

  /** Text alignment in the column (default: 'left') */
  align?: 'left' | 'center' | 'right'

  /** Optional Tailwind CSS classes to apply to column cells */
  className?: string

  /** Whether the column is the main/primary column (default: false) */
  main?: boolean
}
