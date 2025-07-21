'use client';

import '@mantine/carousel/styles.css'; 
import { Button, Card, Container, Grid, Group, Image, Text, Stack, Box } from '@mantine/core';
import { JSX } from 'react';

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
            
            <Box style={{ position: 'relative' }}>
              <ResponsiveImage
                src="/sedeSCfigma.png"
                alt="Sede"
                style={{ borderRadius: '15px' }}
              />
              
              {/* Floating Stats Card - Hidden on base (mobile) */}
              <Box 
                display={{ base: 'none', md: 'block' }}
                style={{ position: 'relative', bottom:'500px'}}
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
              Centro Person Vue autorizado para rendir examenes.
            </Text>
            
            <ResponsiveImage
              src="/image 4.png"
              alt="Centro autorizado"
              style={{ borderRadius: '25px', maxHeight: '280px', objectFit: 'cover' }}
            />
            
            <Text 
              ta="left" 
              style={{ 
                lineHeight: 1.4,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            >
              Academias TI UNIVALLE es un espacio de innovación tecnológica
              que impulsa la formación práctica en programación, inteligencia artificial, 
              desarrollo web y software.
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