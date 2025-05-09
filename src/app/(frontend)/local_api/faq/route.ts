import { NextRequest, NextResponse } from 'next/server';
import {BasePayload, getPayload} from 'payload';
import config from '@payload-config';
import { FaqResumen } from '@/app/types/faq';


export async function GET(req: NextRequest) {

  const payload: BasePayload = await getPayload({config})

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const faqs = await payload.find({
    collection: 'faq',
    sort: '-createdAt',
    limit,
    depth:1,
  });

  const resumen: FaqResumen[] = faqs.docs.map((item: any) => {
    return {
      id: item.id,
      titulo: item.titulo,
      respuesta: item.respuesta,
      categoria: item.categoria,
      pdf: {
        id: item.archivo?.id,
        url: item.archivo?.url,
        alt: item.archivo?.alt || '',
      },
    };
  });

  return NextResponse.json(resumen);
}
