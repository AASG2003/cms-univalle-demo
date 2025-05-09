'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Stack, Text } from '@mantine/core'
import { IconZoom } from '@tabler/icons-react'
import { NoticiaResumen } from '@/app/types/news';

export default function NewsPage() {
  
    const [noticias, setNoticias] = useState<NoticiaResumen[]>([]);
  
    useEffect(() => {
      async function fetchNoticias() {
        const res = await fetch('/local_api/noticias?limit=5');
        const data = await res.json();
        setNoticias(data);
      }
      fetchNoticias();
    }, []);

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
          <Text ta="center" size='45' fw={600} inline c='white' w={"50%"}>
            FAQ
          </Text>
          <Input placeholder="Ingresa un topico" rightSection={<IconZoom size={16} />} w={"40%"} mt={30} radius={15}/>
        </Stack> 
      </Box>

      
    </div>   
  )
}