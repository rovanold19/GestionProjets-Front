import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  ListeProjets
} from './liste-projets/liste-projets';

import {
  CreerProjet
} from './creer-projet/creer-projet';

import {
  DetailProjet
} from './detail-projet/detail-projet';


const routes: Routes = [

  {
    path: '',
    component: ListeProjets
  },

  {
    path: 'creer',
    component: CreerProjet
  },

  {
    path: ':id',
    component: DetailProjet
  }

];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule 
  ]

})

export class ProjetsRoutingModule { }