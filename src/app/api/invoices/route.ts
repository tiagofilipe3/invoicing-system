import { TInvoice, TItem } from '@/app/api/invoices/types'
import { NextRequest } from 'next/server'
import { TData } from '@/app/api/types'
let data = require('../../../../tmp/data.json')

const fs = require('fs')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('status')
    const status = query === 'all' ? undefined : query === 'paid'

    const { clients } = data as TData
    let invoices = data.invoices

    if (status !== undefined) {
      invoices = invoices.filter((item: TInvoice) => item.status === status)
    }

    const invoicesWithClients = invoices.map((item: TInvoice) => {
      const client = clients.find((client) => client.id === item.client)
      return { ...item, client: client?.name }
    })

    return new Response(JSON.stringify(invoicesWithClients), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json()
    const { items, ...rest } = res
    const { invoices, clients } = data

    const newId =
      invoices && invoices.length > 0 ? invoices[invoices.length - 1].id + 1 : 1
    const total = items.reduce(
      (acc: number, item: TItem) => acc + Number(item.amount),
      0
    )

    const client = clients.find((item: TInvoice) => item.id === rest.client)

    const newInvoice = {
      id: newId,
      total,
      status: false,
      items,
      client: client.id,
      ...rest,
    }

    fs.writeFileSync(
      'tmp/data.json',
      JSON.stringify({ ...data, invoices: [...invoices, newInvoice] })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const invoice = await request.json()
    const { invoices } = data

    const newInvoices = invoices.map((item: TInvoice) => {
      if (item.id === Number(invoice.id)) {
        return invoice
      }

      return item
    })

    fs.writeFileSync(
      'tmp/data.json',
      JSON.stringify({ ...data, invoices: newInvoices })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json()
    const { invoices } = data

    const newInvoices = invoices.filter(
      (item: TInvoice) => item.id !== Number(res.id)
    )

    fs.writeFileSync(
      'tmp/data.json',
      JSON.stringify({ ...data, invoices: newInvoices })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}
