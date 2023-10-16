import { NextRequest } from 'next/server'
import { TClient } from '@/app/api/clients/types'
let data = require('../../../../data.json')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const { clients } = data
    const client = clients.find((item: TClient) => item.id === Number(id))

    return new Response(JSON.stringify(client), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Error ${error}`, { status: 500 })
  }
}
