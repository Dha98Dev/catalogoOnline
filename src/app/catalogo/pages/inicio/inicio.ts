import { ChangeDetectorRef, Component } from '@angular/core';
import { CatDiseniosService } from '../../../core/services/catDisenios.service';
import { RecienteCategoria } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  constructor(private diseniosService:CatDiseniosService, private cd:ChangeDetectorRef){}
  public showDetails:boolean=true
  public listaDisenios:RecienteCategoria[] = [];
ngOnInit(){
  this.getListaDiseniosRecientes()
}


getListaDiseniosRecientes(){
  this.diseniosService.getDiseniosRecientes().subscribe({
    next: resp =>{
      this.listaDisenios=resp.data.recientes
      this.cd.detectChanges()
      console.log(this.listaDisenios)
    },
    error: err =>{

    }
  })
}


onShowDetails(event:boolean){
this.showDetails=event
}


}
