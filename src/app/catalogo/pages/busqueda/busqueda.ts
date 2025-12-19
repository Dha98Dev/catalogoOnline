import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseniosService } from '../../../administracion/services/disenios.service';
import { DisenioMedidaItem } from '../../../core/interfaces/disenios.interface';
import { DisenioReciente } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';
import { CategoriasService } from '../../../administracion/services/Categorias.service';
import { catCategoria } from '../../../core/interfaces/catalogo.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-busqueda',
  standalone: false,
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.scss',
})
export class Busqueda {
  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private diseniosService: DiseniosService,
    private cd: ChangeDetectorRef,
    private categoriasService: CategoriasService,    
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}
  public categoria: string = '';
  public keyword: string = '';
  public isCategoria: boolean = false;
  public resultadosBusqueda: DisenioReciente[] = [];
  public categorias: catCategoria[] = [];
  isEmpty: boolean = false;
  loader: boolean = false;
  public idDisenioSeleccionado:string=''

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((param) => {
      const categoria = param['categoria'];
      const keyWord = param['keyWord'];
      if (categoria) {
        this.categoria = categoria;
        this.isCategoria = true;
        this.realizarBusquedaByCategoria(categoria);
      } else if (keyWord) {
        this.keyword=keyWord
        this.realizarBusquedaByKeyWord(this.keyword);
      } else {
        this.realizarBusquedaMasRecientes();
      }
    });
    this.getCategorias();
  }

  getCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (resp) => {
        this.categorias = resp.data;
        console.log(this.categorias);
      },
      error: (err) => {},
    });
  }

  realizarBusquedaByCategoria(categoria: string) {
    this.loader = true;
    this.diseniosService.getDiseniosByCategoria(categoria).subscribe({
      next: (resp) => {
        this.resultadosBusqueda = resp.data.disenios;
        this.isEmpty = this.resultadosBusqueda.length == 0 ? true : false;
        this.loader = false;

        this.cd.detectChanges();
        console.log(this.resultadosBusqueda);
      },
      error: (err) => {
        this.loader = false;
        this.isEmpty=true
        this.cd.detectChanges()
      },
    });
  }

  realizarBusquedaByKeyWord(keyword:string) {
     this.loader = true;
    this.diseniosService.getDiseniosByKeyword(keyword).subscribe({
      next: (resp) => {
        this.resultadosBusqueda = resp.data.disenios;
        this.isEmpty = this.resultadosBusqueda.length == 0 ? true : false;
        this.loader = false;

        this.cd.detectChanges();
        console.log(this.resultadosBusqueda);
      },
      error: (err) => {
        this.loader = false;
        this.isEmpty=true
        this.cd.detectChanges()
      },
    });
  }

  realizarBusquedaMasRecientes() {}

  newSearchByCategory(categoria: string) {
    this.route.navigate(['/c/buscar'], {
      queryParams: {
        relativeTo: this.activateRoute,
        categoria,
      },
    });
  }
   confirmShowDetails(event: Event, disenio: DisenioReciente) {
    this.idDisenioSeleccionado = disenio.codigoDisenio;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Te gustaria personalizar aun mas el diseño de ' + disenio.nombreDisenio + ' ?',
      header: 'Confirmacion',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-lightbulb',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Si',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Personalizando',
          detail: '¡Es momento de crear tu nueva playera favorita!”',
        });
        setTimeout(() => {
          this.route.navigate(['/c/detalles', btoa(this.idDisenioSeleccionado.toString())])
        }, 1500);
      },
      reject: () => {
        this.messageService.add({
          severity: 'secondary',
          summary: 'Cancelado',
          detail: 'Personalizacion de diseño cancelada correctamente',
          life: 3000,
        });
        this.idDisenioSeleccionado=''
      },
    });
  }

  selectedDisenio(event:any){
    console.log(event)
  }
}
