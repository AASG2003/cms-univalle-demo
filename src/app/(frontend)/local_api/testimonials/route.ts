import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Testimonial as TestimonialType } from '@/payload-types';


export interface FormattedTestimonial {
  id: string;
  nombre: string;
  carrera: string;
  testimonio: string;
  imagenUrl: string;
  imagenAlt: string;
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const testimonialsData = await payload.find({
      collection: 'testimonials',
      sort: '-createdAt',
      depth: 1, 
    });

    const formattedTestimonials: FormattedTestimonial[] = testimonialsData.docs.map((doc: TestimonialType) => {

      const imageUrl = (typeof doc.imagen === 'object' && doc.imagen?.url) ? doc.imagen.url : '/placeholder.png';
      const imageAlt = (typeof doc.imagen === 'object' && doc.imagen?.alt) ? doc.imagen.alt : `Testimonio de ${doc.nombre}`;
      
      return {
        id: doc.id,
        nombre: doc.nombre,
        carrera: doc.carrera,
        testimonio: doc.testimonio,
        imagenUrl: imageUrl,
        imagenAlt: imageAlt,
      };
    });

    return NextResponse.json(formattedTestimonials);

  } catch (error) {
    console.error("Error al obtener testimonios:", error);
    return NextResponse.json({ error: 'No se pudieron obtener los testimonios' }, { status: 500 });
  }
}