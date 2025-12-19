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
import { Busqueda } from './pages/busqueda/busqueda';
import { ContactoPage } from './pages/contacto-page/contacto-page';
import { Nav } from './components/nav/nav';
import { WhatsappChat } from './components/whatsapp-chat/whatsapp-chat';
import { ScrollRevealDirective } from './diretives/scroll-reveal.directive';


@NgModule({
  declarations: [
    Inicio,
    LayoutCatalogo,
    Navbar,
    CardProducto,
    DetalleProducto,
    ItemCarrusel,
    MainCarrousel,
    Busqueda,
    ContactoPage,
    Nav,
    WhatsappChat
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    PrimeNgModule,
    FormsModule,
    ScrollRevealDirective
  ]
})
export class CatalogoModule { }
