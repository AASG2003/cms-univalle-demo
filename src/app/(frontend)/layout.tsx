import React from 'react'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor:'#EAEAEA',
      }}>
        <MantineProvider defaultColorScheme="light">
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer/>
        </MantineProvider>
      </body>
    </html>
  )
}
