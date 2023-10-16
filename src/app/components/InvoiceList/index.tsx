'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { ColumnDefinitionType } from '@/app/components/Table/types'
import Table from '@/app/components/Table'
import { TInvoice } from '@/app/api/invoices/types'
import { currencyFormatter } from '@/app/utils'
import { invoiceReducer } from '@/app/reducers'

const InvoiceList = ({ status }: { status: string }) => {
  const [invoices, dispatch] = useReducer(invoiceReducer, [])
  const [isLoading, setIsLoading] = useState(false)

  const invoiceColumns: ColumnDefinitionType<TInvoice, keyof TInvoice>[] = [
    { header: 'Number', key: 'number' },
    { header: 'Client name', key: 'client' },
    {
      header: 'Total',
      key: 'total',
      render: (invoice) => `${currencyFormatter.format(invoice.total)}`,
    },
    {
      header: 'Status',
      key: 'status',
      render: (invoice) =>
        invoice.status ? (
          <Text color="green" fontWeight="bold">
            Paid
          </Text>
        ) : (
          'Pending'
        ),
    },
    {
      header: '',
      key: 'actions',
      render: (invoice) => (
        <Box>
          <Link href={`/invoices/${invoice.id}`}>
            <Button colorScheme="teal">View</Button>
          </Link>
          <Button
            colorScheme="teal"
            onClick={() => deleteInvoice(invoice.id)}
            ml={2}
          >
            Delete
          </Button>
          {!invoice.status && (
            <Button
              colorScheme="teal"
              onClick={() => markAsPaid(invoice)}
              ml={2}
            >
              Mark as paid
            </Button>
          )}
        </Box>
      ),
    },
  ]

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true)
    const req = await fetch(`api/invoices?status=${status}`, {
      method: 'GET',
    })
    const invoices = await req.json()
    const invoicesWithTotal = invoices.map((invoice: TInvoice) => ({
      ...invoice,
      total: invoice.items.reduce((acc, item) => acc + Number(item.amount), 0),
    }))

    dispatch({ type: 'SET_INVOICES', payload: invoicesWithTotal })
    setIsLoading(false)
  }, [status])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices, status])

  const deleteInvoice = async (id: number) => {
    await fetch(`/api/invoices`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })

    fetchInvoices()
  }

  const markAsPaid = async (invoice: TInvoice) => {
    invoice.status = true

    await fetch(`/api/invoices`, {
      method: 'PUT',
      body: JSON.stringify({
        ...invoice,
      }),
    })

    fetchInvoices()
  }

  return (
    <Table data={invoices} columns={invoiceColumns} isLoading={isLoading} />
  )
}

export default InvoiceList
