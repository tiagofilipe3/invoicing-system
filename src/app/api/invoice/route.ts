import { NextRequest } from 'next/server'
import { TInvoice } from '@/app/api/invoices/types'

let data = require('../../../../data.json')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { invoices } = data
    const invoice = invoices.find((item: TInvoice) => item.id === Number(id))

    return new Response(JSON.stringify(invoice), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}
