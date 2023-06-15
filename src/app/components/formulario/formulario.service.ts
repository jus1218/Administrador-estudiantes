import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  formularioCerrado: EventEmitter<void> = new EventEmitter<void>();

  cerrarFormulario() {
    this.formularioCerrado.emit();
  }
}
