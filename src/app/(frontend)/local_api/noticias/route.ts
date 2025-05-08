import { NextRequest, NextResponse } from 'next/server';
import {BasePayload, getPayload} from 'payload';
import config from '@payload-config';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { NoticiaResumen } from '@/app/types/news';


export async function GET(req: NextRequest) {

  const payload: BasePayload = await getPayload({config})

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const news = await payload.find({
    collection: 'noticias',
    sort: '-createdAt',
    limit,
    depth:1,
  });

  const resumen: NoticiaResumen[] = news.docs.map((item: any) => {
    const data: SerializedEditorState = item.parrafo1;
    const parrafoPlano = convertLexicalToPlaintext({data});
  
    return {
      id: item.id,
      tituloPrincipal: item.tituloPrincipal,
      fecha: item.fecha,
      parrafo1: parrafoPlano,
      imagenDestacada: {
        id: item.imagenDestacada?.id,
        url: item.imagenDestacada?.url,
        alt: item.imagenDestacada?.alt || '',
      },
    };
  });

  return NextResponse.json(resumen);
}
