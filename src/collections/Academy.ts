import type { CollectionConfig } from 'payload'

export const Academies: CollectionConfig = {
  slug: 'academies',
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'imagen',
      label: 'Imagen',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'descripción',
      type: 'textarea',
      required: true,
    }
  ]
}
