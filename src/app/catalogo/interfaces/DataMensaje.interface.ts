import { Garment } from "../pages/detalle-producto/detalle-producto";

export interface DataMensaje {
  codigo_disenio: string;
  nombre_disenio: string;
  color: string;
  lado: string;
  tipo_prenda: Garment;
  medida: string;
  tipo_imagen: string;
  posicion_disenio_text:string,
  posicionSeleccionada:any,
  talla:string

  [key: string]: string;  
}
