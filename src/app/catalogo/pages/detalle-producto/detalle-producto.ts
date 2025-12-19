import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseniosService } from '../../../administracion/services/disenios.service';
import { v4 as uuidv4 } from 'uuid';
import { DisenioImagenUnica, DisenioMedidaItem } from '../../../core/interfaces/disenios.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataMensaje } from '../../interfaces/DataMensaje.interface';
import { WhatsappChat } from '../../components/whatsapp-chat/whatsapp-chat';
export type Garment = 'playera' | 'sueter';
@Component({
  selector: 'app-detalle-producto',
  standalone: false,
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss',
})
export class DetalleProducto {
  constructor(
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private diseniosService: DiseniosService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService:MessageService
  ) {}

  @Input() visibleDetalle: boolean = true;
  @Output() onEmitclose: EventEmitter<any> = new EventEmitter();
  @Output() onClose = new EventEmitter<void>();
  public urlDisenio: string = '';
  public base: string = 'http://localhost/catalogoDisenios/api';

  public listaImagenesDisenio: DisenioImagenUnica[] = [];

  screenWidth: number = 0;
  public codigoSeleccionado: string = '';

  selectedColor: string = ''; // múltiples permitidos para mostrar variantes
  selectedPrenda: Garment = '' as Garment;
  selectedOrientacion: string = '';
  selectedTalla: string = '';

  public loader: boolean = false;
  firstFilter: boolean = true;
  medidasByside: any[] = [];

  colorOptions: any[] = [];
  orientacionOptions: any[] = [];
  garmentOptions: any[] = [];
  colorOptionsFiltered: any[] = [];
  orientacionOptionsFiltered: any[] = [];
  garmentOptionsFiltered: any[] = [];
  medidas: DisenioMedidaItem[] = [];
  medidasIntactas: any[] = [];
  public mensajeGenerado:string=''

  public dataMensaje: DataMensaje[] = [];
  public tipoImagen: string = '';
  selectedPosition: any;
  tallas = [
    { label: 'Chica', value: 'S' },
    { label: 'Mediana', value: 'M' },
    { label: 'Grande', value: 'L' },
    { label: 'Extra Grande', value: 'XL' },
    { label: 'Doble Extra Grande', value: 'XXL' },
  ];

  ngOnInit() {
    this.loader = true;
    this.activateRoute.paramMap.subscribe((param) => {
      let codigo = param.get('codigo') ?? '';
      if (codigo == '') {
        this.route.navigate(['/c']);
      }
      this.codigoSeleccionado = atob(decodeURIComponent(codigo));
      this.getDetallesDisenio();
    });

    this.onResize();
    // this.notificacionMensaje()
  }

  getDetallesDisenio() {
    this.diseniosService.getDetallesDisenio(this.codigoSeleccionado).subscribe({
      next: (resp) => {
        this.loader = false;
        this.colorOptions = resp.data.catalogos.colorOptions;
        console.log(this.colorOptions);

        this.orientacionOptions = resp.data.catalogos.orientacionOptions;
        this.garmentOptions = resp.data.catalogos.garmentOptions;
        this.colorOptionsFiltered = resp.data.catalogos.colorOptions;
        this.orientacionOptionsFiltered = resp.data.catalogos.orientacionOptions;
        this.garmentOptionsFiltered = resp.data.catalogos.garmentOptions;

        this.medidas = resp.data.medidas;
        this.medidas.forEach((med) => {
          med.id = uuidv4();
        });
        this.listaImagenesDisenio = this.obtenerDiseniosUnicos(this.medidas);
        this.urlDisenio = this.listaImagenesDisenio[0].path;
        this.tipoImagen = this.listaImagenesDisenio[0].tipo_imagen;
        this.generateDataMessage();
        // this.selectedColor = this.colorOptions[0].value;
        // this.selectedOrientacion = this.orientacionOptions[0].value;
        // this.selectedPrenda = this.garmentOptions[0].value;

        this.getMedidas();
        this.cd.detectChanges();
        this.selectedPosition = this.medidasByside[1];
      },
      error: (err) => {},
    });
  }

