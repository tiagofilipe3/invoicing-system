type TItem = {
  id: number
  description: string
  amount: number
}

type TInvoice = {
  id: number
  number: string
  client: number
  total: number
  status: boolean
  items: TItem[]
  actions: string
}

type NewInvoice = {
  clientName: string
  dueDate: string
  items: TItem[]
}

export type { TItem, TInvoice, NewInvoice }
