'use client';

import '@mantine/carousel/styles.css';
import Image from 'next/image';
import { Button, Flex, Grid, Text, Box } from '@mantine/core';
import { CarouselHero } from '../CarouselHero';
import { useMediaQuery } from '@mantine/hooks';
import { rem } from '@mantine/core';

export function HeroSection() {
  const isMobile = useMediaQuery('(max-width: 36em)');
  const isTablet = useMediaQuery('(max-width: 48em)');

  const headingSize = isMobile ? rem(32) : isTablet ? rem(48) : rem(60);
  const paragraphSize = isMobile ? rem(14) : rem(16);

  return (
    <>
      <Grid
        m={{ base: 15, sm: 30, md: 60 }}
        px={{ base: 'sm', md: 'md' }}
        py="sm"
        justify="center"
        align="center"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 'auto',
          minHeight: '720px',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'transparent',
          border: 'none',
        }}
      >
        <Grid.Col span={{ base: 12, md: 8, lg: 6 }}>
          <Flex
            align="center"
            direction="column"
            justify="center"
            style={{
              height: '100%',
              color: 'white',
            }}
          >
            <Box w={{ base: 80, sm: 100 }} h={{ base: 80, sm: 100 }} mb="md">
              <Image
                alt="logo Univalle"
                src="/LOGO NUEVO COMPLETO Patch.png"
                width={100}
                height={100}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>

            <Text
              ta="center"
              fw={700}
              inline
              style={{
                paddingTop: 5,
                paddingBottom: 15,
                lineHeight: 1.1,
                fontSize: headingSize,
              }}
            >
              Aquí creamos un brillante mañana hoy
            </Text>

            <Text
              ta="center"
              w={{ base: '90%', sm: '80%' }}
              style={{
                paddingBottom: 15,
                fontSize: paragraphSize,
              }}
            >
              Proporcionamos conocimiento y herramientas para las futuras
              generaciones, ¿piensas perderte la próxima revolución
              tecnológica?
            </Text>

            <Button variant="filled" color="#83013E" radius="xl" size="md">
              Conoce más
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <CarouselHero />
    </>
  );
}
