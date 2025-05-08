"use client"

import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css';  
import { Stack, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Image from 'next/image';

export function Testimonials(){

  const autoplay = useRef(Autoplay({ delay: 10000 }));
  
  return (
    <Stack align='center' mt={50} pt={60} style={{
      height:620,
      width:'100%',
      backgroundColor: '#83013E'
    }}>
      <Text ta="center" size='40' fw={600} inline c='white' mt={0} w={"30%"}>
        Testimonios de estudiantes
      </Text>
      <Text ta="center" inline c='white' pt={30} w={"15%"}>
        Conoce los testimonios de 
        nuestros estudiantes
      </Text>
      <Carousel
        slideSize="100%" 
        plugins={[autoplay.current]}
        mt={30}
        style={{
          height:'auto',
          width:'100%',
        }}
      >
        <Carousel.Slide>
          <Stack align='center'>
            <Image alt="Testimonio" src="/Ellipse 5.png" width={150} height={150}/>
            <Text ta="center" size='18' fw={600} inline c='white' mt={0} w={"30%"}>
              Fabio Romero
            </Text>
            <Text ta="center" size='12' inline c='white' w={"15%"}>
              Estudiante de Ingenieria de sistemas informaticos
            </Text>
            <Text ta="center" inline c='white' w={"35%"}>
              “Academias TI me ha dado nuevos conocimientos y herramientas para mi vida profesional”
            </Text>
          </Stack>
        </Carousel.Slide>
      </Carousel>
    </Stack>
  )
}