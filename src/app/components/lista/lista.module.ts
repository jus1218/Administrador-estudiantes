import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaComponent } from './lista.component';
import { FormularioModule } from '../formulario/formulario.module';

@NgModule({
  declarations: [ListaComponent],
  imports: [CommonModule, IonicModule, /*FormularioModule*/],
  exports: [ListaComponent],
})
export class ListaModule {}
