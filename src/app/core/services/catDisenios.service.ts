import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { ResponseRecientes } from '../interfaces/respuestaDiseniosRecientes.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CatDiseniosService {
    constructor(private http:HttpClient) { }
    private url:string = enviroment.API_URL


    getDiseniosRecientes():Observable<ResponseRecientes>{
        return this.http.get<ResponseRecientes>(this.url+'disenios/recientes')
    }

}