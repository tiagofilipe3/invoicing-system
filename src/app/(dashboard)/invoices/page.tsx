'use client'

import { Box, Button, Flex, Select, Text } from '@chakra-ui/react'

import InvoiceList from '@/app/components/InvoiceList'
import Link from 'next/link'
import { useState } from 'react'

const Invoices = () => {
  const [status, setStatus] = useState('all')

  return (
    <Flex height="100%" flexDirection="column">
      <Flex justifyContent="space-between">
        <Text fontSize={24} fontWeight={600}>
          Invoices
        </Text>
        <Link href="/invoices/new">
          <Button colorScheme="teal">New Invoice</Button>
        </Link>
      </Flex>
      <Flex alignItems="center" mt={5} mb={2}>
        <Text mr={2}>Status</Text>
        <Select
          width="120px"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </Select>
      </Flex>
      <Box mt={2}>
        <InvoiceList status={status} />
      </Box>
    </Flex>
  )
}

export default Invoices
