'use client'

import { ReactNode, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import {
  Box,
  Card,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import Header from '@/app/components/Header'

export default function Layout({ children }: { children: ReactNode }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {}, [isMobile])

  return (
    <>
      <Sidebar display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex flexDir="column" ml={{ base: 0, md: '310px' }}>
        <Header onOpen={onOpen} />
        <Box mt={2} mx={4} height="calc(100% - 1rem)">
          <Card my={2} p={6} width="100%" height="100%">
            {children}
          </Card>
        </Box>
      </Flex>
    </>
  )
}