  block(ev: Event) {
    ev.preventDefault();
  }
  blockMiddle(ev: MouseEvent) {
    // evita clic medio que abre en nueva pestaña
    if (ev.button === 1) ev.preventDefault();
  }

  // getMedidas(color:string, tipo_prenda:string, posicion:string){
  //   this.medidas
  // }

  getMedidas() {
    if (!this.medidas || this.medidas.length === 0) {
      this.medidasByside = [];
      this.selectedPosition = null;
      return;
    }

    const orient = this.selectedOrientacion?.toLowerCase();
    const prenda = this.selectedPrenda; // 'playera' | 'sueter'
    const color = this.selectedColor; // 'black' | 'white' | 'gray'
    const url_path = this.urlDisenio;
    // 1) Filtrar por criterios seleccionados
    const filtradas = this.medidas.filter((m: any) => {
      const matchOrient = !orient || m.lado_seleccionado?.toLowerCase() === orient;

      const matchPrenda = !prenda || m.tipo_prenda === prenda;

      const matchColor = !color || m.color === color;

      const matchUrl = !url_path || m.path === url_path;

      return matchOrient && matchPrenda && matchColor && matchUrl;
    });

    // 2) Ordenar por medida (ancho x alto)
    const ordenadas = [...filtradas].sort((a, b) => {
      const [aw, ah] = a.medida.split('x').map(Number);
      const [bw, bh] = b.medida.split('x').map(Number);

      if (aw === bw) return ah - bh;
      return aw - bw;
    });

    this.medidasByside = ordenadas;

    // 3) Tomar la primera como seleccionada (si existe)
    this.selectedPosition = this.medidasByside[0] ?? null;
  }

  getColorPlayera() {
    switch (
      `${this.selectedColor}-${this.selectedPrenda}-${this.selectedOrientacion.toLowerCase()}`
    ) {
      case 'black-playera-frontal':
        return './assets/images/p-black.jpeg';
      case 'black-sueter-frontal':
        return './assets/images/s-black.jpeg';
      case 'white-playera-frontal':
        return './assets/images/p-white.jpeg';
      case 'white-sueter-frontal':
        return './assets/images/s-white.jpeg';
      // case 'gray-playera-frontal':
      //   return './assets/images/p-gray.jpeg';
      // case 'gray-sueter-frontal':
      //   return './assets/images/s-gray.jpeg';

      // imagenes traseras
      case 'black-playera-trasera':
        return './assets/images/p-t-black.jpeg';
      case 'black-sueter-trasera':
        return './assets/images/s-t-black.jpeg';
      case 'white-playera-trasera':
        return './assets/images/p-t-white.jpeg';
      case 'white-sueter-trasera':
        return './assets/images/s-t-white.jpeg';
      // case 'gray-playera-trasera':
      //   return './assets/images/p-t-gray.jpeg';
      // case 'gray-sueter-trasera':
      //   return './assets/images/s-t-gray.jpeg';

      default:
        return './assets/images/p-black.jpeg';
    }
  }
  // getStylesFromPositionOfDesign() {}
  // getSizeImageByDesignSize() {}

