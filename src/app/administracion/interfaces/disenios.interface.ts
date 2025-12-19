export interface ResponseGuardarDisenio {
  data: {
    ok: boolean;
    mensaje: string;
    id_disenio: number;
    id_disenio_archivo: number;
    codigo_disenio: string;
  };
  statusErrorCode: number;
  error: boolean;
  message: string;
}


export interface DisenioResponse {
  data: DisenioDetalle[];
  statusErrorCode: number;
  error: boolean;
  message: string;
}

export interface DisenioDetalle {
  nombreDisenio: string;
  codigoDisenio: string;
  imagenes: DisenioImagen[];
}

export interface DisenioImagen {
  tipoImagen: string;                // "principal" | "secundaria"
  nombreFile: string;
  urlPath: string;
  tipoArchivo: string;               // "image/jpeg" etc.
  disponibilidadProducto: string[];  // ["Playera"]
  disponibilidadColores: string[];   // ["Blanco", "Negro"]
  hexColores: string[];              // ["#ffffff", "#111827"]
  palabrasClave: string[];           // ["rap", "logo", ...]
  medidas: DisenioMedida[];
}

export interface DisenioMedida {
  orientacion: string | null;       // "Frontal" | "Trasera" | null
  codigoMedida: string;             // "18x25"
  tamanoText: string;               // "regular" | "grande"
  posicionText: string;             // "Pecho centro", etc.
  urlPosicion: string;              // "18x25.jpg"
  tamanioImagen: string | null;     // "25%" | null
}
