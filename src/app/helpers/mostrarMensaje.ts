import { Mensaje } from '../models/Mensaje';
export async function mostrarMensaje(mensaje: Mensaje) {
  const alert = await mensaje.alertController.create({
    header: mensaje.header,
    subHeader: mensaje.subHeader,
    message: '',
    buttons: mensaje.buttons,
    
  });

  await alert.present();
}
