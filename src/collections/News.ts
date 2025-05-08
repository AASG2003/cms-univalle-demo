import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'noticias',
  admin: {
    useAsTitle: 'tituloPrincipal',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imagenDestacada',
      label: 'Imagen destacada',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'fecha',
      label: 'Fecha de publicación',
      type: 'date',
      required: true,
    },
    {
      name: 'tituloPrincipal',
      type: 'text',
      required: true,
    },
    {
      name: 'tituloSecundario1',
      type: 'text',
      required: true,
    },
    {
      name: 'parrafo1',
      label: 'Primer párrafo',
      type: 'richText',
      required: true,
    },
    {
      name: 'carruselImagenes',
      label: 'Carrusel de imágenes',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'descripcion',
          type: 'text',
        },
      ],
    },
    {
      name: 'tituloSecundario2',
      type: 'text',
      required: true,
    },
    {
      name: 'parrafo2',
      label: 'Segundo párrafo',
      type: 'richText',
      required: true,
    },
    {
      name: 'loDijo',
      label: 'Frase destacada / lo dijo',
      type: 'text',
      required: false,
    },
    {
      name: 'autoria',
      label: 'Autoría',
      type: 'text',
      required: false,
    },
  ],
};
