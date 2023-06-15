import { Component, ViewChild, Input } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Estudiante } from '../../models/Estudiante';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { Mensaje } from '../../models/Mensaje';

@Component({
  selector: 'app-tab1',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class Tab1Page {
  //Componentes
  @ViewChild(IonModal) modal!: IonModal;
  buscador: BuscadorComponent;

  //arreglos de variables normales
  estudiantes: Estudiante[] = [];
  elementos: any[] = [];

  palabra: string = '';
  estudiante: Estudiante = {
    //Molde utilizado para crear y modificar el estudiante
    cedula: 0,
    nombre: '',
    edad: 0,
    grado: '',
  };

  constructor(private alertController: AlertController) {
    this.buscador = new BuscadorComponent();
    this.estudiantes = [
      {
        cedula: 1,
        nombre: 'Juan',
        edad: 15,
        grado: 'Noveno',
      },
      {
        cedula: 2,
        nombre: 'Pedro',
        edad: 12,
        grado: 'Septimo',
      },
    ];
  }

  // METODOS DEL MODAL
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    let mensaje: Mensaje = {
      alertController: this.alertController,
      header: 'Error!!',
      subHeader: 'No se creo el estudiante',
      buttons: ["OK"]
    };

    try {


      //validacion de la respuesta
      true ? (mensaje = {
            alertController: this.alertController,
            header: 'Bien!!',
            subHeader: 'Se creo el estudiante',
            buttons: ["OK"]
          })
        : null;

    } catch (error) {
      mensaje = {
        alertController: this.alertController,
        header: 'Error!!',
        subHeader: 'No se creo el estudiante: ' + error,
        buttons: ["OK"]
      };
    } finally {
      await mostrarMensaje(mensaje);
    }

    console.log(this.estudiante);
  }

  crearEstudiante(event: Event) {
    //Enviamos el nuevo
    const ev = event as CustomEvent<OverlayEventDetail<Estudiante>>;
    if (ev.detail.role === 'confirm') {
      let est: Estudiante = ev.detail.data!;


      
      
    }
  }

  // METODOS DEL BUSCADOR
  onBuscar(event: string) {
    console.log(event);

    this.palabra = event;
    this.elementos = [...this.estudiantes];
  }
}
