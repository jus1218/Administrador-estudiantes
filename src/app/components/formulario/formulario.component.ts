import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { OverlayEventDetail } from '@ionic/core';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { Mensaje } from '../../models/Mensaje';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { FormularioService } from './formulario.service';
import { DbServiceService } from '../../service/db-service.service';
import { EstudiantesService } from '../../service/estudiantes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  @Input() estudiante: Estudiante = {
    //Molde utilizado para crear y modificar el estudiante
    cedula: 0,
    nombre: '',
    carrera: '',
    grado: '',
  };
  @Input() modoEdicion: boolean = false;
  titulo: string = '';
  mensaje: Mensaje = {
    alertController: this.alertController,
    header: 'Error!!',
    subHeader: 'No se creo el estudiante',
    buttons: ['OK'],
  };
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    public database: DbServiceService,
    private estudiantesService: EstudiantesService
  ) {}

  //===============================================================

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  submit() {
    this.modoEdicion ? this.editStudent() : this.addStudent();
  }

  addStudent() {
    if (this.validateStudent()) {
      alert('Llene todos los campos solicitados');
      return;
    }
    this.database.addStudent(this.estudiante).then((msj) => {
      //alert(res);
      mostrarMensaje({
        alertController: this.alertController,
        header: msj.header,
        subHeader: msj.content,
        buttons: ['OK'],
      });

      this.estudiantesService.estudiantesActualizados.next();
    });
  }

  editStudent() {
    if (this.validateStudent()) {
      alert('Llene todos los campos solicitados');
      return;
    }

    this.database.editStudent(this.estudiante).then((msj) => {
      mostrarMensaje({
        alertController: this.alertController,
        header: msj.header,
        subHeader: msj.content,
        buttons: ['OK'],
      });

      this.estudiantesService.estudiantesActualizados.next();
    });
  }

  validateStudent(): boolean {
    const StudentValues = Object.values(this.estudiante);

    return StudentValues.some((el) => el.length === 0);
  }
}
