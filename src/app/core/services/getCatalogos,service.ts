import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { catCategoria, ResponseCatCategorias, ResponseCatGenerico, ResponseMedidaPasicion } from '../interfaces/catalogo.interface';

@Injectable({ providedIn: 'root' })
export class GetCatalogosService {
  constructor(private http: HttpClient) {}
  private url: string = enviroment.API_URL;

  getMedidas():Observable<ResponseMedidaPasicion> {
    return this.http.get<ResponseMedidaPasicion>(this.url + 'catalogos/medidas');
  }
  getColores():Observable<ResponseCatGenerico> {
    return this.http.get<ResponseCatGenerico>(this.url + 'catalogos/colores');
  }
  getTipoPrendas():Observable<ResponseCatGenerico> {
    return this.http.get<ResponseCatGenerico>(this.url + 'catalogos/garments');
  }
  getCategorias():Observable<ResponseCatCategorias> {
    return this.http.get<ResponseCatCategorias>(this.url + 'catalogos/categorias');
  }
}
