export interface ResponseApi{
    statusErrorCode:number,
    message:string,
    error:boolean,
}
export interface catCategoria{
    label:string;
    id:number
}
export interface catTipoPrenda{
    label:string;
    value:number
}
export interface MedidaPosicion {
  id: number;
  lado_seleccionado: string;      // 'frontal' | 'trasera' | 'lateral' si lo quieres más estricto
  medida: string;                 // ejemplo: '10x10'
  tamano_text: string;            // 'chico', 'regular', 'grande'
  posicion_text: string;          // descripción
  url_posicion: string;           // archivo de imagen
  tamanio_img: string;            // '17%' etc.
  top: string[];                  // ej: ['160px','100px']
  left: string | null;            // puede ser '' o null
  rigth: string[];                // ej: ['150px','110px']
}

export interface ResponseCatCategorias extends ResponseApi{
    data:catCategoria[]
}
export interface ResponseCatGenerico extends ResponseApi{
    data:catTipoPrenda[]
}
export interface ResponseMedidaPasicion extends ResponseApi{
    data:MedidaPosicion[]
}
