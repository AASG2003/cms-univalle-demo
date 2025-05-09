'use client'

import { NoticiaResumen } from '@/app/types/news';
import '@mantine/carousel/styles.css'; 
import { Button, Card, Flex, Grid, Image, Skeleton, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export function NewsHome(){

  const [noticias, setNoticias] = useState<NoticiaResumen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticias() {
      const res = await fetch('/local_api/noticias?limit=5');
      const data = await res.json();
      setNoticias(data);
      setLoading(false);
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
          <Button variant="filled" color="#83013E" radius="xl" w={180} mt={20} component='a' href='./noticias/'>Ver Noticias</Button>
        </Stack>
      </Grid.Col>
      <Grid.Col span={12} pt={50}>
        <Flex pl={30} gap="md" wrap="wrap" justify={'center'} direction="row">
            {noticias.map((noticia) => (
              <Card w={400}  shadow="sm" padding="lg" radius="25" withBorder key={noticia.id}>
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
      </Grid.Col>
    </Grid>
  )
}