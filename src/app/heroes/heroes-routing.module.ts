import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'edit/:id',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      },

    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
