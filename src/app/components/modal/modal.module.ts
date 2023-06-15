import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormularioModule } from '../formulario/formulario.module';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, IonicModule, FormularioModule],
  exports: [ModalComponent],
})
export class ModalModule {}
