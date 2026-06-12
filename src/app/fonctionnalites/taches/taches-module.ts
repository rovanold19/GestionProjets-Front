import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  DragDropModule
} from '@angular/cdk/drag-drop';

import { TachesRoutingModule } from './taches-routing-module';

import { ListeTaches } from './liste-taches/liste-taches';

import { CreerTache } from './creer-tache/creer-tache';

import { DetailTache } from './detail-tache/detail-tache';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    TachesRoutingModule,
    ListeTaches,
    CreerTache,
    DetailTache
  ]

})

export class TachesModule { }