import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../services/projet';
import { NavbarComponent } from "../../../../layouts/navbar/navbar";
import { Sidebar } from "../../../../layouts/sidebar/sidebar";



@Component({
  selector: 'app-modifier-projet',

  templateUrl: './modifier-projet.html',

  styleUrl: './modifier-projet.css',

  imports: [FormsModule, NavbarComponent, Sidebar]
})

export class ModifierProjet {

  projetId!: number;

  formData: any = {};

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private projetService: ProjetService

  ) {}

  ngOnInit() {

    this.projetId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.projetService
      .getProjet(this.projetId)
      .subscribe({

        next: (res) => {

          this.formData = res;

        }

      });

  }

  modifierProjet() {

    this.projetService
      .modifierProjet(
        this.projetId,
        this.formData
      )
      .subscribe({

        next: () => {

          this.router.navigate([
            '/projets',
            this.projetId
          ]);

        }

      });

  }

}