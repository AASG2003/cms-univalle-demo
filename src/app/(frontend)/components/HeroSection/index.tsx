'use client';

import '@mantine/carousel/styles.css'; 
import Image from 'next/image';
import { Button, Flex, Grid, Text } from '@mantine/core';
import { CarouselHero } from '../CarouselHero';

export function HeroSection() {

  return (
    <>
      <Grid
        px="md"
        py="sm"
        justify="center"
        align="center"
        m="60"
        style={{
          top: 0,
          left: 0,
          right: 0,
          minHeight: '720',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'transparent',
          border: 'none',
          height: '720',
        }}
      >
        <Grid.Col span={6}>
          <Flex align="center" 
                direction="column" 
                justify="center" 
                style={{ 
                  height: '100%',
                  color:'white',
                }}
          >
            <Image alt='logo Univalle' src='/LOGO NUEVO COMPLETO Patch.png' width='100' height='100'/>
            <Text ta="center" size='65' fw={700} inline
            style={{
              paddingTop:5,
              lineHeight:1.1,
              paddingBottom:15,
            }}
            >
              Aqui creamos un brillante mañana hoy
            </Text>
            <Text ta="center"
            style={{
              paddingBottom:15
            }}
            >
            Proporcionamos conocimiento y herramientas para las 
            futuras generaciones, ¿piensas perderte la proxima 
            revolución tecnológica?
            </Text>
            <Button variant="filled" color="#83013E" radius="xl">Conoce mas</Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <CarouselHero/>
    </>
  );
}
