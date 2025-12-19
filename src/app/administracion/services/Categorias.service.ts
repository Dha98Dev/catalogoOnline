import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  constructor(private http: HttpClient) {}
  private url: string = enviroment.API_URL;

  addCategoria(categoria:any){
    return this.http.post<any>(this.url+'catalogos/categorias', JSON.stringify(categoria))
  }
  getCategorias(){
    return this.http.get<any>(this.url+'catalogos/categorias')
  }

}
