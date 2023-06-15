import { ModalController } from '@ionic/angular';
import { FormularioComponent } from '../components/formulario/formulario.component';
export async function abrirModal(
  modalController: ModalController,
  titulo: string
) {
  const modal = await modalController.create({
    component: FormularioComponent,
    componentProps: {
      titulo: titulo,
    },
  });

  /*
      componentProps: {
      titulo: titulo,
    },
  */

  await modal.present();
}
