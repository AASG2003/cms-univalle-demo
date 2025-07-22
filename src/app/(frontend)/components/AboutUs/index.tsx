'use client';

import '@mantine/carousel/styles.css'; 
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import { Button, Card, Container, Grid, Group, Image, Text, Stack, Box, rem, Title } from '@mantine/core';
import { JSX, useState } from 'react';

// Types
interface StatData {
  value: string;
  label: string;
  showImage?: boolean;
}

interface StatCardProps {
  stat: StatData;
  isFloating?: boolean;
  className?: string;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

// Constants
const BRAND_COLOR = '#83013E';

const STATS_DATA: StatData[] = [
  { value: '1mil+', label: 'Estudiantes', showImage: true },
  { value: '200+', label: 'Cursos' },
  { value: '10+', label: 'Centros de certificación con convenio' },
  { value: '1mil+', label: 'Certificaciones' },
  { value: '5', label: 'Sedes' }
];

// Reusable Components
const StatCard: React.FC<StatCardProps> = ({ stat, isFloating = false, className = '' }) => (
  <Card
    shadow="lg"
    radius="xl"
    p="md"
    className={className}
    style={{
      backgroundColor: 'white',
      minHeight: isFloating ? '150px' : '110px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      ...(isFloating && {
        position: 'absolute',
        top: '20%',
        right: '-10%',
        zIndex: 2,
        width: '190px',
      })
    }}
  >
    <Text c={BRAND_COLOR} ta="center" fw={600} size="xl">
      {stat.value}
    </Text>
    <Text ta="center" size="sm" mt="xs">
      {stat.label}
    </Text>
    {stat.showImage && (
      <Image 
        alt="estudiantes" 
        src="/3 imgs.png" 
        h={40} 
        w={120}
        mt="xs"
      />
    )}
  </Card>
);

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt = 'Image', style = {}, ...props }) => (
  <Image
    alt={alt}
    src={src}
    style={{
      width: '100%',
      height: 'auto',
      ...style
    }}
    {...props}
  />
);

export function AboutUs(): JSX.Element {
  
  const [flipped, setFlipped] = useState(false);
  const mainStats: StatData[] = STATS_DATA.slice(0, 1);
  const sideStats: StatData[] = STATS_DATA.slice(1);

  return (
    <Container size="xl" px="md" py="xl">
      <Grid gutter="xl" align="stretch">
        {/* Left Column - Main Content */}
        <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
          <Stack gap="xl">
            <Text
              size="xl"
              fw={600}
              c={BRAND_COLOR}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: 1.2
              }}
            >
              Academias de tecnología e Innovación Univalle
            </Text>
            
            <Box style={{
              display: 'flex',
              justifyContent: 'center', // horizontal
              height: '100%',           // asegúrate que tenga altura suficiente
              width: '100%',
              position: 'relative',
            }}>
              <Box
                style={{
                  width: 'clamp(280px, 80vw, 500px)', // mínimo 280px, máximo 500px, preferido 90% del viewport
                  height: 'clamp(340px, 90vw, 600px)', // se escala con el ancho
                  perspective: rem(1000),
                }}
                onMouseEnter={() => setFlipped(true)}
                onMouseLeave={() => setFlipped(false)}
              >
                <motion.div
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Cara frontal (imagen) */}
                  <Box
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: rem(12),
                      overflow: 'hidden',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <Image
                      src="/sedeSCfigma.png"
                      alt="Sede"
                      style={{
                        objectFit: 'cover',
                        borderRadius: rem(12),
                      }}
                    />
                  </Box>

                  {/* Cara trasera (texto) */}
                  <Box
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: rem(12),
                      backgroundColor: 'white',
                      color: '#212529',
                      display: 'flex',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      padding: rem(16),
                      textAlign: 'center',
                    }}
                  >
                    <Stack gap="md">
                      <Title order={3} size={"h3"} ta="center">
                        Competencias Certificadas en UNIVALLE
                      </Title>

                      <Text size="md" ta="justify">
                        Las <strong>Competencias Certificadas</strong> son habilidades clave exigidas en el ámbito
                        laboral, validadas mediante procesos de <strong>certificación y capacitación</strong> respaldados por
                        UNIVALLE y organizaciones multinacionales reconocidas.
                      </Text>

                      <ul style={{ paddingLeft: '1.25rem' }}>
                        <li>
                          <Text size="md" component="span">
                            Potenciar el <strong>perfil del graduado</strong> con certificados avalados por academias
                            profesionales.
                          </Text>
                        </li>
                        <li>
                          <Text size="md" component="span">
                            Ofrecer una <strong>formación actualizada</strong> y conectada con las demandas del mercado.
                          </Text>
                        </li>
                        <li>
                          <Text size="md" component="span">
                            Brindar acceso a <strong>certificaciones profesionales</strong> con beneficios financieros
                            derivados de convenios institucionales.
                          </Text>
                        </li>
                      </ul>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
              {/* Floating Stats Card - Hidden on base (mobile) */}
              <Box 
                display={{ base: 'none', md: 'block' }}
                style={{ position: 'relative', left:'100px'}}
              >
                <StatCard stat={mainStats[0]} isFloating />
              </Box>
            </Box>
            
            {/* Mobile Stats Card - Shown from base up to md */}
            <Box display={{ base: 'block', md: 'none' }}>
              <StatCard stat={mainStats[0]} />
            </Box>
          </Stack>
        </Grid.Col>

        {/* Center Column - Description & CTA */}
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Stack gap="xl" h="100%" justify="space-between">
            <Text ta="center" size="lg" fw={500}>
              Mejora el Perfil del <br/> Graduado de la UNIVALLE
            </Text>
            
            <ResponsiveImage
              src="/image 4.png"
              alt="Centro autorizado"
              style={{ borderRadius: '25px', maxHeight: '280px', objectFit: 'cover' }}
            />
            
            <Text 
              ta="center" 
              style={{ 
                lineHeight: 1.4,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              }}
            >
              Las competencias certificadas permiten demostrar habilidades clave exigidas en el entorno profesional. 
              Gracias a convenios con organizaciones prestigiosas, UNIVALLE integra estas certificaciones en sus materias, 
              brindando a los estudiantes ventajas como un currículo actualizado, mejor empleabilidad, 
              y acceso simplificado a exámenes de certificación reconocidos.
            </Text>
            
            <Group justify="center">
              <Button 
                variant="filled" 
                color={BRAND_COLOR} 
                radius="xl" 
                size="md"
                component="a" 
                href="/personvue"
                style={{ minWidth: '140px' }}
              >
                Conoce más
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        {/* Right Column - Certification & Stats */}
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Stack gap="md" h="100%">
            <Group justify="center">
              <ResponsiveImage
                src="/Pearson VUE Authorized Test Center_US 1.png"
                alt="Pearson VUE Authorized"
                style={{ 
                  borderRadius: '25px',
                  maxHeight: '120px',
                  objectFit: 'contain'
                }}
              />
            </Group>
            
            {/* Stats Cards */}
            <Stack gap="sm">
              {sideStats.map((stat, index) => (
                <StatCard 
                  key={`${stat.value}-${index}`} 
                  stat={stat}
                />
              ))}
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}