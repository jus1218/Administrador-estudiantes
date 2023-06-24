import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Estudiante } from '../../models/Estudiante';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { Mensaje } from '../../models/Mensaje';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { abrirModal } from 'src/app/helpers/openModal';
import { DbServiceService } from '../../service/db-service.service';
import { EstudiantesService } from '../../service/estudiantes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class Tab1Page implements OnInit {
  //Componentes

  buscador: BuscadorComponent;

  //arreglos de variables normales
  estudiantes: Estudiante[] = [];
  elementos: any[] = [];

  palabra: string = '';

  constructor(
    private modalController: ModalController,
    public database: DbServiceService,
    private estudiantesService: EstudiantesService
  ) {
    this.buscador = new BuscadorComponent();
    this.estudiantes = [
      {
        cedula: 1,
        nombre: 'Juan',
        carrera: '',
        grado: 'Noveno',
      },
      {
        cedula: 2,
        nombre: 'Pedro',
        carrera: '',
        grado: 'Septimo',
      },
    ];

    this.database.createDataBase().then(() => {
      this.getStudents();
    });
  }

  ngOnInit() {
    this.estudiantesService.estudiantesActualizados.subscribe(() => {
      this.getStudents(); // Lógica para obtener los estudiantes actualizados
    });
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
    await abrirModal(
      this.modalController,
      'Crear Estudiante',
      {
        cedula: 0,
        nombre: '',
        carrera: '',
        grado: '',
      },
      false
    );
  }

  getStudents() {
    this.database.getStudents().then((data) => {
      this.estudiantes = [];
      console.log('JS: DATOS....');

      if (data.rows.length > 0) {
        console.log('JS: =======================================');
        for (let i = 0; i < data.rows.length; i++) {
          let estudiante: Estudiante = data.rows.item(i);
          this.estudiantes.push(estudiante);
        }
      }
    });
  }
}
