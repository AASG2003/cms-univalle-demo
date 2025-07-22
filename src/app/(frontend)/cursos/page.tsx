'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Flex, Input, Image, Stack, Text, Grid, GridCol, Group, Loader, Center, SimpleGrid, Container } from '@mantine/core'
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
      {/* Hero Section - Mejorado para responsive */}
      <Box
        h="auto"
        pt={{ base: 60, sm: 80, md: 90 }}
        pb={{ base: 40, sm: 60, md: 70 }}
        px={{ base: 16, sm: 24, md: 32 }}
        style={{
          width: '100%',
          backgroundImage: 'url("/Mask group.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container size="xl" w="100%">
          <Grid gutter="xl" align="center">
            {/* Columna de contenido principal */}
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack align={'center'} gap="lg">
                <Text 
                  ta={{ base: 'center', md: 'left' }} 
                  size="xl"
                  fw={600} 
                  c="white" 
                  style={{
                    fontSize: 'clamp(24px, 4vw, 40px)',
                    lineHeight: 1.2,
                    maxWidth: '90%'
                  }}
                >
                  ¿Qué te gustaría aprender el día de hoy?
                </Text>
                
                {/* Barra de búsqueda */}
                <Stack w="90%" gap="sm" style={{ maxWidth: '500px' }}>
                  <Input
                    placeholder="Ingresa el curso que estás buscando"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                    radius={15}
                    size="lg"
                  />
                  <Button 
                    onClick={handleSearch} 
                    disabled={loading}
                    loading={loading}
                    radius={15}
                    size="lg"
                    w={{ base: '100%', xs: 'auto' }}
                  >
                    Buscar
                  </Button>
                </Stack>
              </Stack>
            </GridCol>
            
            {/* Columna de imagen */}
            <GridCol span={{ base: 12, md: 5 }} style={{ textAlign: 'center' }}>
              <Image 
                src="/image 1.png" 
                alt="arte" 
                h={{ base: 200, sm: 250, md: 300 }}
                w="auto"
                fit="contain"
                style={{ maxWidth: '100%' }}
              />
            </GridCol>
          </Grid>
        </Container>
      </Box>

      {/* Sección de cursos */}
      <Container size="xl">
        <Stack p={{ base: 20, md: 50 }} style={{ minHeight: '400px' }}>
          <Text 
            ta={{ base: 'center', md: 'left' }} 
            fw={600} 
            c='#83013E'
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: '2rem'
            }}
          >
            Cursos
          </Text>

          {loading ? (
            <Center style={{ height: '300px' }}>
              <Loader color="#83013E" size="xl" />
            </Center>
          ) : noResults ? (
            <Center style={{ height: '300px' }}>
              <Stack align="center" gap="md">
                <Text c="dimmed" size="lg" ta="center">
                  No se encontraron cursos con ese nombre.
                </Text>
                <Button 
                  variant="outline" 
                  color="#83013E"
                  onClick={() => fetchCursos('')}
                  radius="md"
                >
                  Ver todos los cursos
                </Button>
              </Stack>
            </Center>
          ) : (
            <SimpleGrid
              cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
              spacing="lg"
              verticalSpacing="lg"
            >
              {cursos.map((curso) => (
                <Card 
                  key={curso.id}
                  shadow="sm" 
                  radius={25} 
                  withBorder
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(131, 1, 62, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Section>
                    <Image
                      h={200}
                      src={curso.imagen?.url || '/defaultCourse.png'}
                      alt={curso.imagen?.alt || 'Imagen del curso'}
                      fit="cover"
                    />
                  </Card.Section>
                  
                  <Stack 
                    p="md"
                    justify="space-between" 
                    style={{ flexGrow: 1 }}
                    gap="xs"
                  >
                    <Stack gap="xs" style={{ flexGrow: 1 }}>
                      <Text 
                        c='#83013E' 
                        size="lg"
                        lineClamp={2} 
                        fw={600}
                        style={{ lineHeight: 1.3 }}
                      >
                        {curso.nombre}
                      </Text>
                      
                      <Text size="sm" c="dimmed" fw={500}>
                        {curso.academia}
                      </Text>
                      
                      {curso.categorias && curso.categorias.length > 0 && (
                        <Group gap={6} mt="xs" wrap="wrap">
                          {curso.categorias.slice(0, 3).map((categoria, index) => (
                            <Text 
                              key={index} 
                              size="xs" 
                              c="#83013E" 
                              style={{
                                border: '1px solid #83013E', 
                                borderRadius: '16px', 
                                padding: '2px 8px',
                                whiteSpace: 'nowrap',
                                fontSize: '10px'
                              }}
                            >
                              {categoria}
                            </Text>
                          ))}
                          {curso.categorias.length > 3 && (
                            <Text size="xs" c="dimmed" style={{ padding: '2px 4px' }}>
                              +{curso.categorias.length - 3}
                            </Text>
                          )}
                        </Group>
                      )}
                    </Stack>
                    
                    <Button 
                      variant="filled" 
                      color="#83013E" 
                      radius="lg" 
                      w="100%" 
                      mt="md"
                      component="a" 
                      href={`./cursos/${curso.id}`}
                    >
                      Empezar
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </div>   
  )
}