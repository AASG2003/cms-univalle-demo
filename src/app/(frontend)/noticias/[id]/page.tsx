'use client'

import { useParams } from 'next/navigation';
import { Media, Noticia } from '@/payload-types'
import { Box, Flex, Grid, GridCol, Image, Stack, Text } from '@mantine/core'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconCalendarWeek, IconQuoteFilled } from '@tabler/icons-react';
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

export default function NoticiaDetalle() {
  interface NoticiaConImagen extends Noticia {
    imagenDestacada: Media;
  }

  const params = useParams();
  const id = params?.id as string;
  const [noticia, setNoticia] = useState<NoticiaConImagen>();
  
  useEffect(() => {
    async function fetchNoticias() {
      const res = await fetch(`/local_api/noticias/${id}`);
      const data = await res.json();
      setNoticia(data)
    }
    fetchNoticias();
  }, [id]);
  console.log(noticia)

  try {
    return(
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
              {noticia!.tituloPrincipal}
            </Text>
          </Stack> 
        </Box>

        <Box w={"99%"}>
          <Grid mt={50}>
            <GridCol offset={1} span={7}>
              <Stack gap={30} align='center' justify='center'>
                <Image alt={'imagen principal'} src={noticia?.imagenDestacada.url}/>
                <Flex>
                  <IconCalendarWeek size={15}/>
                  <Text ml={10} style={{
                  }}>
                    {new Date(noticia!.fecha).toLocaleDateString()}
                  </Text>
                </Flex>
                <Text ta="left" size='38' fw={600} inline c='#83013E'>
                  Reconocimiento Internacional Único para Univalle
                </Text>
                <Text>
                  <RichTextConverter data={noticia!.parrafo1}/>
                </Text>
                {Array.isArray(noticia?.carruselImagenes) &&
                  noticia.carruselImagenes.some(item => typeof item.imagen === 'object' && item.imagen?.url) && (
                    <Carousel
                      slideSize={{ base: '100%', sm: '50%' }}
                      slideGap={{ base: 'xl', sm: 2 }}
                      emblaOptions={{ align: 'start', slidesToScroll: 2 }}
                    >
                      {noticia.carruselImagenes.map((item, index) =>
                        item.imagen && typeof item.imagen === 'object' ? (
                          <Carousel.Slide key={item.imagen.id || index}>
                            <div style={{ position: 'relative', height: 300, width: '100%' }}>
                              <Image
                                src={item.imagen.url}
                                alt={item.imagen.alt || 'Imagen del carrusel'}
                                style={{ objectFit: 'cover', borderRadius: 8 }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </Carousel.Slide>
                        ) : null
                      )}
                    </Carousel>
                )}
                <Text ta="left" size='38' fw={600} inline c='#83013E'>
                  {noticia?.tituloSecundario2}
                </Text>
                <Text>
                  <RichTextConverter data={noticia!.parrafo2}/>
                </Text>
                <IconQuoteFilled color='#83013E'/>
                <Text ta={'center'}>
                  {noticia!.loDijo}
                </Text>
              </Stack>
            </GridCol>
            <GridCol span={3}>
            </GridCol>
          </Grid>
        </Box>
      </div>
    )
  } catch {
    return notFound
  }
}
