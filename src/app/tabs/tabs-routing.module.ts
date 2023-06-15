import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista',
        loadChildren: () =>
          import('../pages/Inicio/inicio.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'sobre-la-app',
        loadChildren: () =>
          import('../pages/sobre-la-app/sobre-la-app.module').then((m) => m.Tab2PageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/lista',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/lista',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
