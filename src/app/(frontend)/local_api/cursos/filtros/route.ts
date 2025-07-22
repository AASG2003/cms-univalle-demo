import { NextRequest, NextResponse } from 'next/server';
import { BasePayload, getPayload } from 'payload';
import config from '@payload-config';

interface FiltroCursos {
  nombre?: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload: BasePayload = await getPayload({ config });
    const filtros: FiltroCursos = await req.json();

    const where: any = {};

    // Filtro por nombre (búsqueda parcial)
    if (filtros.nombre?.trim()) {
      where.nombre = { like: filtros.nombre };
    }

    const result = await payload.find({
      collection: 'courses',
      sort: '-createdAt',
      depth: 1,
      where,
    });

    const cursos = result.docs.map((curso: any) => ({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      academia: curso.academia?.nombre || null,
      nivel: curso.nivel,
      requisitos: curso.requisitos,
      duracionHoras: curso.duracionHoras,
      duracionMinutos: curso.duracionMinutos,
      link: curso.link,
      categorias: curso.categorias?.map((cat: any) => cat.nombre),
      imagen: curso.imagen
        ? {
            id: curso.imagen.id,
            url: curso.imagen.url,
            alt: curso.imagen.alt || '',
          }
        : null,
    }));

    return NextResponse.json(cursos);
  } catch (error) {
    console.error('Error al filtrar cursos:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error al filtrar cursos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
