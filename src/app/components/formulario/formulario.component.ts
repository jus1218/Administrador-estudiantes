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
    edad: 0,
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
    //private dbService: DbServiceService,
    public database: DbServiceService,
    private estudiantesService: EstudiantesService
  ) {}

  //===============================================================

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }
  /*
  async confirm() {
    try {
      //validacion de la respuesta

      const res = this.dbService.almacenarUsuario(this.estudiante);
      const a = this.dbService.mostrarUsuarios();
      console.log(res);

      true
        ? (this.mensaje = {
            alertController: this.alertController,
            header: 'Bien!!',
            subHeader: res,
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

  
  async crearUsuario() {
    const { cedula, nombre, edad, grado } = this.estudiante;
    const query = 'INSERT INTO ESTUDIANTE VALUES(?,?,?,?)'; // Reemplaza "tabla" por el nombre de tu tabla
    const params: any = [cedula, nombre, edad, grado];

    const result = await this.dbService.executeSql(query, params);

    if (result != null) {
      console.log('JUSTIN: SE CREO CORRECTAMENTE');
    } else {
      console.log('JUSTIN: ERROR AL CREAR UN ESTUDIANTE');
    }
  }
*/

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
