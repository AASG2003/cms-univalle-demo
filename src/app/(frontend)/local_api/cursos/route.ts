import { NextRequest, NextResponse } from 'next/server';
import { BasePayload, getPayload } from 'payload';
import config from '@payload-config';

export async function GET(req: NextRequest) {
  const payload: BasePayload = await getPayload({ config });

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const result = await payload.find({
    collection: 'courses',
    sort: '-createdAt',
    limit,
    depth: 1,
  });

  const resumen = result.docs.map((item: any) => ({
    id: item.id,
    nombre: item.nombre,
    descripcion: item.descripcion,
    academia: item.academia,
    nivel: item.nivel,
    requisitos: item.requisitos,
    duracionHoras: item.duracionHoras,
    duracionMinutos: item.duracionMinutos,
    link: item.link,
    categorias: item.categorias?.map((cat: any) => cat.nombre),
    imagen: item.imagen
      ? {
          id: item.imagen.id,
          url: item.imagen.url,
          alt: item.imagen.alt || '',
        }
      : null,
  }));

  return NextResponse.json(resumen);
}
