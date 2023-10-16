type ColumnDefinitionType<T, K extends keyof T> = {
  key: K | 'actions'
  header: string
  render?: (value: T) => any
  width?: string
}

type TProps<T, K extends keyof T> = {
  data: Array<T> | undefined
  columns: Array<ColumnDefinitionType<T, K>>
  isLoading?: boolean
}

export type { ColumnDefinitionType, TProps }
