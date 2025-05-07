import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

let initialized = false;

export async function GET() {
  if (!initialized) {
    await getPayload({ config });
    initialized = true;
  }

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'media',
    sort: '-createdAt',
    limit: 10,
  });

  return NextResponse.json(result.docs);
}
