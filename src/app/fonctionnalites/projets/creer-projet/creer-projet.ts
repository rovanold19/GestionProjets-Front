import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import {
  ProjetService
} from '../services/projet';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-project-create',

  templateUrl: './creer-projet.html',
  styleUrl: './creer-projet.css',
  imports: [Sidebar, NavbarComponent, FormsModule, RouterLink]
})

export class CreerProjet {

  formData = {

  titre: '',

  description: '',

  statut: 'PROGRAMMATION',

  priorite: 'MOYEN',

  date_debut: '',

  date_fin: ''

};

  constructor(

    private projetService:
    ProjetService,

    private router: Router

  ) { }

  creerProjet() {

    this.projetService
    .creerProjet(this.formData)
    .subscribe({

      next: () => {

        this.router.navigate([
          '/projets'
        ]);
      },

      error: (error) => {

        console.log(error);
      }

    });
    console.log("reussi");
  }
}