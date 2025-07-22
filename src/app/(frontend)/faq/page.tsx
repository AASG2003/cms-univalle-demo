'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { 
  Box, 
  Input, 
  Stack, 
  Text, 
  Accordion, 
  Group, 
  Anchor, 
  Button, 
  Container,
  Title,
  Skeleton,
  Center,
  Alert
} from '@mantine/core'
import { IconSearch, IconFileText, IconAlertCircle } from '@tabler/icons-react'
import { FaqResumen } from '@/app/types/faq'

interface FaqProps {
  limit?: number
}

// Componente para el skeleton de carga
const FaqSkeleton: React.FC = () => (
  <Accordion chevronPosition="right" variant="contained">
    {Array.from({ length: 5 }).map((_, index) => (
      <Accordion.Item value={`skeleton-${index}`} key={`skeleton-${index}`}>
        <Skeleton height={60} radius="md" mb="sm" />
      </Accordion.Item>
    ))}
  </Accordion>
)

// Componente para cada item del FAQ
const FaqItem: React.FC<{ faq: FaqResumen }> = ({ faq }) => (
  <Accordion.Item value={faq.id} p={{ base: 'md', md: 'xl' }}>
    <Accordion.Control>
      <Group wrap="nowrap" align="flex-start">
        <Box style={{ flex: 1 }}>
          <Text 
            fz={{ base: 18, md: 23 }} 
            fw={500} 
            c="#83013E" 
            lh={1.3}
            pr="md"
          >
            {faq.titulo}
          </Text>
        </Box>
      </Group>
    </Accordion.Control>
    
    <Accordion.Panel>
      <Stack gap="lg" pt="md">
        <Text 
          fz={{ base: 'sm', md: 'md' }} 
          lh={1.6} 
          c="dark.6"
          style={{ whiteSpace: 'pre-line' }}
        >
          {faq.respuesta}
        </Text>
        
        {faq.pdf?.url && (
          <Group justify="flex-start">
            <Anchor 
              href={faq.pdf.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button 
                color="#83013E" 
                variant="filled"
                leftSection={<IconFileText size={18} />}
                radius="md"
                size={'sm'}
              >
                Ver Manual PDF
              </Button>
            </Anchor>
          </Group>
        )}
      </Stack>
    </Accordion.Panel>
  </Accordion.Item>
)

// Componente principal optimizado
export default function Faq() {
  const [faqs, setFaqs] = useState<FaqResumen[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Función para cargar FAQs
  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch(`/local_api/faq?limit=10}`)
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      
      const data = await res.json()
      setFaqs(data)
    } catch (err) {
      console.error('Error fetching FAQs:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFaqs()
  }, [fetchFaqs])

  // Filtrar FAQs basado en la búsqueda
  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs
    
    return faqs.filter(faq =>
      faq.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [faqs, searchTerm])

  // Componente del hero section
  const HeroSection = () => (
    <Box
      style={{
        minHeight: '50vh',
        backgroundImage: 'url("/Mask group.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container size="md" w="100%">
        <Stack align="center" gap="xl" px={{ base: 'md', md: 0 }}>
          <Title
            order={1}
            fz={{ base: 32, sm: 40, md: 50 }}
            fw={600}
            c="white"
            ta="center"
            lh={1.2}
          >
            Preguntas Frecuentes
          </Title>
          
          <Text 
            ta="center" 
            fz={{ base: 'sm', md: 'md' }} 
            c="white" 
            opacity={0.9}
            maw={600}
          >
            Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios
          </Text>
          
          {/* <Input
            placeholder="Buscar en preguntas frecuentes..."
            rightSection={<IconSearch size={18} />}
            w="100%"
            maw={500}
            size="lg"
            radius="xl"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                fontSize: '16px'
              }
            }}
          /> */}
        </Stack>
      </Container>
    </Box>
  )

  return (
    <Box>
      <HeroSection />
      
      <Container size="lg" py={{ base: 40, md: 80 }}>
        {error ? (
          <Center>
            <Alert 
              icon={<IconAlertCircle size="1rem" />} 
              title="Error al cargar FAQs" 
              color="red"
              variant="filled"
              maw={500}
            >
              <Text mb="md">{error}</Text>
              <Button 
                onClick={fetchFaqs} 
                variant="white" 
                color="red"
                size="sm"
              >
                Intentar nuevamente
              </Button>
            </Alert>
          </Center>
        ) : loading ? (
          <FaqSkeleton />
        ) : filteredFaqs.length > 0 ? (
          <>
            {searchTerm && (
              <Text 
                mb="lg" 
                fz="sm" 
                c="dimmed" 
                ta="center"
              >
                {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} 
                para &quot;{searchTerm}&quot;
              </Text>
            )}
            
            <Accordion 
              chevronPosition="right" 
              variant="contained"
              radius="md"
              styles={{
                item: {
                  marginBottom: '12px',
                  border: '1px solid #e9ecef',
                  '&:hover': {
                    backgroundColor: '#f8f9fa'
                  }
                },
                control: {
                  padding: '20px 24px',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                },
                panel: {
                  backgroundColor: '#fafafa'
                }
              }}
            >
              {filteredFaqs.map((faq) => (
                <FaqItem key={faq.id} faq={faq} />
              ))}
            </Accordion>
          </>
        ) : (
          <Center py={50}>
            <Stack align="center" gap="md">
              <IconSearch size={48} color="#ccc" />
              <Text fz="lg" c="dimmed" ta="center">
                {searchTerm 
                  ? `No se encontraron resultados para "${searchTerm}"`
                  : 'No hay preguntas frecuentes disponibles'
                }
              </Text>
              {searchTerm && (
                <Button 
                  variant="subtle" 
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </Stack>
          </Center>
        )}
      </Container>
    </Box>
  )
}