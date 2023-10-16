import './globals.css'

import { ReactNode } from 'react'
import { Source_Sans_3 } from 'next/font/google'

import { Providers } from '@/app/providers'

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
