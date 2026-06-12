import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ListeTaches } from './liste-taches/liste-taches';

import { CreerTache } from './creer-tache/creer-tache';

import { DetailTache } from './detail-tache/detail-tache';

import { ModificationTache } from './modification-tache/modification-tache';


const routes: Routes = [

  {
    path: '',
    component: ListeTaches
  },

  {
    path: 'creer',
    component: CreerTache
  },

  {
    path: ':id',
    component: DetailTache
  },

  {
  path: ':id/modifier',
  component: ModificationTache
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

export class TachesRoutingModule { }