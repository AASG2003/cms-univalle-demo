import {BasePayload, getPayload} from 'payload';
import config from '@payload-config'

export async function get() {
  const payload: BasePayload = await getPayload({config})
    const news = await payload.find({
      collection: 'noticias',
      sort: '-createdAt',
      limit: 10,
    });
    return news.docs
}
