import { ChangeDetectorRef, Component } from '@angular/core';
import { DiseniosService } from '../../services/disenios.service';
import { DinamicTableData, TableColumn } from '../../components/dhata-table/dhata-table.component';
import { enviroment } from '../../../enviroments/enviroment';
import { DisenioReciente } from '../../../core/interfaces/respuestaDiseniosRecientes.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
@Component({
  selector: 'app-listado-disenios',
  standalone: false,
  templateUrl: './listado-disenios.html',
  styleUrl: './listado-disenios.scss',
})
export class ListadoDisenios {
  constructor(
    private diseniosService: DiseniosService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router
  ) {}

  public dataTable: DinamicTableData = {} as DinamicTableData;
  public listaDisenios: any[] = [];
  private urlBack: string = enviroment.API_URL;
  public pagination: Pagination = {} as Pagination;
  public disenioSelected: DisenioReciente = {} as DisenioReciente;
  pages: number[] = [];
  perPage: number = 10;
  perPageOptions: number[] = [10, 20, 50, 100];
  currentPage: number = 1;
  visibleMenuActions: boolean = false;

  ngOnInit() {
    this.getListadoDisenios(1);
  }

  getListadoDisenios(page: number) {
    this.diseniosService.getListadoDisenios(page, this.perPage).subscribe({
      next: (resp) => {
        this.pagination = resp.data.data.pagination;

        this.listaDisenios = resp.data.data.disenios;
        const columns: TableColumn[] = [
          { key: 'path', label: 'Disenio', filterable: false, isImage: true },
          { key: 'nombreDisenio', label: 'Nombre diseño', filterable: false },
          { key: 'codigoDisenio', label: 'Codigo diseño', filterable: false },
          { key: 'categoria', label: 'Categoria', filterable: false },
          { key: 'coloresDes', label: 'Colores', filterable: false },
          { key: 'estado', label: 'Estado', filterable: false },
        ];
        this.listaDisenios.forEach((id) => {
          id.coloresDes = id.coloresDisponibles.nombreColores.join(', ');
          id.path = this.urlBack + id.path.replace('/', '');
          id.estado = id.activo == 1 ? 'Activo' : 'Inactivo';
        });
        console.log(this.listaDisenios[0]);
        this.dataTable = {
          data: this.listaDisenios,
          columns: columns,
          globalSearchKeys: ['nombreDisenio', 'codigoDisenio', 'categoria', 'estado'],
        };
        this.cd.detectChanges();
      },
      error: (err) => {},
    });
  }

  setPagination(data: Pagination) {
    this.pagination = data;
    this.pages = Array.from({ length: this.pagination.total_pages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.pagination.total_pages) return;

    // aquí haces la nueva llamada a la API con la página
    this.getListadoDisenios(page); // por ejemplo
    this.cd.detectChanges();
  }

  onDisenioSelected(event: any) {
    this.visibleMenuActions = true;
    this.disenioSelected = event;
  }

  desactivarDisenio(accion: string) {
    console.log(accion, this.disenioSelected.idDisenio);
    this.diseniosService.updateInactivarDisenio(accion, this.disenioSelected.idDisenio).subscribe({
      next: (resp) => {
        console.log(resp);
        this.getListadoDisenios(this.currentPage);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetails() {
    const encoded = btoa(this.disenioSelected.codigoDisenio.toString());

    this.route.navigate(['/a/details'], {
      queryParams: { design: encoded },
    });
  }

  // onSelectedDesign(event:any, itemDesign:DisenioReciente){
  //   this.confirmationService.confirm({
  //       target: event.target as EventTarget,
  //       message: 'Te gustaria personalizar aun mas el diseño de ' + itemDesign.nombreDisenio + ' ?',
  //       header: 'Confirmacion',
  //       closable: true,
  //       closeOnEscape: true,
  //       icon: 'pi pi-lightbulb',
  //       rejectButtonProps: {
  //         label: 'No',
  //         severity: 'secondary',
  //         outlined: true,
  //       },
  //       acceptButtonProps: {
  //         label: 'Si',
  //       },
  //       accept: () => {
  //         this.messageService.add({
  //           severity: 'info',
  //           summary: 'Personalizando',
  //           detail: '¡Es momento de crear tu nueva playera favorita!”',
  //         });
  //         setTimeout(() => {
  //           this.route.navigate(['/a/design', btoa(itemDesign.idDisenio.toString())])
  //         }, 1500);
  //       },
  //       reject: () => {
  //         this.messageService.add({
  //           severity: 'secondary',
  //           summary: 'Cancelado',
  //           detail: 'Personalizacion de diseño cancelada correctamente',
  //           life: 3000,
  //         });
  //       },
  //     });
  // }
}
