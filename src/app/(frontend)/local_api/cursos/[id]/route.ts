import { NextRequest, NextResponse } from 'next/server'
import { BasePayload, getPayload } from 'payload'
import config from '@payload-config'
import { Course } from '@/payload-types'

export async function GET(req: NextRequest, context: any) {
  const payload: BasePayload = await getPayload({ config })

  try {
    const curso: Course = await payload.findByID({
      collection: 'courses',
      id: context.params.id,
      depth: 1,
    })

    return NextResponse.json(curso)
  } catch (error) {
    return NextResponse.json(
      { error: 'Noticia no encontrada' },
      { status: 404 }
    )
  }
}
