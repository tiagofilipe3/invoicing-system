'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Flex, Spinner, Text } from '@chakra-ui/react'

import Login from '@/app/components/LoginForm'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner size="xl" />
        <Text mt={5}>Logging in...</Text>
      </Flex>
    )
  }

  if (status === 'authenticated') {
    redirect('/invoices')
  }

  if (!session) {
    return <Login />
  }
}