  getTopAnLeft(top: boolean) {
    if (top) {
      return top && this.screenWidth > 570
        ? this.selectedPosition.top[0]
        : this.selectedPosition.top[1];
    } else {
      return !top && this.screenWidth > 570
        ? this.selectedPosition.rigth[0]
        : this.selectedPosition.rigth[1];
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    this.screenWidth = window.innerWidth;
  }
  obtenerDiseniosUnicos(items: DisenioMedidaItem[]): DisenioImagenUnica[] {
    const mapa = new Map<string, DisenioImagenUnica>();

    for (const item of items) {
      // Clave para evitar duplicados por código + tipo de imagen
      const key = `${item.codigo_disenio}-${item.tipo_imagen}`;

      if (!mapa.has(key)) {
        mapa.set(key, {
          nombre_disenio: item.nombre_disenio,
          path: item.path,
          codigo_disenio: item.codigo_disenio,
          tipo_imagen: item.tipo_imagen as 'principal' | 'secundaria',
        });
      }
    }

    return Array.from(mapa.values());
  }

  generateDataMessage() {
    const medida = this.selectedPosition?.medida ?? '';
    const posicion_disenio_text = this.selectedPosition?.posicion_text;
    const color = this.selectedColor
      ? this.colorOptions.filter((c) => c.value == this.selectedColor)[0].value
      : '';

    const data: DataMensaje = {
      codigo_disenio: this.medidas[0].codigo_disenio,
      nombre_disenio: this.medidas[0].nombre_disenio,
      color,
      lado: this.selectedOrientacion,
      medida,
      tipo_imagen: this.tipoImagen,
      tipo_prenda: this.selectedPrenda,
      posicion_disenio_text,
      posicionSeleccionada: this.selectedPosition,
      talla:this.selectedTalla
    };

    // índice del array según el tipo de imagen
    const index = this.tipoImagen === 'principal' ? 0 : 1;
    this.dataMensaje[index] = data;

    // 🔹 si es la principal: dejamos todas las opciones
    // if (index === 0) {
    //   this.colorOptionsFiltered = this.colorOptions;
    //   this.garmentOptionsFiltered = this.garmentOptions;
    // } else {
    //   // 🔹 si es secundaria: SIEMPRE usamos color y prenda de la principal
    //   const principal = this.dataMensaje[0];
    //   const secondaria = this.dataMensaje[1];
    //   if (principal) {
    //     console.log(principal.color);
    //     this.selectedPosition=secondaria.posicionSeleccionada
    //     this.selectedColor = principal.color;
    //     this.selectedPrenda = principal.tipo_prenda;
    //     // this.selectedPosition=this.orientacionOptions.filter(o => o.tipo_imagen == secondaria.tipo_imagen && o.lado_seleccionado.toLowerCase() == secondaria.lado && o.tipo_prenda == secondaria.tipo_prenda && o.color == secondaria.color)
    //     console.log(this.selectedPosition);

    //     // IMPORTANTE: filtrar desde el arreglo ORIGINAL, no desde el filtrado
    //     this.colorOptionsFiltered = this.colorOptions.filter(c => c.value === principal.color);
    //     this.garmentOptionsFiltered = this.garmentOptions.filter(
    //       (g) => g.value === principal.tipo_prenda
    //     );

    //   }
    // }
  }
  filtrarOpciones() {
    const index = this.tipoImagen === 'principal' ? 0 : 1;
    if (index === 0) {
      this.colorOptionsFiltered = this.colorOptions;
      this.garmentOptionsFiltered = this.garmentOptions;
      this.selectedPosition = this.dataMensaje[0].posicionSeleccionada;
      this.getMedidas();
    } else {
      // 🔹 si es secundaria: SIEMPRE usamos color y prenda de la principal
      const principal = this.dataMensaje[0];
      const secondaria = this.dataMensaje[1];
      if (principal) {
        console.log(principal.color);
        this.getMedidas();
        if (secondaria && secondaria.posicionSeleccionada != undefined) {
        this.selectedPosition = secondaria.posicionSeleccionada;
        }
        this.selectedColor = principal.color;
        this.selectedPrenda = principal.tipo_prenda;
        // this.selectedPosition=this.orientacionOptions.filter(o => o.tipo_imagen == secondaria.tipo_imagen && o.lado_seleccionado.toLowerCase() == secondaria.lado && o.tipo_prenda == secondaria.tipo_prenda && o.color == secondaria.color)
        console.log(this.selectedPosition);

        // IMPORTANTE: filtrar desde el arreglo ORIGINAL, no desde el filtrado
        this.colorOptionsFiltered = this.colorOptions.filter((c) => c.value === principal.color);
        this.garmentOptionsFiltered = this.garmentOptions.filter(
          (g) => g.value === principal.tipo_prenda
        );
      }
    }
  }

  generateMessage() {

    if (!this.dataMensaje[0].talla || this.dataMensaje[0].talla == '' ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Información incompleta',
          detail: 'Por favor selecciona un color, un lado,  un tipo de prenda y una talla ',
        });
        return
    }

