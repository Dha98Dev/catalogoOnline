import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing-module';
import { Inicio } from './pages/inicio/inicio';
import { LayoutCatalogo } from './pages/layout-catalogo/layout-catalogo';
import { Navbar } from './components/navbar/navbar';
import { PrimeNgModule } from '../core/PrimeNg.module';
import { CardProducto } from './components/card-producto/card-producto';
import { FormsModule } from '@angular/forms';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { ItemCarrusel } from './components/item-carrusel/item-carrusel';
import { MainCarrousel } from './components/main-carrousel/main-carrousel';


@NgModule({
  declarations: [
    Inicio,
    LayoutCatalogo,
    Navbar,
    CardProducto,
    DetalleProducto,
    ItemCarrusel,
    MainCarrousel
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class CatalogoModule { }
