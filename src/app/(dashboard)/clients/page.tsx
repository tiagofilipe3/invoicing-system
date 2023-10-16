'use client'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import ClientList from '@/app/components/ClientList'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <Flex height="100%" flexDirection="column">
      <Flex justifyContent="flex-end">
        <Link href="/clients/new">
          <Button colorScheme="teal">New Client</Button>
        </Link>
      </Flex>
      <Box mt={2}>
        <ClientList />
      </Box>
    </Flex>
  )
}

export default Dashboard
