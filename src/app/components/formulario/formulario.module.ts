import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormularioComponent } from './formulario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormularioComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [FormularioComponent],
})
export class FormularioModule {}
