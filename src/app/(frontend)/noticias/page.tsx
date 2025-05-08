import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Box, Grid, GridCol, Input, Stack, Text } from '@mantine/core'
import { IconAt, IconZoom } from '@tabler/icons-react'

export default async function NewsPage() {
  const payloadConfig = await config

  return (
    <div>
      <Box
        h={'auto'}
        pt={90}
        pb={70}
        style={{
          width: '100%',
          backgroundImage: 'url("/Mask group.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}>
        <Stack justify='center' align='center' style={{
          height:'100%'
        }}>
          <Text ta="center" size='40' fw={600} inline c='white' w={"55%"}>
            Enterate de las novedades de academias
          </Text>
          <Input placeholder="Ingresa un topico" rightSection={<IconZoom size={16} />} w={"55%"} mt={30} radius={15}/>
        </Stack> 
      </Box>
    </div>   
  )
}
