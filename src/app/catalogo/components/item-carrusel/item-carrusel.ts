import { Component, Input } from '@angular/core';
import { DisenioReciente } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-item-carrusel',
  standalone: false,
  templateUrl: './item-carrusel.html',
  styleUrl: './item-carrusel.scss',
})
export class ItemCarrusel {
  @Input() urlDisenio: string = './assets/images/ejemplo-design2.png';
  public urlBack:string=enviroment.API_URL
  @Input() data: DisenioReciente={} as DisenioReciente;

  block(e: Event) { e.preventDefault(); }
  blockMiddle(e: Event) { e.preventDefault(); }
}
