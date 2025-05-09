'use client';

import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useRef} from 'react';
import Autoplay from 'embla-carousel-autoplay';

export function CarouselHero() {
  const autoplay = useRef(Autoplay({ delay: 10000 }));
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

  return (
    <>
      <Carousel 
        withControls={false} 
        height={620} 
        slideSize="100%" 
        plugins={[autoplay.current]}
        style={{
          width:'100%',
        }}
      >
        {images.map((img) => (
          <Carousel.Slide key={img.url} style={{
            width:'100%',
          }}>
            <div style={{ position: 'relative', height: 720 }}>
              <Image
                src={img.url}
                alt={img.alt}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
