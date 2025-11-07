import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing-module';
import { Inicio } from './pages/inicio/inicio';
import { LayoutCatalogo } from './pages/layout-catalogo/layout-catalogo';
import { Navbar } from './components/navbar/navbar';
import { PrimeNgModule } from '../core/PrimeNg.module';
import { DetalleProducto } from './components/detalle-producto/detalle-producto';
import { CardProducto } from './components/card-producto/card-producto';


@NgModule({
  declarations: [
    Inicio,
    LayoutCatalogo,
    Navbar,
    DetalleProducto,
    CardProducto
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    PrimeNgModule
  ]
})
export class CatalogoModule { }
