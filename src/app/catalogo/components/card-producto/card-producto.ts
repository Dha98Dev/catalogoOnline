import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  standalone: false,
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.scss',
})
export class CardProducto {
@Output() OnEmitShowDetails:EventEmitter<boolean>=new EventEmitter

showDetails(){
  this.OnEmitShowDetails.emit(true)
}
}
