import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { OverlayEventDetail } from '@ionic/core';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { Mensaje } from '../../models/Mensaje';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  estudiante: Estudiante;
  //@ViewChild(IonModal) modal!: IonModal;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.estudiante = {
      //Molde utilizado para crear y modificar el estudiante
      cedula: 0,
      nombre: '',
      edad: 0,
      grado: '',
    };
  }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async confirm() {
    let mensaje: Mensaje = {
      alertController: this.alertController,
      header: 'Error!!',
      subHeader: 'No se creo el estudiante',
      buttons: ['OK'],
    };

    try {
      //validacion de la respuesta
      true
        ? (mensaje = {
            alertController: this.alertController,
            header: 'Bien!!',
            subHeader: 'Se creo el estudiante',
            buttons: ['OK'],
          })
        : null;
    } catch (error) {
      mensaje = {
        alertController: this.alertController,
        header: 'Error!!',
        subHeader: 'No se creo el estudiante: ' + error,
        buttons: ['OK'],
      };
    } finally {
      await mostrarMensaje(mensaje);
      //this.modal.dismiss(this.name, 'confirm');
    }
  }

  crearEstudiante(event: Event) {
    //Enviamos el nuevo
    const ev = event as CustomEvent<OverlayEventDetail<Estudiante>>;
    if (ev.detail.role === 'confirm') {
      let est: Estudiante = ev.detail.data!;
    }
  }
}
