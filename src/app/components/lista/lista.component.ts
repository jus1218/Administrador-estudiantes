import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { mostrarMensaje } from 'src/app/helpers/mostrarMensaje';
import { AlertController, ModalController } from '@ionic/angular';
import { FormularioComponent } from '../formulario/formulario.component';
import { abrirModal } from 'src/app/helpers/openModal';
import { DbServiceService } from '../../service/db-service.service';
import { EstudiantesService } from '../../service/estudiantes.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @Input() elementos: Estudiante[];
  @Input() palabraFiltro: string;
  CedulaEliminar: number = 0;
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    public database: DbServiceService,
    private estudiantesService: EstudiantesService
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
      handler: () => {
        this.database.deleteStudent(this.CedulaEliminar).then((msj) => {
          mostrarMensaje({
            alertController: this.alertController,
            header: msj.header,
            subHeader: msj.content,
            buttons: ['OK'],
          });
          this.estudiantesService.estudiantesActualizados.next();
        });
      },
    },
  ];

  filtrarElementos(): Estudiante[] {
    return this.elementos.filter(
      (el) =>
        this.filtrar(el.cedula.toString()) ||
        this.filtrar(el.nombre) ||
        this.filtrar(el.carrera) ||
        this.filtrar(el.grado)
    );
  }

  filtrar(palabra: string): boolean {
    return palabra.toLowerCase().indexOf(this.palabraFiltro.toLowerCase()) > -1;
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

  async openModalHelper(student: Estudiante) {
    await abrirModal(this.modalController, 'Editar Estudiante', student, true);
  }

  deleteStudent(cedula: number) {
    this.CedulaEliminar = cedula;

    mostrarMensaje({
      alertController: this.alertController,
      header: 'Eliminar',
      subHeader:
        'Estas seguro que deseas eliminar el usuario con cedula: ' +
        cedula +
        ' ?',
      buttons: this.alertButtons,
    });
  }
}
