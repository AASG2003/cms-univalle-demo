import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
      name: 'carrera',
      type: 'text',
      required: true,
    },
    {
      name: 'testimonio',
      type: 'textarea',
      required: true,
    },
  ],
}
