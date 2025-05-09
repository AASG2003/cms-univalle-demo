import { Media, Noticia } from "@/payload-types";
import { MediaItem } from "./common";

export interface FaqResumen {
  id: string;
  titulo: string;
  respuesta: string;
  categoria: string;
  pdf: MediaItem;
}