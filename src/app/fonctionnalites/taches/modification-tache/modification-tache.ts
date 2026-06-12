import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TacheService } from '../services/tache';
import { ProjetService } from '../../projets/services/projet'; 
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";

@Component({
  selector: 'app-task-edit',
  templateUrl: './modification-tache.html',
  styleUrl: './modification-tache.css',
  standalone: true, 
  imports: [Sidebar, FormsModule] 
})
export class ModificationTache implements OnInit {
  listeProjets: any[] = [];
  tacheId: number = 0;
  
  formData: any = {
    titre: '',
    description: '',
    statut: 'A_FAIRE',
    priorite: 'MOYEN',
    projet: null,  
    progression: 0,
    date_fermeture: '',
    assignation: ''
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tacheService = inject(TacheService);
  private projetService = inject(ProjetService);

  ngOnInit(): void {
    this.tacheId = this.route.snapshot.params['id'];
    this.chargerLesProjets();
    this.chargerLaTache();
  }

  chargerLesProjets() {
    this.projetService.getProjets().subscribe({
      next: (response: any) => {
        if (response && response.results && Array.isArray(response.results)) {
          this.listeProjets = response.results;
        } else if (Array.isArray(response)) {
          this.listeProjets = response;
        }
      },
      error: (error) => console.error('Erreur projets :', error)
    });
  }

  chargerLaTache() {
    this.tacheService.getTache(this.tacheId).subscribe({
      next: (response: any) => {
        this.formData = response;
      },
      error: (error) => console.error('Erreur chargement tâche :', error)
    });
  }

  modifierTache() {
    // 1. Copie locale pour nettoyer les données avant l'envoi à Django
    const donneesAEnvoyer = { ...this.formData };

    // 2. Extraction de l'ID si Django a renvoyé un objet projet complet
    if (donneesAEnvoyer.projet && typeof donneesAEnvoyer.projet === 'object') {
      donneesAEnvoyer.projet = donneesAEnvoyer.projet.id;
    }

    // 3. Sécurité pour les valeurs vides
    if (donneesAEnvoyer.projet === '' || donneesAEnvoyer.projet === undefined) {
      donneesAEnvoyer.projet = null;
    }

    // 4. Envoi des données nettoyées
    this.tacheService.modifierTache(this.tacheId, donneesAEnvoyer).subscribe({
      next: () => {
        this.router.navigate(['/taches', this.tacheId]);
      },
      error: (error) => {
        console.error('Erreur modification :', error);
        if (error.error) {
          console.error('Détails du rejet de Django :', error.error);
        }
      }
    });
  }
}
