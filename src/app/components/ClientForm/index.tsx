'use client'

import { Button, Flex, Text } from '@chakra-ui/react'
import FormInput from '@/app/components/FormInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getClient } from '@/app/api/client/route'

type ClientInputs = {
  name: string
  email: string
  address: string
}

type TProps = {
  id?: number
}

const ClientForm = ({ id }: TProps) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientInputs>()

  useEffect(() => {
    if (id) {
      const client = getClient(id)
      reset(client)
    }
  }, [id, reset])

  const onSubmitClient: SubmitHandler<ClientInputs> = async (data) => {
    if (id) {
      try {
        await fetch(`/api/client`, {
          method: 'PUT',
          body: JSON.stringify({
            ...data,
          }),
        })

        router.push(`/clients`)
        router.refresh()

        return
      } catch (e) {
        alert('Something went wrong')
      }
    }

    await fetch('/api/client', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    })

    router.push('/clients')
  }

  return (
    <Flex width="100%" justifyContent="center">
      <Flex height="100%" flexDirection="column" width="620px">
        <Text fontSize={26} fontWeight={600}>
          New Client
        </Text>
        <form onSubmit={handleSubmit(onSubmitClient)}>
          <Flex mt={5} flexDir="column">
            <Flex>
              <Flex flexDir="column" mr={5} flex={1}>
                <Text fontSize={16} mb={1}>
                  Name
                </Text>
                <FormInput
                  fieldName="name"
                  register={register}
                  errors={errors}
                  required
                />
              </Flex>
              <Flex flexDir="column" flex={1}>
                <Text fontSize={16} mb={1}>
                  E-mail
                </Text>
                <FormInput
                  fieldName="email"
                  register={register}
                  errors={errors}
                  required
                />
              </Flex>
            </Flex>
            <Flex mt={1}>
              <Flex flexDir="column" flex={1}>
                <Text fontSize={16} mb={1}>
                  Address
                </Text>
                <FormInput
                  fieldName="address"
                  register={register}
                  errors={errors}
                  required
                />
              </Flex>
            </Flex>
            <Flex justifyContent="flex-end" mt={5}>
              <Button colorScheme="teal" width="120px" type="submit">
                Save
              </Button>
              <Button
                variant="ghost"
                width="120px"
                ml={2}
                onClick={() => {
                  router.push('/clients')
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

export default ClientForm
