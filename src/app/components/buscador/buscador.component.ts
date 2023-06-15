import { Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  label: string;

  @Output() metodo: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.label = 'Buscar';

  }

  ngOnInit() {}

  onInputChange(event: any) {
    const searchTerm = event.target.value;
    this.metodo.emit(searchTerm);
  }

}
