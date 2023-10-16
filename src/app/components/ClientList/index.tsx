import { useEffect, useReducer, useState } from 'react'
import { clientReducer } from '@/app/reducers'
import { ColumnDefinitionType } from '@/app/components/Table/types'
import { TClient } from '@/app/api/client/types'
import Table from '@/app/components/Table'
import { Box, Button } from '@chakra-ui/react'
import Link from 'next/link'

const ClientList = () => {
  const [clients, dispatch] = useReducer(clientReducer, [])
  const [isLoading, setIsLoading] = useState(false)

  const clientColumns: ColumnDefinitionType<TClient, keyof TClient>[] = [
    { header: 'ID', key: 'id' },
    { header: 'Client name', key: 'name' },
    { header: 'Address', key: 'address' },
    { header: 'Email', key: 'email' },
    {
      header: '',
      key: 'actions',
      render: (client) => (
        <Box>
          <Link href={`/clients/${client.id}`}>
            <Button colorScheme="teal">View</Button>
          </Link>
          <Button
            colorScheme="teal"
            onClick={() => deleteInvoice(client.id)}
            ml={2}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ]

  const fetchClients = async () => {
    setIsLoading(true)
    const req = await fetch(`api/client`, {
      method: 'GET',
    })
    const clients = await req.json()

    dispatch({ type: 'SET_CLIENTS', payload: clients })
    setIsLoading(false)
  }

  const deleteInvoice = async (id: number) => {
    await fetch(`/api/client`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    fetchClients()
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return <Table data={clients} columns={clientColumns} isLoading={isLoading} />
}

export default ClientList
