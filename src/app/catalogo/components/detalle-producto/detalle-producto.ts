import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-producto',
  standalone: false,
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss',
})
export class DetalleProducto {
@Input()  visibleDetalle:boolean=false
@Output() onEmitclose:EventEmitter<any>=new EventEmitter
}
