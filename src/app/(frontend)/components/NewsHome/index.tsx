'use client'

import { NoticiaResumen } from '@/app/types/news'
import '@mantine/carousel/styles.css'
import { 
  Button, 
  Card, 
  Container, 
  Grid, 
  Image, 
  Skeleton, 
  Stack, 
  Text, 
  Title,
  Group,
  SimpleGrid,
  AspectRatio
} from '@mantine/core'
import { IconArrowRight, IconCalendar } from '@tabler/icons-react'
import { useEffect, useState, useCallback } from 'react'

interface NewsHomeProps {
  limit?: number
}

// Componente para mostrar el skeleton de carga
const NewsCardSkeleton: React.FC = () => (
  <Card w={{ base: '100%', sm: 400 }} shadow="sm" padding="lg" radius="25" withBorder>
    <Card.Section>
      <Skeleton height={300} />
    </Card.Section>
  </Card>
)

// Componente para cada tarjeta de noticia
const NewsCard: React.FC<{ noticia: NoticiaResumen }> = ({ noticia }) => {
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [])

  return (
    <Card 
      w={{ base: '100%', sm: 400 }} 
      shadow="sm" 
      padding="lg" 
      radius="25" 
      withBorder
      style={{ 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer'
      }}
      onClick={() => window.location.href = `./noticias/${noticia.id}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={noticia.imagenDestacada?.url}
            alt={noticia.tituloPrincipal}
            fallbackSrc="/placeholder-news.jpg"
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </Card.Section>
      
      <Stack m={20} gap="md" align="stretch">
        <Group justify="space-between" align="flex-start">
          <Group gap="xs" c="dimmed">
            <IconCalendar size={16} />
            <Text fz={12} c="dimmed">
              {formatDate(noticia.fecha)}
            </Text>
          </Group>
        </Group>
        
        <Title 
          order={3} 
          fz={20} 
          c="#83013E" 
          lh={1.3}
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {noticia.tituloPrincipal}
        </Title>
        
        <Text 
          lineClamp={3} 
          fz="sm" 
          c="dimmed" 
          lh={1.5}
        >
          {noticia.parrafo1}
        </Text>
        
        <Button 
          variant="filled" 
          color="#83013E" 
          radius="lg" 
          fullWidth
          rightSection={<IconArrowRight size={16} />}
          component="a"
          href={`./noticias/${noticia.id}`}
          onClick={(e) => e.stopPropagation()}
          mt="auto"
        >
          Leer más
        </Button>
      </Stack>
    </Card>
  )
}

// Componente principal optimizado
export function NewsHome({ limit = 3 }: NewsHomeProps) {
  const [noticias, setNoticias] = useState<NoticiaResumen[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNoticias = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`/local_api/noticias?limit=${limit}`)
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      
      const data = await res.json()
      setNoticias(data)
    } catch (err) {
      console.error('Error fetching noticias:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchNoticias()
  }, [fetchNoticias])

  if (error) {
    return (
      <Container size="xl" py={50}>
        <Text c="red" ta="center" fz="lg">
          Error al cargar las noticias: {error}
        </Text>
        <Group justify="center" mt="md">
          <Button onClick={fetchNoticias} variant="outline">
            Intentar nuevamente
          </Button>
        </Group>
      </Container>
    )
  }

  return (
    <Container size="xl" py={{ base: 30, md: 50 }}>
      <Grid align="center" gutter="xl">
        {/* Header Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title
            order={2}
            fz={{ base: 28, md: 40 }}
            fw={600}
            c="#83013E"
            lh={1.2}
            pl={{ base: 0, md: 30 }}
          >
            Conoce las últimas noticias dentro de academias TI
          </Title>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 5 }} offset={{ base: 0, md: 1 }}>
          <Stack align={'center'} gap="md">
            <Text 
              ta={{ base: 'center', md: 'right' }} 
              c="dimmed"
              fz={{ base: 'sm', md: 'md' }}
            >
              Entérate de las novedades sobre academias TI
            </Text>
            <Button 
              variant="filled" 
              color="#83013E" 
              radius="xl" 
              w={{ base: '100%', sm: 200 }}
              component="a" 
              href="./noticias/"
              rightSection={<IconArrowRight size={18} />}
            >
              Ver Noticias
            </Button>
          </Stack>
        </Grid.Col>

        {/* News Cards Section */}
        <Grid.Col span={12} pt={{ base: 30, md: 50 }}>
          {loading ? (
            <SimpleGrid 
              cols={{ base: 1, sm: 2, lg: 3 }} 
              spacing="md" 
              px={{ base: 0, md: 30 }}
            >
              {Array.from({ length: limit }).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </SimpleGrid>
          ) : noticias.length > 0 ? (
            <SimpleGrid 
              cols={{ base: 1, sm: 2, lg: 3 }} 
              spacing="md" 
              px={{ base: 0, md: 30 }}
            >
              {noticias.map((noticia) => (
                <NewsCard key={noticia.id} noticia={noticia} />
              ))}
            </SimpleGrid>
          ) : (
            <Text ta="center" c="dimmed" fz="lg" py={50}>
              No hay noticias disponibles en este momento
            </Text>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  )
}