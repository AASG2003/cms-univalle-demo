'use client';

import { useParams } from 'next/navigation';
import { 
  Box, 
  Container, 
  Grid, 
  Image, 
  Paper, 
  Stack, 
  Text,
  Skeleton,
  Center,
  Group,
  Divider
} from '@mantine/core';
import { notFound } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { IconCalendarWeek, IconQuoteFilled, IconArrowRight } from '@tabler/icons-react';
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

// Types
interface ImageObject {
  id?: string;
  url: string;
  alt?: string;
}

interface CarruselItem {
  imagen: ImageObject;
}

interface NoticiaConImagen {
  id: string | number;
  tituloPrincipal: string;
  fecha: string;
  imagenDestacada: ImageObject;
  parrafo1: any; // RichText data
  carruselImagenes?: CarruselItem[];
  tituloSecundario2?: string;
  parrafo2?: any; // RichText data
  loDijo?: string;
  autoria?: string;
}

interface NoticiaResumen {
  id: string | number;
  fecha: string;
  tituloPrincipal: string;
}

// Constants
const BRAND_COLOR = '#83013E';
const HERO_IMAGE = '/Mask group.png';
const RECENT_NEWS_LIMIT = 5;

// Components
interface HeroSectionProps {
  title?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => (
  <Box
    h={{ base: '250px', sm: '350px', md: '400px' }}
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
      <Center>
        {title ? (
          <Text 
            ta="center" 
            c="white"
            fw={600}
            w={{ base: '95%', sm: '85%', md: '75%' }}
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              lineHeight: 1.2
            }}
          >
            {title}
          </Text>
        ) : (
          <Skeleton height={60} width="70%" />
        )}
      </Center>
    </Container>
  </Box>
);

const ArticleSkeleton: React.FC = () => (
  <Stack gap="xl">
    <Skeleton height={300} />
    <Group>
      <Skeleton height={20} width={20} />
      <Skeleton height={20} width={120} />
    </Group>
    <Skeleton height={40} />
    <Skeleton height={200} />
    <Skeleton height={300} />
    <Skeleton height={40} />
    <Skeleton height={150} />
  </Stack>
);

interface ImageCarouselProps {
  images: CarruselItem[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const validImages = images.filter(item => 
    item.imagen && typeof item.imagen === 'object' && item.imagen.url
  );

  if (validImages.length === 0) return null;

  return (
    <Box w="100%" my="xl">
      <Carousel
        slideSize={{ base: '100%', sm: '80%', md: '60%' }}
        slideGap={{ base: 'md', sm: 'lg' }}
        emblaOptions={{ align: 'start', slidesToScroll: 1 }}
        withIndicators
        height={300}
      >
        {validImages.map((item, index) => (
          <Carousel.Slide key={item.imagen.id || index}>
            <Box style={{ height: '100%', width: '100%' }}>
              <Image
                src={item.imagen.url}
                alt={item.imagen.alt || `Imagen del carrusel ${index + 1}`}
                style={{ 
                  objectFit: 'cover', 
                  borderRadius: 8,
                  height: '100%',
                  width: '100%'
                }}
                fallbackSrc="/placeholder-image.jpg"
              />
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

interface QuoteBlockProps {
  quote: string;
  author?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author }) => (
  <Box
    p={{ base: 'lg', md: 'xl' }}
    my="xl"
    style={{
      backgroundColor: '#f8f9fa',
      borderLeft: `4px solid ${BRAND_COLOR}`,
      borderRadius: '8px'
    }}
  >
    <Stack align="center" gap="md">
      <IconQuoteFilled color={BRAND_COLOR} size={40} />
      <Text 
        ta="center" 
        fw={600}
        size="lg"
        style={{ 
          fontStyle: 'italic',
          lineHeight: 1.4
        }}
      >
        &quot;{quote}&quot;
      </Text>
      {author && (
        <Text ta="center" c="dimmed" size="sm">
          — {author}
        </Text>
      )}
    </Stack>
  </Box>
);

interface SidebarProps {
  recentNews: NoticiaResumen[];
  loading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ recentNews, loading }) => (
  <Stack gap="md">
    <Text 
      c={BRAND_COLOR} 
      fw={600}
      size="xl"
      mb="sm"
    >
      Noticias Recientes
    </Text>
    <Divider />
    {loading ? (
      Array.from({ length: 3 }).map((_, index) => (
        <Paper key={`skeleton-${index}`} p="md" radius="md" withBorder>
          <Stack gap="xs">
            <Skeleton height={15} width="40%" />
            <Skeleton height={20} />
          </Stack>
        </Paper>
      ))
    ) : (
      recentNews.map((item) => (
        <Paper 
          key={item.id} 
          p="md" 
          radius="md" 
          component="a" 
          href={`./${item.id}`}
          shadow="xs"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          }}
        >
          <Stack gap="xs">
            <Group gap="xs" c="dimmed">
              <IconCalendarWeek size={14} />
              <Text size="xs">
                {new Date(item.fecha).toLocaleDateString('es-ES')}
              </Text>
            </Group>
            <Group justify="space-between" align="flex-start">
              <Text fw={500} size="sm" style={{ flex: 1 }}>
                {item.tituloPrincipal}
              </Text>
              <IconArrowRight size={16} color={BRAND_COLOR} />
            </Group>
          </Stack>
        </Paper>
      ))
    )}
  </Stack>
);

// Custom Hooks
const useNoticia = (id: string) => {
  const [noticia, setNoticia] = useState<NoticiaConImagen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNoticia = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/local_api/noticias/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Noticia no encontrada');
          }
          throw new Error('Error al cargar la noticia');
        }
        
