import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Busqueda } from './pages/busqueda/busqueda';
import { ContactoPage } from './pages/contacto-page/contacto-page';
import { LayoutCatalogo } from './pages/layout-catalogo/layout-catalogo';

const routes: Routes = [
  {
    path: '',
    component: LayoutCatalogo,
    children: [
      { path: 'inicio', component: Inicio },
      { path: 'detalles/:codigo', component: DetalleProducto },
      { path: 'buscar', component: Busqueda },
      { path: 'contacto', component: ContactoPage },

      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
