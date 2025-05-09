import type { CollectionConfig } from 'payload';

export const Faq: CollectionConfig = {
  slug: 'faq',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Pregunta',
      type: 'text',
      required: true,
    },
    {
      name: 'respuesta',
      label: 'Respuesta',
      type: 'textarea',
      required: true,
    },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'text',
      required: true,
    },
    {
      name: 'archivo',
      label: 'Archivo PDF',
      type: 'upload',
      relationTo: 'media',
      required: false,
      filterOptions: {
        mimeType: { equals: 'application/pdf' }, // Solo archivos PDF
      },
    },
  ],
};
