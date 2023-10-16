import { TClient } from '@/app/api/client/types'

type Set = {
  type: 'SET_CLIENTS'
  payload: TClient[]
}

type Add = {
  type: 'ADD_CLIENT'
  payload: TClient
}

type TAction = Set | Add

const clientReducer = (invoices: TClient[], action: TAction) => {
  switch (action.type) {
    case 'SET_CLIENTS':
      return action.payload
    case 'ADD_CLIENT':
      return [...invoices, action.payload]
    default:
      return invoices
  }
}

export default clientReducer
