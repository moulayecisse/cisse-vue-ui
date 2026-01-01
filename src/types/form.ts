export interface InputProps {
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
  name?: string
  /** Mark as required field */
  required?: boolean
  /** ID of element that describes this input (for aria-describedby) */
  describedBy?: string
  /** Icon name (iconify format) - displayed on the left */
  icon?: string
  /** Icon on the right side */
  iconRight?: string
}

export interface SelectOption {
  value: string | number | boolean | null
  label: string
  hidden?: boolean
}

export interface SelectProps extends InputProps {
  options?: SelectOption[]
}

export interface FormGroupProps extends InputProps, SelectProps {
  label?: string
  cols?: number
  hidden?: boolean
  error?: string | boolean
  /** Set to true to render a select instead of input */
  select?: boolean
}

export interface AutocompleteOption {
  value: string
  label: string
}
