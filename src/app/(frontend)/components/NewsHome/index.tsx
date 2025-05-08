'use client'

import '@mantine/carousel/styles.css'; 
import { Badge, Button, Card, Container, Flex, Grid, Group, Image, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export function NewsHome(){

  interface MediaItem {
    id: string;
    url: string;
    alt: string;
  }

  interface NoticiaResumen {
    id: string;
    tituloPrincipal: string;
    fecha: string;
    imagenDestacada: MediaItem;
    parrafo1: any; // Si usas richText, será un array de nodos
  }
  const [noticias, setNoticias] = useState<NoticiaResumen[]>([]);

  useEffect(() => {
    async function fetchNoticias() {
      const res = await fetch('/api/noticias?limit=5');
      const data = await res.json();
      const resumen = data.docs.map((item: any) => ({
        id: item.id,
        tituloPrincipal: item.tituloPrincipal,
        fecha: item.fecha,
        imagenDestacada: item.imagenDestacada,
        parrafo1: item.parrafo1,
      }));
      setNoticias(resumen);
    }
    fetchNoticias();
  }, []);
  
  return(
    <Grid ml={50} mr={50}>
      <Grid.Col span={6} mt={50}>
        <Text ta="left" size='40' fw={600} inline c='#83013E' pl={30} pr={80}>
          Conoce las ultimas noticias dentro de academias TI
        </Text>
      </Grid.Col>
      <Grid.Col offset={1} span={5} mt={50}>
        <Stack align="flex-end">
          <Text>
            Enterate de las novedades sobre academias TI
          </Text>
          <Button variant="filled" color="#83013E" radius="xl" w={180} mt={20}>Ver Cursos</Button>
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} pt={50}>
        <Flex pl={30} gap="md" wrap="wrap" justify={'center'}>
          {noticias.map((noticia) => (
            <Card w={400} shadow="sm" padding="lg" radius="25" withBorder key={noticia.id}>
              <Card.Section>
                <Image
                  src={noticia.imagenDestacada.url}
                  alt="Norway"
                />
              </Card.Section>
              <Stack
                m={20}
                gap={20}
                align="flex-start"
              >
                <Button variant="filled" color="#83013E" radius="lg" w={190} mt={20}>Ver Cursos</Button>
                <Text fw={500} size='12' inline>
                {new Date(noticia.fecha).toLocaleDateString()}
                </Text>
                <Text c='#83013E' size='24' inline>
                  {noticia.tituloPrincipal}
                </Text>
                <Text>
                </Text>
              </Stack>
            </Card>
          ))}
          <Card w={400} shadow="sm" padding="lg" radius="25" withBorder>
            <Card.Section>
              <Image
                src="./Rectangle 22.png"
                alt="Norway"
              />
            </Card.Section>
            <Stack
              m={20}
              gap={20}
              align="flex-start"
            >
              <Button variant="filled" color="#83013E" radius="lg" w={190} mt={20}>Ver Cursos</Button>
              <Text fw={500} size='12' inline>
                25 agosto 2025
              </Text>
              <Text c='#83013E' size='24' inline>
                Premio
              </Text>
              <Text>
                Premio de prestigio
              </Text>
            </Stack>
          </Card>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}