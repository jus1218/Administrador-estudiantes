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
  titulo:string="";
  mensaje: Mensaje = {
    alertController: this.alertController,
    header: 'Error!!',
    subHeader: 'No se creo el estudiante',
    buttons: ['OK'],
  };
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

  //===============================================================

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async confirm() {
    try {
      //validacion de la respuesta
      true
        ? (this.mensaje = {
            alertController: this.alertController,
            header: 'Bien!!',
            subHeader: 'Se creo el estudiante',
            buttons: ['OK'],
          })
        : null;
    } catch (error) {
      this.mensaje = {
        alertController: this.alertController,
        header: 'Error!!',
        subHeader: 'No se creo el estudiante: ' + error,
        buttons: ['OK'],
      };
    } finally {
      await mostrarMensaje(this.mensaje);
      console.table(this.estudiante);
    }
  }
}
