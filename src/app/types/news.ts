import { Media, Noticia } from "@/payload-types";
import { MediaItem } from "./common";

export interface NoticiaResumen {
  id: string;
  tituloPrincipal: string;
  fecha: string;
  imagenDestacada: MediaItem;
  parrafo1: string;
}
export interface NoticiaConImagen extends Omit<Noticia, 'imagenDestacada' | 'carruselImagenes'> {
  imagenDestacada: Media;
  carruselImagenes?: {
    imagen: Media; // ya populado
    descripcion?: string | null;
    id?: string | null;
  }[] | null;
}
