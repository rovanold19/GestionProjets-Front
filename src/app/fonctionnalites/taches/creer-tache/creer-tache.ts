import { Component, inject } from '@angular/core';
import { MembreService } from '../../projets/services/membre';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../projets/services/projet';
import { TacheService } from '../services/tache';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";

@Component({
  selector: 'app-task-create',

  templateUrl: './creer-tache.html',
  styleUrl: './creer-tache.css',
  imports: [Sidebar, NavbarComponent, FormsModule]
})

export class CreerTache {
  listeProjets: any[] = [];
  membresProjet: any[] = [];
  formData = {

    titre: '',

    description: '',

    statut: 'A_FAIRE',

    priorite: 'MOYEN',

    projet: null,  
    
    progression: 0,

    date_fermeture: '',

    assignation: ''

  };

  private tacheService = inject(TacheService);
  private projetService = inject(ProjetService); 
  private router = inject(Router);
  private membreService = inject(MembreService);

  ngOnInit(): void {
    this.chargerLesProjets();
  }

  chargerLesProjets() {
    this.projetService.getProjets().subscribe({
      next: (response: any) => {
        // Gestion de la pagination Django DRF (récupération de 'results')
        if (response && response.results && Array.isArray(response.results)) {
          this.listeProjets = response.results;
        } else if (Array.isArray(response)) {
          this.listeProjets = response;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des projets :', error);
      }
    });
  }


  chargerMembresProjet() {

  if (!this.formData.projet) {
    return;
    }

    this.membreService
        .getMembers(
          this.formData.projet
        )
        .subscribe({

          next: (response: any) => {

            this.membresProjet =
            response;

          }

        });

  }

  creerTache() {
    this.tacheService.creerTache(this.formData).subscribe({
      next: (res) => {
        console.log('Tâche créée avec succès !', res);
        this.router.navigate(['/taches']); // Redirection vers le tableau Kanban
      },
      error: (err) => {
        console.error('Erreur lors de la création de la tâche :', err);
      }
    });
  }
}
