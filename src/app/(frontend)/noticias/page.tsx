'use client';

import React, { JSX, useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  Container, 
  Grid, 
  Input, 
  Image, 
  Skeleton, 
  Stack, 
  Text,
  Center,
  Group
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

// Types
interface ImagenDestacada {
  url: string;
}

interface NoticiaResumen {
  id: string | number;
  imagenDestacada: ImagenDestacada;
  fecha: string;
  tituloPrincipal: string;
  parrafo1: string;
}

// Constants
const BRAND_COLOR = '#83013E';
const HERO_IMAGE = '/Mask group.png';
const NEWS_LIMIT = 5;

// Components
const HeroSection: React.FC<{
  onSearch: (query: string) => void;
  loading: boolean;
  search: string;
  setSearch: (val: string) => void;
}> = ({ onSearch, loading, search, setSearch }) => (
  <Box
    h={{ base: '300px', sm: '400px', md: '500px' }}
    pt={{ base: '60px', sm: '80px', md: '90px' }}
    pb={{ base: '40px', sm: '60px', md: '70px' }}
    style={{
      width: '100%',
      backgroundImage: `url("${HERO_IMAGE}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Container size="lg">
      <Stack align="center" gap="xl">
        <Text 
          ta="center" 
          c="white"
          fw={600}
          w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            lineHeight: 1.2
          }}
        >
          Entérate de las novedades de academias
        </Text>

        <Group w={{ base: '90%', sm: '70%', md: '60%', lg: '50%' }}>
          <Input 
            placeholder="Ingresa un tópico" 
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="xl"
            size="md"
            style={{ flex: 1 }}
          />
          <Button 
            onClick={() => onSearch(search)}
            disabled={loading}
            radius="xl"
            size="md"
            leftSection={<IconSearch size={16} />}
          >
            Buscar
          </Button>
        </Group>
      </Stack>
    </Container>
  </Box>
);

const NewsCardSkeleton: React.FC = () => (
  <Card 
    shadow="sm" 
    padding="lg" 
    radius="xl" 
    withBorder
    style={{ height: '500px' }}
  >
    <Card.Section>
      <Skeleton height={200} />
    </Card.Section>
    <Stack gap="sm" mt="md">
      <Skeleton height={40} width="60%" />
      <Skeleton height={20} width="30%" />
      <Skeleton height={30} width="90%" />
      <Skeleton height={60} />
    </Stack>
  </Card>
);

interface NewsCardProps {
  noticia: NoticiaResumen;
}

const NewsCard: React.FC<NewsCardProps> = ({ noticia }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="xl" 
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Card.Section>
        <Image
          h={200}
          src={noticia.imagenDestacada?.url}
          alt={noticia.tituloPrincipal}
          fallbackSrc="/placeholder-image.jpg"
        />
      </Card.Section>
      
      <Stack 
        gap="sm" 
        mt="md"
        style={{ flex: 1, justifyContent: 'space-between' }}
      >
        <div>
          <Text size="xs" c="dimmed" mb="xs">
            {formatDate(noticia.fecha)}
          </Text>
          
          <Text 
            c={BRAND_COLOR} 
            fw={600}
            size="lg"
            mb="sm"
            style={{ lineHeight: 1.3 }}
          >
            {noticia.tituloPrincipal}
          </Text>
          
          <Text 
            size="sm" 
            c="dimmed" 
            lineClamp={3}
            style={{ lineHeight: 1.4 }}
          >
            {noticia.parrafo1}
          </Text>
        </div>
        
        <Group justify="flex-start" mt="md">
          <Button 
            variant="filled" 
            color={BRAND_COLOR} 
            radius="xl" 
            size="sm"
            component="a" 
            href={`./noticias/${noticia.id}`}
            fullWidth
          >
            Ver noticia
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

// Custom Hook
const useNoticias = (initialSearch = '') => {
  const [noticias, setNoticias] = useState<NoticiaResumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch);

  const fetchNoticias = async (query: string = '') => {
    try {
      setLoading(true);
      const response = await fetch(`/local_api/noticias/filtros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tituloPrincipal: query })
      });

      if (!response.ok) {
        throw new Error('Error al cargar las noticias');
      }

      const data = await response.json();
      setNoticias(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching noticias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return { noticias, loading, error, fetchNoticias, search, setSearch };
};

// Main Component
export default function NewsPage(): JSX.Element {
  const { noticias, loading, error, fetchNoticias, search, setSearch } = useNoticias();

  const renderNewsContent = () => {
    if (error) {
      return (
        <Center py="xl">
          <Text c="red" ta="center">
            {error}
          </Text>
        </Center>
      );
    }

    if (loading) {
      return (
        <Grid gutter="lg">
          {Array.from({ length: NEWS_LIMIT }).map((_, index) => (
            <Grid.Col key={`skeleton-${index}`} span={{ base: 12, sm: 6, lg: 4 }}>
              <NewsCardSkeleton />
            </Grid.Col>
          ))}
        </Grid>
      );
    }

    if (noticias.length === 0) {
      return (
        <Center py="xl">
          <Text ta="center" c="dimmed">
            No hay noticias disponibles en este momento.
          </Text>
        </Center>
      );
    }

    return (
      <Grid gutter="lg">
        {noticias.map((noticia) => (
          <Grid.Col key={noticia.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <NewsCard noticia={noticia} />
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <HeroSection 
        onSearch={fetchNoticias} 
        loading={loading} 
        search={search} 
        setSearch={setSearch} 
      />

      <Container size="xl" py={{ base: 'xl', md: '70px' }}>
        <Stack gap="xl">
          <Text 
            ta={{ base: 'center', sm: 'left' }} 
            c={BRAND_COLOR}
            fw={600}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Noticias
          </Text>

          {renderNewsContent()}
        </Stack>
      </Container>
    </Box>
  );
}
