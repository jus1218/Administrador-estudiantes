import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './buscador.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BuscadorComponent],
  imports: [CommonModule,IonicModule],
  exports: [BuscadorComponent]
})
export class BuscadorModule { }
