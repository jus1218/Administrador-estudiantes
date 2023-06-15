import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(private modalController: ModalController) {}

  async abrirModal() {
    const modal = await this.modalController.create({
      component: FormularioComponent,
    });

    await modal.present();
  }

  
}
