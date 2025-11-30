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
