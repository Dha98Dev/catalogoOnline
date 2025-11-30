import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing-module';
import { LayoutPageAdministracion } from './pages/layout-page-administracion/layout-page-administracion';
import { AgregarDisenio } from './pages/agregar-disenio/agregar-disenio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../core/PrimeNg.module';


@NgModule({
  declarations: [
    LayoutPageAdministracion,
    AgregarDisenio,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class AdministracionModule { }
