import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageAdministracion } from './pages/layout-page-administracion/layout-page-administracion';
import { AgregarDisenio } from './pages/agregar-disenio/agregar-disenio';

const routes: Routes = [
  {path:'', component: LayoutPageAdministracion},
  {path:'add_design', component:AgregarDisenio},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
