import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop'; 
import { TacheService } from '../services/tache';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- AJOUT INDISPENSABLE

@Component({
  selector: 'app-task-list',
  templateUrl: './liste-taches.html',
  styleUrls: ['./liste-taches.css'],
  imports: [Sidebar, NavbarComponent, DragDropModule, RouterLink, CommonModule] // <-- AJOUT DE CommonModule ICI
})
export class ListeTaches implements OnInit {

  a_faire: any[] = [];
  en_cours: any[] = [];
  termine: any[] = []; // Matches parfaitement avec votre HTML
  
  private tacheService = inject(TacheService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef); 

  ngOnInit(): void {
    // Sécurité SSR : On n'appelle l'API que sur le navigateur pour éviter les conflits de rafraîchissement
    if (isPlatformBrowser(this.platformId)) {
      this.loadTaches();
    }
  }

  loadTaches() {
    this.tacheService.getTaches().subscribe({
      next: (response: any) => {
        console.log('Données de tâches reçues :', response);
        
        let tableauTaches: any[] = [];
        if (response && response.results && Array.isArray(response.results)) {
          tableauTaches = response.results;
        } else if (Array.isArray(response)) {
          tableauTaches = response;
        } else {
          console.error("Format de réponse de l'API inconnu", response);
          return;
        }

        // Affectation stricte selon les clés de votre modèle Django
        this.a_faire = tableauTaches.filter((t: any) => t.statut === 'A_FAIRE');
        this.en_cours = tableauTaches.filter((t: any) => t.statut === 'EN_COURS');
        this.termine = tableauTaches.filter((t: any) => t.statut === 'TERMINE' || t.statut === 'En_REVISION');

        // FORCE l'affichage des données asynchrones à l'écran
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.cdr.detectChanges();
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const tache = event.container.data[event.currentIndex];
      tache.statut = status;
      this.cdr.detectChanges();

      this.tacheService.modifierTache(tache.id, {
        statut: status 
      }).subscribe({
        next: (res) => {
          console.log('Statut mis à jour !', res);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur de mise à jour :', err)
      });
    }
  }
}
