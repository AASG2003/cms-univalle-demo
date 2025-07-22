import { NextRequest, NextResponse } from 'next/server';
import { getPayload, BasePayload } from 'payload';
import config from '@payload-config';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';

interface FiltroNoticias {
  tituloPrincipal?: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload: BasePayload = await getPayload({ config });
    const filtros: FiltroNoticias = await req.json();

    const where: any = {};

    // Filtro por título principal (like parcial)
    if (filtros.tituloPrincipal?.trim()) {
      where.tituloPrincipal = { like: filtros.tituloPrincipal };
    }

    const result = await payload.find({
      collection: 'noticias',
      sort: '-createdAt',
      depth: 2,
      where,
    });
    const noticias = result.docs.map((noticia: any) => {
        const data: SerializedEditorState = noticia.parrafo1;
        const parrafoPlano = convertLexicalToPlaintext({data});
        return{
        id: noticia.id,
        tituloPrincipal: noticia.tituloPrincipal,
        tituloSecundario1: noticia.tituloSecundario1,
        parrafo1: parrafoPlano,
        tituloSecundario2: noticia.tituloSecundario2,
        parrafo2: noticia.parrafo2,
        loDijo: noticia.loDijo,
        autoria: noticia.autoria,
        fecha: noticia.fecha,
        imagenDestacada: noticia.imagenDestacada
            ? {
                id: noticia.imagenDestacada.id,
                url: noticia.imagenDestacada.url,
                alt: noticia.imagenDestacada.alt || '',
            }
            : null,
        }
    }
    );

    return NextResponse.json(noticias);
  } catch (error) {
    console.error('Error al filtrar noticias:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error al filtrar noticias' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
