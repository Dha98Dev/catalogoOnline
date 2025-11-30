import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { ResponseGuardarArchivo } from '../interfaces/archivos.interface';
import { Observable } from 'rxjs';
import { ResponseGuardarDisenio } from '../interfaces/disenios.interface';

@Injectable({ providedIn: 'root' })
export class DiseniosService {
  constructor(private http: HttpClient) {}
  private url: string = enviroment.API_URL;
  uploadDesign(archivo: File, categoria: string): Observable<ResponseGuardarArchivo> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('categoria', categoria); // ej. 'Anime'

    return this.http.post<ResponseGuardarArchivo>(this.url + 'disenios/uploadFile', formData);
  }
  guardarDisenioData(data: any): Observable<ResponseGuardarDisenio> {
    const formData = new FormData();

    formData.append('nombre_disenio', data.nombre_disenio);
    formData.append('codigo_disenio', data.codigo_disenio);
    formData.append('categorias', String(data.categorias));
    formData.append('id_file', String(data.id_file));

    // Arrays → los mandamos como JSON
    formData.append('colores', JSON.stringify(data.colores));
    formData.append('tipos_productos', JSON.stringify(data.tipos_productos)); // OJO: nombre correcto con "s"
    formData.append('medidas', JSON.stringify(data.medidas));

    formData.append('palabras_clave', data.palabras_clave);

    return this.http.post<ResponseGuardarDisenio>(this.url + 'disenios/crear', formData);
  }

  getDetallesDisenio(codigo:string) {
    return this.http.get<any>(this.url + 'disenios/detalles', { params: { codigo } })
      }
}
