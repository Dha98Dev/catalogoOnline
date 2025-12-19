import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisenioDetalle, DisenioResponse } from '../../interfaces/disenios.interface';
import { enviroment } from '../../../enviroments/enviroment';
import { DiseniosService } from '../../services/disenios.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-disenio-admin',
  standalone: false,
  templateUrl: './detalle-disenio-admin.html',
  styleUrl: './detalle-disenio-admin.scss',
})
export class DetalleDisenioAdmin {
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private diseniosService: DiseniosService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}
  public codigoDisenio: string = '';
  disenios: DisenioDetalle[] = [];
  baseUrlFiles: string = enviroment.API_URL;
  loading = false;
  errorMessage = '';
  firtsPeticion: boolean = true;

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['design']) {
        const encodedId = params['design'];
        this.codigoDisenio = atob(encodedId) || '';
        if (this.codigoDisenio != '') {
          this.cargarDetalleDisenio();
        }
      }
    });
  }

  cargarDetalleDisenio(): void {
    console.log('codigo diseño '+this.codigoDisenio);
    if (this.codigoDisenio.trim() == '' && !this.firtsPeticion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se puede realizar una consulta con codigo de diseño vacio',
      });
      return;
    }

    this.diseniosService.getDetalleDisenio(this.codigoDisenio).subscribe({
      next: (resp: DisenioResponse) => {
        setTimeout(() => {
          this.disenios = resp.data || [];
          if (this.disenios.length == 0) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Codigo inexistente',
              detail: 'No se encontro ningun registro con el codigo ingresado',
            });
          } else {
            this.messageService.add({
              severity: 'secondary',
              summary: 'Resultado de busqueda',
              detail: 'Diseño encontrado satisfactoriamente ',
            });
          }
            this.firtsPeticion=false
          console.log(this.disenios);
        }, 200);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error de comunicación con el servidor.';
        console.error(err);
      },
    });
  }
}
