// src/app/api/noticias/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {BasePayload, getPayload} from 'payload';
import config from '@payload-config';

export async function GET(req: NextRequest) {
  const payload: BasePayload = await getPayload({config})

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const news = await payload.find({
    collection: 'noticias',
    sort: '-createdAt',
    limit,
  });

  return NextResponse.json(news.docs);
}
