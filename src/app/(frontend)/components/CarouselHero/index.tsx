'use client';

import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useMediaQuery } from '@mantine/hooks';

export function CarouselHero() {
  const autoplay = useRef(Autoplay({ delay: 10000 }));

  // Detecta si la pantalla es muy pequeña (menos de 480px)
  const isSmallScreen = useMediaQuery('(max-width: 30em)'); // 30em ≈ 480px

  const images = [
    {
      url: 'https://www.univalle.edu/wp-content/uploads/2022/08/lapaz_des.jpg',
      alt: 'La Paz',
    },
    {
      url: '/foto_sedepaisaje01.jpg',
      alt: 'Cochabamba',
    },
    {
      url: '/santa_des.jpg',
      alt: 'Santa Cruz',
    },
  ];

  // Altura mínima dependiendo del dispositivo
  const minHeight = isSmallScreen ? 350 : 550;

  return (
    <Carousel
      withControls={false}
      plugins={[autoplay.current]}
      slideSize="100%"
      height="auto"
      style={{
        width: '100%',
        minHeight,
        position: 'relative',
      }}
      styles={{
        container: {
          height: '100%',
        },
      }}
    >
      {images.map((img) => (
        <Carousel.Slide key={img.url} style={{ width: '100%' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: `min(80vh, 720px)`,
              minHeight,
              overflow: 'hidden',
            }}
          >
            <Image
              src={img.url}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
