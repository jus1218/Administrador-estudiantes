import { Component, ViewChild, Input } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Estudiante } from '../../models/Estudiante';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { Mensaje } from '../../models/Mensaje';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { abrirModal } from 'src/app/helpers/openModal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class Tab1Page {
  //Componentes

  buscador: BuscadorComponent;

  //arreglos de variables normales
  estudiantes: Estudiante[] = [];
  elementos: any[] = [];

  palabra: string = '';

  constructor(private modalController: ModalController) {
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

  // METODOS DEL BUSCADOR
  onBuscar(event: string) {
    console.log(event);

    this.palabra = event;
    this.elementos = [...this.estudiantes];
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async abrirModalHelper() {
    await abrirModal(this.modalController, 'Crear Estudiante');
  }

  naruto(){
    
  }
}
