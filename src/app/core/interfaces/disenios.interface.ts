export interface DisenioMedidaItem {
  lado_seleccionado: string;
  medida: string;
  tamano_text: string;
  posicion_text: string;
  url_posicion: string;
  tamanio_img: string;
  top: string[];        // ["160px", "110px"]
  rigth: string[];      // ojo: viene escrito así en el backend
  tipo_prenda: string;
  color: string;
  path: string;
  tipo_imagen: string;  // "principal" | "secundaria"
  codigo_disenio: string;
  nombre_disenio: string;
  id: string;           // uuid
  categoria?:string,
  idCategoria?:string
}

export interface DisenioImagenUnica {
  nombre_disenio: string;
  path: string;
  codigo_disenio: string;
  tipo_imagen: 'principal' | 'secundaria';
}
