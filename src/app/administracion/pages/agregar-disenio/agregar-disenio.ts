import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetCatalogosService } from '../../../core/services/getCatalogos,service';
import { MessageService } from 'primeng/api';
import { CategoriasService } from '../../services/Categorias.service';
import { catCategoria, MedidaPosicion } from '../../../core/interfaces/catalogo.interface';
import { SafeUrl } from '@angular/platform-browser';
import { DiseniosService } from '../../services/disenios.service';

@Component({
  selector: 'app-agregar-disenio',
  standalone: false,
  templateUrl: './agregar-disenio.html',
  styleUrl: './agregar-disenio.scss',
})
export class AgregarDisenio {
  disenioForm!: FormGroup;

  // catalogos
  categoriasOptions: catCategoria[] = [];
  colorOptions: any[] = [];
  garmentOptions: any[] = [];
  medidasOptions: MedidaPosicion[] = [];

  // archivos
  archivoPrincipalFile: File | null = null;
  imagenesExtraFiles: File[] = [];
  safeUrlDisenio: SafeUrl = '';

  // visibilidad de dialogos helpers
  public visibleNewCategory: boolean = false;

  // visibilidad de pagina completa
  public loader: boolean = false;

  // arreglo de opciones seleccionadas
  selectedColors: string[] = [];

  // variables de los archivos

  constructor(
    private fb: FormBuilder,
    private catalogoService: GetCatalogosService,
    private messageService: MessageService,
    private categoriaService: CategoriasService,
    private cd: ChangeDetectorRef,
    private diseniosService: DiseniosService
  ) {}

  ngOnInit(): void {
    this.disenioForm = this.fb.group({
      // TABLA disenios
      nombre_disenio: ['', [Validators.required, Validators.maxLength(255)]],
      codigo_disenio: ['', [Validators.required, Validators.maxLength(50)]],
      // cat_disenio_categorias
      categorias: [[], Validators.required], // array de ids
      id_file: ['', Validators.required],
      // disenio_colores
      colores: [[], Validators.required], // array de ids de color
      tipos_productos: [<number[]>[]], // o simplemente: this.fb.control<number[]>([])

      // palabras_clave + disenio_palabras_clave
      // aquí el usuario escribe: "gym, fuerza, motivacion"
      palabras_clave: [''],

      // cat_medidas_disenios
      medidas: [[], Validators.required], // array de ids de medida
    });
    this.loader = true;
    this.getMedidas();
    this.getColores();
    this.getTipoPrendas();
    this.getCategorias();
  }

 async onArchivoPrincipalChange(event: any) {
  const file = event.files?.[0];
  if (!file) return;

  // Vista previa temporal
  this.safeUrlDisenio = event.currentFiles[0].objectURL;

  try {
    // 👉 Comprimir la imagen ANTES de guardarla
    const compressed = await this.compressImage(file, 1600, 1600, 0.8);

    console.log(
      'Tamaño original:', file.size / 1024 / 1024, 'MB',
      ' | Comprimido:', compressed.size / 1024 / 1024, 'MB'
    );

    // 👉 guardamos el archivo comprimido
    this.archivoPrincipalFile = compressed;

    // actualizar el formulario
    this.disenioForm.patchValue({
      archivo_principal: compressed,
    });

  } catch (e) {
    console.error('Error al comprimir la imagen:', e);

    // fallback → guardar el archivo original
    this.archivoPrincipalFile = file;
    this.disenioForm.patchValue({
      archivo_principal: file,
    });
  }
}


  onSubmit() {
    if (this.disenioForm.invalid) {
      this.disenioForm.markAllAsTouched();
      return;
    }

    const value = this.disenioForm.value;

    // Aquí normalmente armas el FormData para enviarlo al PHP
    const formData = new FormData();
    formData.append('nombre_disenio', value.nombre_disenio);
    formData.append('codigo_disenio', value.codigo_disenio);

    if (this.archivoPrincipalFile) {
      formData.append('archivo_principal', this.archivoPrincipalFile);
    }

    this.imagenesExtraFiles.forEach((file, index) => {
      formData.append(`imagenes_extra[${index}]`, file);
    });

    formData.append('categorias', JSON.stringify(value.categorias));
    formData.append('colores', JSON.stringify(value.colores));
    formData.append('tipos_productos', JSON.stringify(value.tipos_productos));
    formData.append('medidas', JSON.stringify(value.medidas));

    // separar palabras clave por coma
    const palabras = (value.palabras_clave || '')
      .split(',')
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);

    formData.append('palabras_clave', JSON.stringify(palabras));

