import { TInvoice } from '@/app/api/invoices/types'
import { TClient } from '@/app/api/clients/types'

type TData = {
  invoices: TInvoice[]
  clients: TClient[]
}

export type { TData }
