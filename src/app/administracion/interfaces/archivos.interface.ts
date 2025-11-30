export interface ResponseGuardarArchivo {
  data: {
    ok: boolean;
    mensaje: string;
    id_archivo: number;
    url_path: string;
    categoria: string;
    categoria_dir: string;
    nombre_guardado: string;
    nombre_original: string;
  };
  statusErrorCode: number;
  error: boolean;
  message: string;
}
