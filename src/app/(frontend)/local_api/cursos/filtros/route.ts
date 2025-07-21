import { NextRequest, NextResponse } from 'next/server';
import { BasePayload, getPayload } from 'payload';
import config from '@payload-config';

interface FiltroCursos {
  nombre?: string;
  academia?: string; // Se mantiene en la interfaz para uso futuro
  categoria?: string; // Se mantiene en la interfaz para uso futuro
}

export async function POST(req: NextRequest) {
  try {
    const payload: BasePayload = await getPayload({ config });

    // El cuerpo puede estar vacío en la carga inicial para obtener todos los cursos
    const filtros: FiltroCursos = await req.json();

    const where: any = {};

    // --- Filtro por Nombre ---
    // Este es el único filtro activo por ahora.
    // Busca cursos cuyo nombre contenga el texto proporcionado.
    if (filtros.nombre && filtros.nombre.trim() !== '') {
      where.nombre = { like: filtros.nombre };
    }

    /*
    // --- LÓGICA COMENTADA PARA USO FUTURO ---
    // El siguiente código se puede descomentar cuando se implementen
    // los filtros por academia y categoría en el frontend.

    if (filtros.academia) {
      where.academia = { equals: filtros.academia };
    }

    if (filtros.categoria) {
      // Esta consulta es para campos de relación "hasMany".
      // Busca cursos que tengan al menos una categoría que coincida.
      where.categorias = {
        some: {
          categoria: { equals: filtros.categoria },
        },
      };
    }
    */

    const result = await payload.find({
      collection: 'courses',
      sort: '-createdAt',
      depth: 1,
      where, // El objeto 'where' se aplica aquí
    });

    // El mapeo de la respuesta se mantiene igual, es una buena práctica.
    const resumen = result.docs.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      academia: item.academia?.nombre, // Asumiendo que academia es una relación
      nivel: item.nivel,
      requisitos: item.requisitos,
      duracionHoras: item.duracionHoras,
      duracionMinutos: item.duracionMinutos,
      link: item.link,
      categorias: item.categorias?.map((cat: any) => cat.nombre), // Asumiendo que categorias es una relación
      imagen: item.imagen
        ? {
            id: item.imagen.id,
            url: item.imagen.url,
            alt: item.imagen.alt || '',
          }
        : null,
    }));

    return NextResponse.json(resumen);
  } catch (error) {
    console.error('Error filtrando cursos:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error al filtrar cursos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}