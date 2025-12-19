import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';

@Component({
  selector: 'app-layout-page-administracion',
  standalone: false,
  templateUrl: './layout-page-administracion.html',
  styleUrl: './layout-page-administracion.scss',
})
export class LayoutPageAdministracion {
public visible:boolean=false

constructor(private authService:AuthService){}

cerrarSesion(){
  this.authService.logout()
}
}
