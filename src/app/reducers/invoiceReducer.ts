import { TInvoice } from '@/app/api/invoices/types'

type Set = {
  type: 'SET_INVOICES'
  payload: TInvoice[]
}

type Add = {
  type: 'ADD_INVOICE'
  payload: TInvoice
}

type TAction = Set | Add

const invoiceReducer = (invoices: TInvoice[], action: TAction) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return action.payload
    case 'ADD_INVOICE':
      return [...invoices, action.payload]
    default:
      return invoices
  }
}

export default invoiceReducer
