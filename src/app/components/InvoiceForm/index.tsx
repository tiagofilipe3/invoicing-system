'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'

import InvoiceItemForm, { TItem } from '@/app/components/InvoiceItemForm'
import FormInput from '@/app/components/FormInput'
import { getInvoice } from '@/app/api/invoice/route'
import { currencyFormatter } from '@/app/utils'
import { TClient } from '@/app/api/client/types'
import FormSelect from '@/app/components/FormSelect'
import { getClients } from '@/app/api/client/route'
import { AiFillDelete } from 'react-icons/ai'

type InvoiceInputs = {
  client: number
  dueDate: string
}

type TProps = {
  id?: number
}

const InvoiceForm = ({ id }: TProps) => {
  const [items, setItems] = useState<TItem[]>([])
  const [clients, setClients] = useState<{ value: number; label: string }[]>([])

  const router = useRouter()
  const { onClose, isOpen, onOpen } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceInputs>()

  useEffect(() => {
    if (id) {
      const invoice = getInvoice(id)
      setItems(invoice.items)
      reset(invoice)
    }
  }, [id, reset])

  const fetchClients = async () => {
    const clients = await getClients()

    const selectClients = clients.map((client: TClient) => ({
      value: client.id,
      label: client.name,
    }))

    setClients(selectClients)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const onSubmitInvoice: SubmitHandler<InvoiceInputs> = async (data) => {
    if (items.length === 0) {
      alert('You must add at least one item')
      return
    }

    if (id) {
      await fetch(`/api/invoice`, {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          client: Number(data.client),
          items,
        }),
      })

      router.push(`/invoices`)
      router.refresh()
      return
    }

    await fetch('/api/invoice', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        items,
      }),
    })

    router.push('/invoices')
  }

  const onSaveItem = (newItem: TItem) => {
    const newId = items && items.length > 0 ? items[items.length - 1].id + 1 : 1

    setItems([...items, { ...newItem, id: newId }])
    onClose()
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <Flex width="100%" justifyContent="center">
      <Flex height="100%" flexDirection="column" width="620px">
        <Text fontSize={26} fontWeight={600}>
          New Invoice
        </Text>
        <form onSubmit={handleSubmit(onSubmitInvoice)}>
          <Flex mt={5} flexDir="column">
            <Flex>
              <Flex flexDir="column" mr={5} flex={1}>
                <Text fontSize={16} mb={1}>
                  Number
                </Text>
                <FormInput
                  fieldName="number"
                  register={register}
                  errors={errors}
                  required
                />
              </Flex>
              <Flex flexDir="column" flex={1}>
                <Text fontSize={16} mb={1}>
                  Client
                </Text>
                <FormSelect
                  fieldName="client"
                  register={register}
                  errors={errors}
                  required
                  options={clients}
                />
              </Flex>
            </Flex>
            <Flex mt={1}>
              <Flex flexDir="column" flex={1}>
                <Text fontSize={16} mb={1}>
                  Due date
                </Text>
                <FormInput
                  type="date"
                  fieldName="dueDate"
                  register={register}
                  errors={errors}
                  required
                />
              </Flex>
            </Flex>
            <Flex flexDir="column" mt={5}>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize={20} fontWeight={500}>
                  Items
                </Text>
                <Button colorScheme="teal" type="button" onClick={onOpen}>
                  Add Item
                </Button>
              </Flex>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <Flex key={index} mt={4}>
                    <Flex flexDir="column" mr={5} flex={1}>
                      <Text fontSize={16} mb={1}>
                        {item.description}
                      </Text>
                    </Flex>
                    <Flex flexDir="column" mr={5} flex={1}>
                      <Text fontSize={16} mb={1}>
                        {currencyFormatter.format(item.amount)}
                      </Text>
                    </Flex>
                    <Flex>
                      <IconButton
                        aria-label="Delete invoice item"
                        icon={<AiFillDelete />}
                        onClick={() => removeItem(item.id)}
                      />
                    </Flex>
                  </Flex>
                ))
              ) : (
                <Flex width="100%" justifyContent="center" mt={5}>
                  <Text>No items</Text>
                </Flex>
              )}
            </Flex>
            {items && items.length > 0 && (
              <Flex mt={5} justifyContent="flex-end">
                <Text fontSize={16} fontWeight={500} mb={1} mr={2}>
                  Total
                </Text>
                <Text fontSize={16} mb={1}>
                  {currencyFormatter.format(
                    items.reduce((acc, item) => acc + Number(item.amount), 0)
                  )}
                </Text>
              </Flex>
            )}
            <Flex justifyContent="flex-end" mt={5}>
              <Button colorScheme="teal" width="120px" type="submit">
                Save
              </Button>
              <Button
                variant="ghost"
                width="120px"
                ml={2}
                onClick={() => {
                  router.push('/invoices')
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
        <InvoiceItemForm
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSaveItem}
        />
      </Flex>
    </Flex>
  )
}

export default InvoiceForm
