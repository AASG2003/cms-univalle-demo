"use client"
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import { getMediaImages } from '@/app/my-route/api/get_media';
import { useEffect, useState } from 'react';


interface MediaItem {
  id: number;
  alt: string;
  url: string;
}

export default async function Carousel_hero() {
  const [images, setImages] = useState<MediaItem[]>([]);
  useEffect(() => {
    async function fetchImages() {
      const data = await getMediaImages() as MediaItem[];
      setImages(data);
    }
  
    fetchImages();
  }, []);

  return (
    <Carousel withIndicators height={400} slideSize="100%" emblaOptions={{ loop: true }}>
      {images.map((img) => (
        <Carousel.Slide key={img.id}>
          <div style={{ position: 'relative', height: 400 }}>
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
  );
}
