'use client';

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'; 
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { MediaItem } from '@/app/types/common';

export function CarouselHero() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const autoplay = useRef(Autoplay({ delay: 10000 }));

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('/api/media');
      const data = await res.json();
      setImages(data.docs);
    }

    fetchImages();
  }, []);

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
          <Carousel.Slide key={img.id} style={{
            width:'100%',
          }}>
            <div style={{ position: 'relative', height: 720 }}>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
