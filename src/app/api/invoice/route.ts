import { NewInvoice, TInvoice, TItem } from '@/app/api/invoice/types'
import { NextRequest } from 'next/server'
import { getClient, getClients } from '@/app/api/client/route'

const fs = require('fs')
let data = require('../../../../data.json')

const getInvoices = async (status: boolean | undefined) => {
  if (status !== undefined) {
    return data.invoices.filter((item: TInvoice) => item.status === status)
  }

  return data.invoices as TInvoice[]
}

const getInvoice = (id: number) => {
  const { invoices } = data
  return invoices.find((item: TInvoice) => item.id === Number(id)) as TInvoice
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('status')
    const status = query === 'all' ? undefined : query === 'paid'

    const invoices = await getInvoices(status)
    const clients = await getClients()

    console.log('clients', clients)
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
    const { invoices } = data

    const newId =
      invoices && invoices.length > 0 ? invoices[invoices.length - 1].id + 1 : 1
    const total = items.reduce(
      (acc: number, item: TItem) => acc + Number(item.amount),
      0
    )

    const client = getClient(rest.client)

    const newInvoice = {
      id: newId,
      total,
      status: false,
      items,
      client: client.id,
      ...rest,
    }

    fs.writeFileSync(
      'data.json',
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
      'data.json',
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
      'data.json',
      JSON.stringify({ ...data, invoices: newInvoices })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export { getInvoice }
