import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root',
})
export class DbServiceService {
  dataBaseObject!: SQLiteObject;
  constructor(private sqlite: SQLite) {
    //this.dataBaseObject = new SQLiteObject();
  }
  async createDataBase() {
    await this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.dataBaseObject = db;
        console.log('JS: BASE DE DATOS OK');
      })
      .catch((er) => {
        alert('JS: Error al crear la database: ' + JSON.stringify(er));
      });

    await this.createTable();
  }

  /*
    cedula: number;
    nombre: string;
    edad: number;
    grado: string;
  */
  async createTable() {
    await this.dataBaseObject
      .executeSql(
        `CREATE TABLE IF NOT EXISTS estudiantes(
        cedula INTEGER PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        edad INTEGER,
        grado VARCHAR(255) NOT NULL)
    `,
        []
      )
      .then(() => {
        console.log('JS: TABLA OK');
      })
      .catch(() => {
        console.log('JS: TABLA ERROR');
      });
  }

  async addStudent(student: Estudiante) {
    const { cedula, nombre, edad, grado } = student;

    return this.dataBaseObject
      .executeSql(`INSERT INTO estudiantes VALUES(?,?,?,?)`, [
        cedula,
        nombre,
        edad,
        grado,
      ])
      .then(() => {
        return { header: 'Bien!!', content: 'Estudiante creado' };
      })
      .catch((e) => {
        if (e.code === 6) {
          return { header: 'Upps!!', content: 'Estudiante ya existe' };
        }

        return { header: 'Error!!', content: 'Error al crear un estudiante' };
      });
  }

  async getStudents() {
    return await this.dataBaseObject
      .executeSql(`SELECT * FROM estudiantes`, [])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return 'JS: Error al obtener los estudiantes' + JSON.stringify(err);
      });
  }

  async editStudent(student: Estudiante) {
    const { cedula, nombre, edad, grado } = student;

    console.log('JS: ENTROOO');
    return await this.dataBaseObject
      .executeSql(
        `UPDATE estudiantes SET nombre = ?, edad = ?, grado = ? WHERE cedula = ?`,
        [nombre, edad, grado, cedula]
      )
      .then(() => {
        console.log('JS: EDITADO...');
        return { header: 'Bien!!', content: 'Estudiante actualizado' };
      })
      .catch((err) => {
        return {
          header: 'Error!!',
          content: 'Error al actualizar el estudiante',
        };
      });
  }

  async deleteStudent(cedula: number) {
    return await this.dataBaseObject
      .executeSql(`DELETE FROM estudiantes WHERE cedula = ?`, [cedula])
      .then(() => {
        console.log('JUS: ELIMINADO: ' + cedula);

        return { header: 'Bien!!', content: 'Se elimino el estudiante' };
      })
      .catch((err) => {
        console.log('JUS: ERROR AL ELIMINAR: ' + cedula);
        return {
          header: 'Error!!',
          content: 'Error al eliminar el estudiante',
        };
      });
  }
}
