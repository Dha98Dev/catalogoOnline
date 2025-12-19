import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/loggedIn.guard';

const routes: Routes = [
  {
    path: 'c',
    loadChildren: () => import('./catalogo/catalogo-module').then((m) => m.CatalogoModule),
  },
  {
    path: 'a',
    loadChildren: () =>
      import('./administracion/administracion-module').then((m) => m.AdministracionModule),
    canActivate:[authGuard]
  },
    {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'c', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
