import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'c', loadChildren: ()=> import('./catalogo/catalogo-module').then(m => m.CatalogoModule)},
  {path:'', redirectTo:'c', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
