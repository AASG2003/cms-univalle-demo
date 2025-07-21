'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Stack, Text, Grid, GridCol, Group, Loader, Center } from '@mantine/core'
import { IconZoom } from '@tabler/icons-react'
import type { CursoResumen } from '@/app/types/course';

export default function CoursesPage() {
  
  // Toda la lógica de estado y fetching permanece igual
  const [cursos, setCursos] = useState<CursoResumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  const fetchCursos = async (nombre: string) => {
    setLoading(true);
    setNoResults(false);
    try {
      const res = await fetch('/local_api/cursos/filtros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) throw new Error('Error en la petición');
      const data = await res.json();
      setCursos(data);
      if (data.length === 0) setNoResults(true);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos('');
  }, []);

  const handleSearch = () => fetchCursos(searchTerm);
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <div>
      {/* ================================================================ */}
      {/* SECCIÓN SUPERIOR CON ESTILOS FIJOS (SIN RESPONSIVE) */}
      {/* ================================================================ */}
      <Box
        h={'auto'}
        pt={90}  // Padding superior fijo
        pb={70}  // Padding inferior fijo
        style={{
          width: '100%',
          backgroundImage: 'url("/Mask group.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}>
        <Grid w={"99%"}> {/* Ancho de Grid fijo */}
          <GridCol span={7} style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems:'center',
            justifyItems: 'center',
          }}>
            <Text ta="left" size='40' fw={600} inline c='white' w={"80%"}>
              ¿Qué te gustaria aprender el día de hoy?
            </Text>
            {/* Se usa Flex para agrupar Input y Botón manteniendo el ancho deseado */}
            <Flex w={"80%"} mt={30} gap="md">
              <Input
                placeholder="Ingresa el curso que estas buscando"
                style={{ flex: 1 }} // El input ocupa el espacio disponible
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                radius={15}
              />
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                loading={loading}
                radius={15}
              >
                Buscar
              </Button>
            </Flex>
          </GridCol>
          <GridCol offset={1} span={4}> {/* Spans fijos */}
            <Image src={'/image 1.png'} alt='arte' h={'80%'} w={'80%'}/>
          </GridCol>
        </Grid>
      </Box>

      {/* ================================================================ */}
      {/* SECCIÓN DE CURSOS - ESTA PARTE SÍ ES RESPONSIVE */}
      {/* ================================================================ */}
      <Stack p={{ base: 20, md: 50 }} style={{ minHeight: '400px' }}>
        <Text 
          ta={{ base: 'center', md: 'left' }} 
          size='40' 
          fw={600} 
          inline 
          c='#83013E'
        >
          Cursos
        </Text>

        {loading ? (
          <Center style={{ height: '300px' }}><Loader color="#83013E" size="xl" /></Center>
        ) : noResults ? (
          <Center style={{ height: '300px' }}>
            <Text c="dimmed" size="lg" ta="center">No se encontraron cursos con ese nombre.</Text>
          </Center>
        ) : (
          <Flex pl={{ base: 0, md: 30 }} gap="xl" wrap="wrap" justify={'center'} direction="row">
              {cursos.map((curso) => (
                <Card w={{ base: '100%', xs: 350, sm: 320 }} shadow="sm" radius={25} withBorder key={curso.id}>
                  {/* ... el resto del contenido de la tarjeta no cambia ... */}
                  <Card.Section>
                    <Image
                      h={200}
                      src={curso.imagen?.url || '/defaultCourse.png'}
                      alt={curso.imagen?.alt || 'Imagen del curso'}
                    />
                  </Card.Section>
                  <Stack p="md" justify="space-between" style={{ height: 'calc(100% - 200px)' }}>
                    <Stack gap="xs" style={{ flexGrow: 1 }}>
                      <Text c='#83013E' size='xl' lineClamp={2} fw={600}>{curso.nombre}</Text>
                      <Text size="sm" c="dimmed">{curso.academia}</Text>
                      {curso.categorias && curso.categorias.length > 0 && (
                        <Group gap={8} mt="sm" wrap="wrap">
                          {curso.categorias.map((categoria, index) => (
                            <Text key={index} size="xs" c="#83013E" style={{border: '1px solid #83013E', borderRadius: '18px', padding: '4px 10px'}}>{categoria}</Text>
                          ))}
                        </Group>
                      )}
                    </Stack>
                    <Button variant="filled" color="#83013E" radius="lg" w={"100%"} mt="md" component='a' href={`./cursos/${curso.id}`}>
                      Empezar
                    </Button>
                  </Stack>
                </Card>
              ))}
          </Flex>
        )}
      </Stack> 
    </div>   
  )
}