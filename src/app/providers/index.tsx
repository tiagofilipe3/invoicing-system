'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

const customTheme = extendTheme({
  fonts: {
    heading: sourceSans.style.fontFamily,
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