    // 1) Contar cuántas imágenes tiene el diseño (principal/secundaria)
    const imagenesPrincipal = this.listaImagenesDisenio.filter(
      (a) => a.tipo_imagen === 'principal'
    );
    const imagenesSecundaria = this.listaImagenesDisenio.filter(
      (a) => a.tipo_imagen === 'secundaria'
    );
    const numberOfImagesForDesign = imagenesPrincipal.length + imagenesSecundaria.length;

    // 2) Datos que ya armaste antes
    const img1 = this.dataMensaje[0];
    const img2 = this.dataMensaje[1];

    if (!img1) {
      return;
    }

    let firstMsg = '';
    let secondMsg = '';
    let color=this.colorOptions.filter(c=>c.value == img1.color)[0].label

    const posicionTexto = img1.posicion_disenio_text || '';

    if (numberOfImagesForDesign === 1 || !img2) {
      firstMsg = `Hola, qué tal. Me gustaría cotizar un(a) ${img1.tipo_prenda} con el diseño que tiene el código ${img1.codigo_disenio} con el nombre de "${img1.nombre_disenio}", en color ${color}, donde el diseño tenga una medida de ${img1.medida} posicionado en ${posicionTexto} en la parte ${img1.lado} de la prenda.`;
    } else {
      // Ejemplo cuando tienes 2 imágenes (principal + secundaria)
      const posicionTexto2 = img2.posicion_disenio_text || '';

      firstMsg = `Hola, qué tal. Me gustaría cotizar un(a) ${img1.tipo_prenda} con el diseño que tiene el código ${img1.codigo_disenio} con el nombre de "${img1.nombre_disenio}", en color ${color}.`;

      secondMsg = `La imagen principal con medida ${img1.medida} en ${posicionTexto} en la parte ${img1.lado}, y una imagen secundaria con medida ${img2.medida} en ${posicionTexto2} en la parte ${img2.lado} de la prenda.`;
    }

    this.mensajeGenerado= secondMsg.trim().length > 0 ? `${firstMsg}\n\n${secondMsg}` : firstMsg;
    this.cd.detectChanges()
    console.log(this.mensajeGenerado);

    
  }

  asignarValores() {
    const index = this.tipoImagen === 'principal' ? 0 : 1;
    const d = this.dataMensaje[index];

    if (!d) {
      return;
    }

    this.selectedColor = d.color;
    this.selectedPrenda = d.tipo_prenda;
    this.selectedOrientacion = d.lado;

    // si estás guardando la medida en el DataMensaje:
    if (d.medida) {
      const pos = this.medidasByside.find(
        (m) => m.medida === d.medida && m.lado_seleccionado === d.lado
      );
      if (pos) {
        this.selectedPosition = pos;
      }
    }

    // cuando cambias a secundaria, volvemos a forzar mismo color/prenda
    if (index === 1 && this.dataMensaje[0]) {
      const principal = this.dataMensaje[0];
      this.colorOptionsFiltered = this.colorOptions.filter((c) => c.value === principal.color);
      this.garmentOptionsFiltered = this.garmentOptions.filter(
        (g) => g.value === principal.tipo_prenda
      );
    } else if (index === 0) {
      // si vuelves a la principal, desbloqueas opciones
      this.colorOptionsFiltered = this.colorOptions;
      this.garmentOptionsFiltered = this.garmentOptions;
    }
  }

  notificacionMensaje() {
    this.confirmationService.confirm({
      message:
        'Estamos para ayudarte. Solicita cotizaciones o realiza pedidos desde el ícono de WhatsApp en la parte inferior derecha.',
      header: '¡Bienvenido de nuevo!',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-lightbulb',
      rejectVisible: false,

      // Solo mostramos el botón Aceptar
      acceptButtonProps: {
        label: '¡Vamos a ello!',
        severity: 'help',
      },

      // No declaramos reject => no aparece botón “Cancelar”
      accept: () => {},
    });
  }
}
