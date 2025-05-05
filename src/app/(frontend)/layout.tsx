import React from 'react'
import { Navbar } from './components/Navbar'
import { MantineProvider } from '@mantine/core'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="light">
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
