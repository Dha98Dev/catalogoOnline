import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';

const routes: Routes = [
  {path:'', component:Inicio},
  {path:'detalles/:codigo', component: DetalleProducto}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
