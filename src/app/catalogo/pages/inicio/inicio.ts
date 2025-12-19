import { ChangeDetectorRef, Component } from '@angular/core';
import { CatDiseniosService } from '../../../core/services/catDisenios.service';
import {
  DisenioReciente,
  RecienteCategoria,
} from '../../../core/interfaces/respuestaDiseniosRecientes.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  constructor(
    private diseniosService: CatDiseniosService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router
  ) {}
  public showDetails: boolean = true;
  public listaDisenios: RecienteCategoria[] = [];

  private idDisenioSeleccionado: string = '';

  ngOnInit() {
    this.getListaDiseniosRecientes();
  }

  getListaDiseniosRecientes() {
    this.diseniosService.getDiseniosRecientes().subscribe({
      next: (resp) => {
        this.listaDisenios = resp.data.recientes;
        this.listaDisenios = resp.data.recientes.map((cat) => ({
          ...cat,
          show: false,
        }));
        this.cd.detectChanges();
        console.log(this.listaDisenios);
      },
      error: (err) => {},
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
          this.route.navigate(['/c/detalles', btoa(this.idDisenioSeleccionado.toString())]);
        }, 1500);
      },
      reject: () => {
        this.messageService.add({
          severity: 'secondary',
          summary: 'Cancelado',
          detail: 'Personalizacion de diseño cancelada correctamente',
          life: 3000,
        });
        this.idDisenioSeleccionado = '';
      },
    });
  }

  verDetalleDisenioSeleccionado(event: number) {}
}
