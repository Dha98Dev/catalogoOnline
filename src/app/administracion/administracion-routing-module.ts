import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageAdministracion } from './pages/layout-page-administracion/layout-page-administracion';
import { AgregarDisenio } from './pages/agregar-disenio/agregar-disenio';
import { ListadoDisenios } from './pages/listado-disenios/listado-disenios';
import { DetalleDisenioAdmin } from './pages/detalle-disenio-admin/detalle-disenio-admin';

const routes: Routes = [
  {path:'', component: LayoutPageAdministracion,  children:[
    {path:'add_design', component:AgregarDisenio},
    {path:'listado_disenios', component:ListadoDisenios},
    {path:'details', component:DetalleDisenioAdmin},
    {path:'', redirectTo:'add_design', pathMatch:'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
