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
type Garment = 'playera' | 'sueter';
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
    private cd: ChangeDetectorRef
  ) {}

  @Input() visibleDetalle: boolean = true;
  @Output() onEmitclose: EventEmitter<any> = new EventEmitter();
  @Output() onClose = new EventEmitter<void>();
  @Input() urlDisenio: string = './assets/images/ejemplo-design2.png';
  screenWidth: number = 0;
  public codigoSeleccionado: string = '';

  selectedColor: string = 'black'; // múltiples permitidos para mostrar variantes
  selectedPrenda: Garment = 'sueter';
  selectedOrientacion: string = 'frontal';

  public loader: boolean = false;
  firstFilter:boolean=true
  medidasByside: any[] = [];

  colorOptions: any[] = [];
  orientacionOptions: any[] = [];
  garmentOptions: any[] = [];
  medidas: any[] = [];
  medidasIntactas: any[] = [];

  // 1) opciones de color
  // colorOptions = [
  //   { label: 'Negro', value: 'black', meta: { hex: '#111827' } },
  //   { label: 'Blanco', value: 'white', meta: { hex: '#ffffff', ring: '#e5e7eb' } },
  //   // { label: 'Gris', value: 'gray', meta: { hex: '#6b7280' } },
  // ];

  // // 3) tipo de prenda
  // orientacionOptions = [
  //   { label: 'Frontal', value: 'frontal' },
  //   { label: 'Trasera', value: 'trasera' },
  // ];

  // garmentOptions = [
  //   { label: 'Playera', value: 'playera' as Garment },
  //   { label: 'Suéter', value: 'sueter' as Garment },
  // ];
  // medidas = [
  //   {
  //     id: 'bbab0f3c-6c79-4a68-bd3a-8eab6a87b18a',
  //     lado_seleccionado: 'frontal',
  //     medida: '10x10',
  //     tamano_text: 'chico',
  //     posicion_text: 'Pecho izquierdo',
  //     url_posicion: '10x10.png',
  //     tamanio_img: '17%',
  //     top: ['220px', '160px'],
  //     left: '',
  //     rigth: ['150px', '110px'],
  //   },
  //   {
  //     id: '5f4a7a6a-38c8-4cde-8c27-1747f2dbe401',
  //     lado_seleccionado: 'frontal',
  //     medida: '18x25',
  //     tamano_text: 'regular',
  //     posicion_text: 'Pecho centro',
  //     url_posicion: '18x25.jpg',
  //     tamanio_img: '25%',
  //     top: ['220px', '150px'],
  //     left: '',
  //     rigth: ['190px', '150px'],
  //   },
  //   {
  //     id: 'd4970e2d-39ad-4239-8216-2a95ff2b927f',
  //     lado_seleccionado: 'frontal',
  //     medida: '20x30',
  //     tamano_text: 'grande',
  //     posicion_text: 'Pecho completo / Centro frontal',
  //     url_posicion: '20x30.png',
  //     tamanio_img: '50%',
  //     top: ['250px', '170px'],
  //     left: '',
  //     rigth: ['125px', '100px'],
  //   },
  //   {
  //     id: '6c8edbfb-3d1c-4b3d-902c-92732d69b3f3',
  //     lado_seleccionado: 'trasera',
  //     medida: '25x32',
  //     tamano_text: 'grande',
  //     posicion_text: 'Espalda completa',
  //     url_posicion: '25x32.jpg',
  //     tamanio_img: '50%',
  //     top: ['220px', '160px'],
  //     left: '',
  //     rigth: ['125px', '100px'],
  //   },
  //   {
  //     id: '07c3b231-f216-4625-91ef-00f1a4f268b4',
  //     lado_seleccionado: 'trasera',
  //     medida: '20x28',
  //     tamano_text: 'regular',
  //     posicion_text: 'Espalda media',
  //     url_posicion: '20x28.jpg',
  //     tamanio_img: '25%',
  //     top: ['230px', '160px'],
  //     left: '',
  //     rigth: ['195px', '150px'],
  //   },
  //   {
  //     id: 'e42a76ac-54cb-4d3c-96a5-8b3da617f61c',
  //     lado_seleccionado: 'lateral',
  //     medida: '6x7',
  //     tamano_text: 'regular',
  //     posicion_text: 'Manga centro',
  //     url_posicion: '6x7.jpg',
  //   }
  // ];
  selectedPosition: any;

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
  }

  getDetallesDisenio() {
    this.diseniosService.getDetallesDisenio(this.codigoSeleccionado).subscribe({
      next: (resp) => {
        this.loader = false;
        this.colorOptions = resp.data.catalogos.colorOptions;
        this.orientacionOptions = resp.data.catalogos.orientacionOptions;
        this.garmentOptions = resp.data.catalogos.garmentOptions;
        this.medidas = resp.data.medidas;
        this.medidas.forEach(med =>{
          med.id=uuidv4()
        })
        console.log(this.medidas)
        this.selectedColor=this.colorOptions[0].value
        this.selectedOrientacion=this.orientacionOptions[0].value
        this.selectedPrenda=this.garmentOptions[0].value
 

        this.getMedidas();
        this.cd.detectChanges()
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
  const color  = this.selectedColor;  // 'black' | 'white' | 'gray'

  // 1) Filtrar por criterios seleccionados
  const filtradas = this.medidas.filter((m: any) => {
    const matchOrient =
      !orient || m.lado_seleccionado?.toLowerCase() === orient;

    const matchPrenda =
      !prenda || m.tipo_prenda === prenda;

    const matchColor =
      !color || m.color === color;

    return matchOrient && matchPrenda && matchColor;
  });

  console.log('filtradas:', filtradas);

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
    switch (`${this.selectedColor}-${this.selectedPrenda}-${this.selectedOrientacion.toLowerCase()}`) {
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
}
