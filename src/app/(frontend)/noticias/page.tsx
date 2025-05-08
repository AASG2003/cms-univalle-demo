import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

export default async function NewsPage() {
  const payloadConfig = await config

  return (
    <div>
    </div>
  )
}