        const data = await response.json();
        setNoticia(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching noticia:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  return { noticia, loading, error };
};

const useRecentNews = () => {
  const [recentNews, setRecentNews] = useState<NoticiaResumen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await fetch(`/local_api/noticias?limit=${RECENT_NEWS_LIMIT}`);
        if (response.ok) {
          const data = await response.json();
          setRecentNews(data);
        }
      } catch (err) {
        console.error('Error fetching recent news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNews();
  }, []);

  return { recentNews, loading };
};

// Main Component
export default function Noticia(): JSX.Element {
  const params = useParams();
  const id = params?.id as string;
  
  const { noticia, loading, error } = useNoticia(id);
  const { recentNews, loading: recentNewsLoading } = useRecentNews();

  if (error === 'Noticia no encontrada') {
    return notFound();
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box>
      <HeroSection title={noticia?.tituloPrincipal} />
      
      <Container size="xl" py={{ base: 'xl', md: '50px' }}>
        <Grid gutter={{ base: 'lg', md: 'xl' }}>
          {/* Main Content */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            {loading ? (
              <ArticleSkeleton />
            ) : error ? (
              <Center py="xl">
                <Text c="red" ta="center">
                  {error}
                </Text>
              </Center>
            ) : noticia ? (
              <Stack gap="xl">
                {/* Featured Image */}
                <Box>
                  <Image
                    src={noticia.imagenDestacada?.url}
                    alt={noticia.tituloPrincipal}
                    radius="md"
                    fallbackSrc="/placeholder-image.jpg"
                  />
                </Box>

                {/* Date */}
                <Group gap="xs" c="dimmed">
                  <IconCalendarWeek size={16} />
                  <Text size="sm">
                    {formatDate(noticia.fecha)}
                  </Text>
                </Group>

                {/* Main Title */}
                <Text 
                  c={BRAND_COLOR}
                  fw={600}
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                    lineHeight: 1.3
                  }}
                >
                  Reconocimiento Internacional Único para Univalle
                </Text>

                {/* First Paragraph */}
                {noticia.parrafo1 && (
                  <Box style={{ lineHeight: 1.6 }}>
                    <RichTextConverter data={noticia.parrafo1} />
                  </Box>
                )}

                {/* Image Carousel */}
                {noticia.carruselImagenes && noticia.carruselImagenes.length > 0 && (
                  <ImageCarousel images={noticia.carruselImagenes} />
                )}

                {/* Secondary Title */}
                {noticia.tituloSecundario2 && (
                  <Text 
                    c={BRAND_COLOR}
                    fw={600}
                    size="xl"
                    mt="xl"
                  >
                    {noticia.tituloSecundario2}
                  </Text>
                )}

                {/* Second Paragraph */}
                {noticia.parrafo2 && (
                  <Box style={{ lineHeight: 1.6 }}>
                    <RichTextConverter data={noticia.parrafo2} />
                  </Box>
                )}

                {/* Quote Block */}
                {noticia.loDijo && (
                  <QuoteBlock quote={noticia.loDijo} author={noticia.autoria} />
                )}

                {/* Author (if not in quote) */}
                {noticia.autoria && !noticia.loDijo && (
                  <Text ta="center" c="dimmed" mt="xl">
                    {noticia.autoria}
                  </Text>
                )}
              </Stack>
            ) : null}
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Box display={{ base: 'none', lg: 'block' }}>
              <Sidebar recentNews={recentNews} loading={recentNewsLoading} />
            </Box>
          </Grid.Col>
        </Grid>

        {/* Mobile Recent News */}
        <Box display={{ base: 'block', lg: 'none' }} mt="xl">
          <Sidebar recentNews={recentNews} loading={recentNewsLoading} />
        </Box>
      </Container>
    </Box>
  );
}