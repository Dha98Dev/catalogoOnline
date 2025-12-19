import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing-module';
import { LayoutPageAdministracion } from './pages/layout-page-administracion/layout-page-administracion';
import { AgregarDisenio } from './pages/agregar-disenio/agregar-disenio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../core/PrimeNg.module';
import { ListadoDisenios } from './pages/listado-disenios/listado-disenios';
import { DhataTableComponent } from './components/dhata-table/dhata-table.component';
import { DetalleDisenioAdmin } from './pages/detalle-disenio-admin/detalle-disenio-admin';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor/Auth.interceptor';


@NgModule({
  declarations: [
    LayoutPageAdministracion,
    AgregarDisenio,
    ListadoDisenios,
    DhataTableComponent,
    DetalleDisenioAdmin
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  providers:[
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
         provideHttpClient(
      withInterceptorsFromDi()
    ),
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AdministracionModule { }
