'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Stack, Text, Grid, GridCol, Group } from '@mantine/core'
import { IconZoom } from '@tabler/icons-react'
import { CursoResumen } from '@/app/types/course';

export default function NewsPage() {
  
  const [cursos, setCursos] = useState<CursoResumen[]>([]);

  useEffect(() => {
    async function fetchNoticias() {
      const res = await fetch('/local_api/cursos?limit=5');
      const data = await res.json();
      setCursos(data);
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
        <Grid w={"99%"}>
          <GridCol span={7} style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems:'center',
            justifyItems: 'center',
          }}>
            <Text ta="left" size='40' fw={600} inline c='white' w={"80%"}>
              ¿Qué te gustaria aprender el día de hoy?
            </Text>
            <Input placeholder="Ingresa el curso que estas buscando" rightSection={<IconZoom size={16} />} w={"80%"} mt={30} radius={15}/>
          </GridCol>
          <GridCol offset={1} span={4}>
            <Image src={'/image 1.png'} alt='arte' h={'80%'} w={'80%'}/>
          </GridCol>
        </Grid>
      </Box>
      <Stack p={50}
      style={{
          height:'100%'
        }}>
        <Text ta="left" size='40' fw={600} inline c='#83013E' w={"50%"}>
          Cursos
        </Text>
        <Flex pl={30} gap="md" wrap="wrap" justify={'center'} direction="row">
            {cursos.map((curso) => (
              <Card w={300} shadow="sm" radius="25" withBorder key={curso.id}>
                <Card.Section>
                  <Image
                    h={200}
                    src={curso.imagen?.url || '/defaultCourse.png'}
                    alt={curso.imagen?.alt || 'Imagen del curso'}
                  />
                </Card.Section>
                <Stack
                  mt={20}
                  gap={5}
                  align="flex-start"
                  justify="space-between"
                  style={{ height: '100%' }}
                >
                  <Text c='#83013E' size='20' inline fw={400}>
                    {curso.nombre}
                  </Text>
                  <Text style={{ flexGrow: 1 }}>
                    {curso.academia}
                  </Text>
                  {curso.categorias && (
                    <Group gap="xs" wrap="wrap">
                      {curso.categorias.map((categoria, index) => (
                        <Text
                          key={index}
                          size="sm"
                          c="#83013E"
                          style={{
                            border: '1px solid #83013E',
                            borderRadius: '18px',
                            padding: '4px 10px',
                          }}
                        >
                          {categoria}
                        </Text>
                      ))}
                    </Group>
                  )}
                  <Button variant="filled" color="#83013E" radius="lg" w={"100%"} mt={20} component='a' href={`./cursos/${curso.id}`}>Empezar</Button>
                </Stack>
              </Card>
            ))}
        </Flex>
      </Stack> 
    </div>   
  )
}
