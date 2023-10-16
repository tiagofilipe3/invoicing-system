'use client'

import { Box, Card, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { LuUsers } from 'react-icons/lu'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { usePathname } from 'next/navigation'

import Link from 'next/link'

import ConditionalWrapper from '@/app/components/ConditionalWrapper'

type TProps = {
  onClose?: () => void
  display?: Record<string, string>
}

const Sidebar = ({ onClose, ...rest }: TProps) => {
  const pathname = usePathname()

  return (
    <Box
      p={2}
      position="fixed"
      width="300px"
      height="calc(100% - 1rem)"
      ml={2}
      zIndex={1}
      {...rest}
    >
      <Card p={3}>
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Image
              src="/invoice_logo_2.png"
              boxSize="30px"
              objectFit="contain"
            />
            <Text fontSize={20} ml={2} fontWeight="600">
              Invoice
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Flex py={2} mt={5} flexDirection="column">
        <ConditionalWrapper
          condition={pathname.includes('/invoices')}
          wrapper={(children) => <Card>{children}</Card>}
        >
          <Link href="/invoices" onClick={() => onClose && onClose()}>
            <Flex alignItems="center" p={3} cursor="pointer">
              <Icon as={MdOutlineSpaceDashboard} w={5} h={5} />
              <Text
                ml={1}
                fontSize={16}
                fontWeight={pathname === '/invoices' ? '600' : 'normal'}
              >
                Dashboard
              </Text>
            </Flex>
          </Link>
        </ConditionalWrapper>
        <ConditionalWrapper
          condition={pathname.includes('/clients')}
          wrapper={(children) => <Card>{children}</Card>}
        >
          <Link href="/clients" onClick={() => onClose && onClose()}>
            <Flex alignItems="center" pt={2} p={3} cursor="pointer">
              <Icon as={LuUsers} w={5} h={5} />
              <Text ml={1} fontSize={16}>
                Clients
              </Text>
            </Flex>
          </Link>
        </ConditionalWrapper>
      </Flex>
    </Box>
  )
}

export default Sidebar
