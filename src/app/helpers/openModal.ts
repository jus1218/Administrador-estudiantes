import { ModalController } from '@ionic/angular';
import { FormularioComponent } from '../components/formulario/formulario.component';
import { Estudiante } from '../models/Estudiante';
export async function abrirModal(
  modalController: ModalController,
  titulo: string,
  estudiante: Estudiante,
  modoEdicion: boolean
) {
  const modal = await modalController.create({
    component: FormularioComponent,
    componentProps: {
      titulo: titulo,
      estudiante: estudiante,
      modoEdicion: modoEdicion,
    },
  });

  /*
      componentProps: {
      titulo: titulo,
    },
  */

  await modal.present();
}