    // TODO: aquí llamas a tu servicio HTTP
    // this.http.post('/api/disenios', formData).subscribe(...)
    console.log('Form listo para enviar', value);
  }

  getMedidas() {
    this.catalogoService.getMedidas().subscribe({
      next: (resp) => {
        this.medidasOptions = resp.data;
        this.loader = false;
        this.cd.detectChanges();
      },
    });
  }
  getColores() {
    this.catalogoService.getColores().subscribe({
      next: (resp) => {
        this.colorOptions = resp.data;
        this.loader = false;
        this.cd.detectChanges();
      },
    });
  }
  getTipoPrendas() {
    this.catalogoService.getTipoPrendas().subscribe({
      next: (resp) => {
        this.garmentOptions = resp.data;
        console.log(this.garmentOptions);
        this.loader = false;
        this.cd.detectChanges();
      },
    });
  }
  getCategorias() {
    this.catalogoService.getCategorias().subscribe({
      next: (resp) => {
        this.categoriasOptions = resp.data;
        this.loader = false;
        this.cd.detectChanges();
      },
    });
  }
  saveNewCategoria(newCategoria: string) {
    if (newCategoria == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre de la categora no puede estar vacio',
        life: 3000,
      });
      return;
    }
    this.categoriaService.addCategoria({ descripcion_categoria: newCategoria }).subscribe({
      next: (resp) => {
        console.log(resp);
        this.getCategorias();
        this.messageService.add({
          severity: 'success',
          summary: 'Guardada',
          detail: 'Categoria guardada correctamente ',
          life: 3000,
        });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.data.error,
          life: 3000,
        });
      },
    });
  }
  onCategoriaToggle(catId: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    const control = this.disenioForm.get('categorias');
    if (!control) return;

    const current: number[] = control.value || [];

    if (checked) {
      // agregar si no existe
      if (!current.includes(catId)) {
        control.setValue([...current, catId]);
      }
    } else {
      // quitar
      control.setValue(current.filter((id) => id !== catId));
    }

    control.markAsDirty();
  }
  isColorSelected(id: string): boolean {
    return this.selectedColors.includes(id);
  }
  toggleColor(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(id);

    if (input.checked) {
      // 👉 Agregar si no existe
      if (!this.selectedColors.includes(id)) {
        this.selectedColors.push(id);
      }
    } else {
      // 👉 Quitar si se deselecciona
      this.selectedColors = this.selectedColors.filter((c) => c !== id);
    }
    this.disenioForm.patchValue({ colores: this.selectedColors });
  }
  toggleGarment(id: number, event: Event) {
    const input = event.target as HTMLInputElement;

    const current = this.disenioForm.get('tipos_productos')!.value as number[];

    if (input.checked) {
      // 👉 Agregar si no está
      if (!current.includes(id)) {
        this.disenioForm.patchValue({
          tipos_productos: [...current, id],
        });
      }
    } else {
      // 👉 Eliminar si se desmarca
      this.disenioForm.patchValue({
        tipos_productos: current.filter((x) => x !== id),
      });
    }
  }
  toggleMedida(id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const current = (this.disenioForm.get('medidas')!.value as number[]) || [];

    if (input.checked) {
      // 👉 Agregar si no existe
      if (!current.includes(id)) {
        this.disenioForm.patchValue({
          medidas: [...current, id],
        });
      }
    } else {
      // 👉 Quitar si se deselecciona
      this.disenioForm.patchValue({
        medidas: current.filter((x) => x !== id),
      });
    }
  }

  sendFile() {
    let categoria = this.disenioForm.get('categorias')?.value;
    if (this.archivoPrincipalFile != null && categoria != '') {
      let categoriaSelected = this.categoriasOptions.filter(
        (c) => c.id == this.disenioForm.get('categorias')?.value
      )[0].label;
      this.diseniosService.uploadDesign(this.archivoPrincipalFile, categoriaSelected).subscribe({
        next: (resp) => {
          this.disenioForm.patchValue({ id_file: resp.data.id_archivo });
        },
      });
      console.log(categoriaSelected);
    } else {
      console.log('aun no podemos enviar el archivo');
    }
  }
  saveDesign() {
    if (!this.disenioForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios',
        life: 3000,
      });
    } else {
      this.diseniosService.guardarDisenioData(this.disenioForm.value).subscribe({
        next: (resp) => {
          console.log(this.disenioForm.value)
          this.messageService.add({
            severity: 'success',
            summary: 'Registro guardado',
            detail: resp.message,
            life: 3000,
          });
          console.log(resp);
          this.resetDisenioForm()
          this.archivoPrincipalFile = null;
          this.safeUrlDisenio = '';
          this.selectedColors = [];
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 3000,
          });
          console.log(err);
        },
      });
    }
  }
  resetDisenioForm() {
  this.disenioForm.reset({
    nombre_disenio: '',
    codigo_disenio: '',
    categorias: [],        // array vacío ✔
    id_file: '',           // string vacío ✔
    colores: [],           // array vacío ✔
    tipos_productos: [],   // array vacío ✔
    palabras_clave: '',
    medidas: [],           // array vacío ✔
  });

  // Si quieres que Angular marque todo como “pristine / untouched”
  this.disenioForm.markAsPristine();
  this.disenioForm.markAsUntouched();
}

compressImage(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1600,
  quality: number = 0.8 // 0 a 1
): Promise<File> {
  return new Promise((resolve, reject) => {
    const fileType = file.type || 'image/jpeg';

    // Sólo procesamos imágenes
    if (!fileType.startsWith('image/')) {
      return resolve(file);
    }

    const reader = new FileReader();

    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Redimensionar manteniendo proporción
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('No se pudo obtener el contexto del canvas'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a blob (JPEG para mejor compresión)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('No se pudo generar el blob'));
            }

            const compressedFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, '') + '-compressed.jpg',
              { type: 'image/jpeg', lastModified: Date.now() }
            );

            resolve(compressedFile);
          },
          'image/jpeg',
          quality // calidad 0–1
        );
      };

      img.onerror = (err) => {
        reject(err);
      };

      img.src = event.target.result as string;
    };

    reader.onerror = (err) => reject(err);

    reader.readAsDataURL(file);
  });
}


}
