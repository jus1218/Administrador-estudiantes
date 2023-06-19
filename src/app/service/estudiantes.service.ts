import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  estudiantesActualizados: Subject<void> = new Subject<void>();

  constructor() { }
}
