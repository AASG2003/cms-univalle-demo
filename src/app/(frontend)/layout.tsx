import React from 'react'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import { HomeFooter } from './components/Footer/HomeFooter'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body style={{
        backgroundColor:'#EAEAEA',
      }}>
        <MantineProvider defaultColorScheme="light">
          {children}
          <HomeFooter/>
        </MantineProvider>
      </body>
    </html>
  )
}
