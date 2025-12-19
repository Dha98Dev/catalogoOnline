import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-whatsapp-chat',
  standalone: false,
  templateUrl: './whatsapp-chat.html',
  styleUrl: './whatsapp-chat.scss',
})
export class WhatsappChat {
  whatsappChatVisible = false;
  whatsappMessage = '';
  @Input() mensaje:string=''

  // aquí podrías inyectar info seleccionada (producto, talla, diseño, etc.)
  // por ahora lo dejamos mock
  openWhatsappChat() {
    this.whatsappMessage = this.buildWhatsappMessage();
    this.whatsappChatVisible = true;
  }

  private buildWhatsappMessage(): string {
    // TODO: arma el mensaje según lo que haya seleccionado el usuario
    return (
      `Hola \n\nMe gustaría solicitar una cotización para mi diseño personalizado.\n\n
    ` +
      this.mensaje+`
    \n\n¿Me puedes apoyar con el precio y tiempos de entrega?`
    );
  }

  copyWhatsappMessage() {
    navigator.clipboard.writeText(this.whatsappMessage).catch(() => {});
  }

  goToWhatsapp() {
    const phone = '523327863928'; // <-- aquí tu número en formato internacional
    const text = encodeURIComponent(this.whatsappMessage);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['mensaje'] && changes['mensaje'].currentValue) {
      console.log(this.mensaje);
      
    }
  }
}
