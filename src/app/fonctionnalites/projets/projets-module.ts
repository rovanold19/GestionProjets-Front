import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  ProjetsRoutingModule
} from './projets-routing-module';



import { CreerProjet } from './creer-projet/creer-projet';

import { ListeProjets } from './liste-projets/liste-projets';

import { ModifierProjet } from './pages/modifier-projet/modifier-projet';




@NgModule({


  imports: [
    CommonModule,
    FormsModule,
    ProjetsRoutingModule,
    ListeProjets,
    CreerProjet,
    ModifierProjet
  ]

})

export class ProjetsModule { }