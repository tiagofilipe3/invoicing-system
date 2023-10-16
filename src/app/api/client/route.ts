import fs from 'fs'
import { TClient } from '@/app/api/client/types'

let data = require('../../../../data.json')

const getClients = async () => {
  return data.clients as TClient[]
}

const getClient = (id: number) => {
  const { clients } = data
  return clients.find((item: TClient) => item.id === Number(id)) as TClient
}

export async function GET() {
  try {
    const clients = await getClients()
    return new Response(JSON.stringify(clients), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await request.json()
    const clients = await getClients()

    const newId =
      clients && clients.length > 0 ? clients[clients.length - 1].id + 1 : 1

    fs.writeFileSync(
      'data.json',
      JSON.stringify({
        ...data,
        clients: [...clients, { id: newId, ...client }],
      })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const client = await request.json()
    const { clients } = data

    const newClients = clients.map((item: TClient) => {
      if (item.id === Number(client.id)) {
        return client
      }

      return item
    })

    fs.writeFileSync(
      'data.json',
      JSON.stringify({ ...data, clients: newClients })
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
    const { clients } = data

    const newClients = clients.filter(
      (item: TClient) => item.id !== Number(res.id)
    )

    fs.writeFileSync(
      'data.json',
      JSON.stringify({ ...data, clients: newClients })
    )

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}

export { getClient, getClients }
