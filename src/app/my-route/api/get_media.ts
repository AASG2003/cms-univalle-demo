import {BasePayload, getPayload} from 'payload';
import config from '@payload-config'

export async function getMediaImages() {
  const payload: BasePayload = await getPayload({config})
    const media = await payload.find({
      collection: 'media',
      sort: '-createdAt',
      limit: 10,
    });
    return media.docs
}
