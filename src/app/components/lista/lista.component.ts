import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { AlertController, ModalController } from '@ionic/angular';
import { FormularioComponent } from '../formulario/formulario.component';
import { abrirModal } from 'src/app/helpers/openModal';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @Input() elementos: Estudiante[];
  @Input() palabraFiltro: string;
  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.elementos = [];
    this.palabraFiltro = '';
  }

  ngOnInit() {}

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {},
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      handler: () => {},
    },
  ];

  filtrarElementos(): Estudiante[] {
    return this.elementos.filter((elemento) =>
      elemento.nombre.toLowerCase().includes(this.palabraFiltro.toLowerCase())
    );
  }

  delete() {
    console.log('delete');

    mostrarMensaje({
      alertController: this.alertController,
      header: 'Eliminar',
      subHeader: 'Estas seguro que deseas eliminar el usuario',
      buttons: this.alertButtons,
    });
  }

  async openModalHelper() {
    await abrirModal(this.modalController);
  }
}
