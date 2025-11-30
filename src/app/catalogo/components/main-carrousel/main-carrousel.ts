  import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    ContentChild,
    TemplateRef,
  } from '@angular/core';
import { RecienteCategoria } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';

  @Component({
    selector: 'app-main-carrousel',
    standalone: false,
    templateUrl: './main-carrousel.html',
    styleUrl: './main-carrousel.scss',
  })
  export class MainCarrousel {
@Input() items: RecienteCategoria = {} as RecienteCategoria;
@ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  @ViewChild('viewport', { static: true })
  viewportRef!: ElementRef<HTMLDivElement>;

  // scroll en “páginas” (una pantalla)
  scrollLeft() {
    const vp = this.viewportRef.nativeElement;
    vp.scrollBy({ left: -vp.clientWidth, behavior: 'smooth' });
  }

  scrollRight() {
    const vp = this.viewportRef.nativeElement;
    vp.scrollBy({ left: vp.clientWidth, behavior: 'smooth' });
  }
  }
