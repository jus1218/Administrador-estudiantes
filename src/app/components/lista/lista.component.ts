import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @Input() elementos: Estudiante[];
  @Input() palabraFiltro: string;

  constructor() {
    this.elementos = [];
    this.palabraFiltro = '';
  }

  ngOnInit() {}


  
  filtrarElementos(): Estudiante[] {
    return this.elementos.filter((elemento) =>
      elemento.nombre.toLowerCase().includes(this.palabraFiltro.toLowerCase())
    );
  }



  

}
