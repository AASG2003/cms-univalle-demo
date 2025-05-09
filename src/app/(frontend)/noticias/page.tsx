'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Skeleton, Stack, Text } from '@mantine/core'
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
          <Text ta="center" size='40' fw={600} inline c='white' w={"50%"}>
            Enterate de las novedades de academias
          </Text>
          <Input placeholder="Ingresa un topico" rightSection={<IconZoom size={16} />} w={"40%"} mt={30} radius={15}/>
        </Stack> 
      </Box>
      <Stack p={50}
      style={{
          height:'100%'
        }}>
        <Text ta="left" size='40' fw={600} inline c='#83013E' w={"50%"}>
          Noticias
        </Text>
        <Flex pl={30} gap="md" wrap="wrap" justify={'center'} direction="row">
            {noticias.map((noticia) => (
              <Card w={400} shadow="sm" padding="lg" radius="25" withBorder key={noticia.id}>
                <Card.Section>
                  <Image
                    h={300}
                    src={noticia.imagenDestacada.url}
                    alt="Norway"
                  />
                </Card.Section>
                <Stack
                  m={20}
                  gap={20}
                  align="flex-start"
                >
                  <Button variant="filled" color="#83013E" radius="lg" w={190} mt={20} component='a' href={`./noticias/${noticia.id}`}>Ver noticia</Button>
                  <Text fw={500} size='12' inline>
                  {new Date(noticia.fecha).toLocaleDateString()}
                  </Text>
                  <Text c='#83013E' size='24' inline>
                    {noticia.tituloPrincipal}
                  </Text>
                  <Text lineClamp={3}>
                    {noticia.parrafo1}
                  </Text>
                </Stack>
              </Card>
            ))}
        </Flex>
      </Stack> 
    </div>   
  )
}
