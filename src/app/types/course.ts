import { Course, Media } from "@/payload-types";

export interface CursoResumen {
  id: string;
  nombre: string;
  descripcion: string;
  academia: string;
  nivel: string;
  requisitos?: string;
  duracionHoras: number;
  duracionMinutos?: number;
  link: string;
  categorias?: string[];
  imagen: {
    id: string;
    url: string;
    alt: string;
  } | null;
};

export interface Curso extends Omit< Course , 'imagen' >{
  imagen: Media;
}