import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { LoginPage } from './pages/login-page/login-page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../core/PrimeNg.module';


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class AuthModule { }
