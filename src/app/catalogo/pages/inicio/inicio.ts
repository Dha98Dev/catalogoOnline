import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
public showDetails:boolean=false


onShowDetails(event:boolean){
this.showDetails=event
}
}
