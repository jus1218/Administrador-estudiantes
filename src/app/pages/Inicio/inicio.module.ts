import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './inicio.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './inicio-routing.module';
import { BuscadorModule } from '../../components/buscador/buscador.module';
import { ListaModule } from '../../components/lista/lista.module';

import { FormularioModule } from '../../components/formulario/formulario.module';
import { ModalModule } from '../../components/modal/modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    // PERSONALIZADOS
    BuscadorModule,
    ListaModule,
    /**FormularioModule,
    ModalModule, */
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
