import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaComponent } from './lista.component';

@NgModule({
  declarations: [ListaComponent],
  imports: [CommonModule,IonicModule],
  exports: [ListaComponent]
})
export class ListaModule { }
