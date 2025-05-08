import { NextRequest, NextResponse } from 'next/server';
import { BasePayload, getPayload } from 'payload';
import config from '@payload-config';
import { Noticia } from '@/payload-types';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload: BasePayload = await getPayload({config})

  try {
    const noticia: Noticia = await payload.findByID({
      collection: 'noticias',
      id: params.id,
      depth: 1,
    });

    return NextResponse.json(noticia);
  } catch (error) {
    return NextResponse.json(
      { error: 'Noticia no encontrada' },
      { status: 404 }
    );
  }
}
