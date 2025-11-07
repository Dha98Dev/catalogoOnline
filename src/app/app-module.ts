import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { PrimeNgModule } from './core/PrimeNg.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule
  ],
   providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
         provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
     providePrimeNG({
      theme: {
        preset: Aura,
         options: {
       darkModeSelector: false || 'none'
    }
      }
    }),
  ],
  bootstrap: [App]
})
export class AppModule { }
