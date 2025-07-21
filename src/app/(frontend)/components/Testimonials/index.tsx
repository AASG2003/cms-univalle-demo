"use client"

import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css';  
import { Stack, Text, Loader } from '@mantine/core'; // Importamos Loader para el estado de carga
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect } from 'react'; // Importamos hooks de React
import Image from 'next/image';

// Interfaz para tipar los datos que esperamos de la API
interface Testimonial {
  id: string;
  nombre: string;
  carrera: string;
  testimonio: string;
  imagenUrl: string;
  imagenAlt: string;
}


export function Testimonials(){

  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función asíncrona para obtener los datos desde nuestra API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/local_api/testimonials');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error al cargar los testimonios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    <Stack align='center' mt={50} pt={60} pb={60} style={{
      minHeight: 620,
      width:'100%',
      backgroundColor: '#83013E'
    }}>
      <Text ta="center" size='40' fw={600} inline c='white' mt={0} w={{ base: '80%', md: '30%' }}>
        Testimonios de estudiantes
      </Text>
      <Text ta="center" inline c='white' pt={30} w={{ base: '60%', md: '15%' }}>
        Conoce los testimonios de 
        nuestros estudiantes
      </Text>
      
      {loading ? (
        <Stack align="center" justify="center" style={{ flex: 1, height: '300px' }}>
          <Loader color="white" />
        </Stack>
      ) : (
        <Carousel
          slideSize="100%" 
          plugins={[autoplay.current]}
          mt={30}
          style={{
            height:'auto',
            width:'100%',
          }}
          withIndicators
        >
          {/* Mapeamos el array de testimonios para crear un Slide por cada uno */}
          {testimonials.map((testimonial) => (
            <Carousel.Slide key={testimonial.id}>
              <Stack align='center' p="md">
                <Image 
                  alt={testimonial.imagenAlt}
                  src={testimonial.imagenUrl} 
                  width={150} 
                  height={150}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <Text ta="center" size='18' fw={600} inline c='white' mt={20} w={{ base: '80%', md: '30%' }}>
                  {testimonial.nombre}
                </Text>
                <Text ta="center" size='12' inline c='white' w={{ base: '70%', md: '25%' }}>
                  {testimonial.carrera}
                </Text>
                <Text ta="center" inline c='white' w={{ base: '90%', md: '35%' }} mt={10}>
                  “{testimonial.testimonio}”
                </Text>
              </Stack>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Stack>
  )
}