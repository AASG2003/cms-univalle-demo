import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
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
      name: 'academia',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'nivel',
      type: 'text',
      required: true,
    },
    {
      name: 'requisitos',
      type: 'text',
      required: false,
    },
    {
      name: 'duracionHoras',
      type: 'number',
      required: true,
    },
    {
      name: 'duracionMinutos',
      type: 'number',
      required: false,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'categorias',
      type: 'array',
      fields: [
        {
          name: 'nombre',
          type: 'text',
        },
      ],
    },
  ],
}
