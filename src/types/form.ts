export interface InputProps {
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
  name?: string
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
}

export interface AutocompleteOption {
  value: string
  label: string
}
