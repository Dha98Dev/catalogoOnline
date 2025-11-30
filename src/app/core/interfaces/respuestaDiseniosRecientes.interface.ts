import { ResponseApi } from "./catalogo.interface";

export interface ResponseRecientes extends ResponseApi{
data:RecientesResponse
}
export interface RecientesResponse {
  recientes: RecienteCategoria[];
}

export interface RecienteCategoria {
  idCategoria: number;
  categoria: string;
  disenios: DisenioReciente[];
}

export interface DisenioReciente {
  idDisenio: number;
  nombreDisenio: string;
  codigoDisenio: string;
  path: string;
  coloresDisponibles: ColoresDisponibles;
}

export interface ColoresDisponibles {
  nombreColores: string[]; // array de nombres
  slugs_colores: string[]; // array de slugs
  hex_colores: string[];   // array de códigos hex
}

