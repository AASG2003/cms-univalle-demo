'use client'

import { useParams } from 'next/navigation';
import { Anchor, Box, Button, Flex, Grid, GridCol, Image, Paper, Stack, Text } from '@mantine/core'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import '@mantine/carousel/styles.css';
import { Curso } from '@/app/types/course';

export default function Noticia() {


  const params = useParams();
  const id = params?.id as string;
  const [curso, setCurso] = useState<Curso>();
  
  useEffect(() => {
    async function fetchCursos() {
      const res = await fetch(`/local_api/cursos/${id}`);
      const data = await res.json();
      setCurso(data)
    }
    fetchCursos();
  }, [id]);
  
  console.log(curso)

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
              {curso!.nombre}
            </Text>
          </Stack> 
        </Box>
        <Grid w={"99%"} pt={50}>
          <GridCol offset={1} span={7}>
            <Stack>
              {curso?.imagen?.url && (
                <Image
                  w={"100%"}
                  h={"auto"}
                  src={curso.imagen.url}
                  alt={curso.imagen.alt || 'Imagen del curso'}
                />
              )}
              <Text ta="left" size='34' fw={600} inline c='#83013E' w={"80%"}>
                {curso?.nombre}
              </Text>
              <Flex gap={50}>
                <Text>
                  {curso?.nivel}
                </Text>
                <Text>
                  {curso?.duracionHoras} horas 
                </Text>
                <Text>
                  {curso?.nivel}
                </Text>
              </Flex>
                <Text fw={600} ta="left">
                  Descripción del curso
                </Text>
                <Text ta="left">
                  {curso?.descripcion}
                </Text>
                <Anchor href={curso?.link} target="_blank" rel="noopener noreferrer">
                  <Button color="#83013E">Ingresar</Button>
                </Anchor>
            </Stack>
          </GridCol>
          <GridCol span={3}>
            
          </GridCol>
        </Grid>
      </div>
    )
  } catch {
    return notFound
  }
}
