import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisenioReciente } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-item-carrusel',
  standalone: false,
  templateUrl: './item-carrusel.html',
  styleUrl: './item-carrusel.scss',
})
export class ItemCarrusel {
  // inputs
  @Input() urlDisenio: string = './assets/images/ejemplo-design2.png';
  public urlBack:string=enviroment.API_URL
  @Input() data: DisenioReciente={} as DisenioReciente;
  
  // outputs
  @Output() onEmitIdDisenioSelected:EventEmitter<any>=new EventEmitter

  block(e: Event) { e.preventDefault(); }
  blockMiddle(e: Event) { e.preventDefault(); }

  emitIdSelected(){
    this.onEmitIdDisenioSelected.emit(this.data)
  }

}
