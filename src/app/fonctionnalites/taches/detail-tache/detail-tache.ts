import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TacheService } from '../services/tache'; 
import { FormsModule } from '@angular/forms';
import { CommentaireService } from '../services/commentaire';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar"; 
import { CommonModule } from '@angular/common';
import { FichierService } from '../services/fichier';

@Component({
  selector: 'app-task-detail',
  templateUrl: './detail-tache.html',
  styleUrls: ['./detail-tache.css'],
  imports: [Sidebar, NavbarComponent, FormsModule, CommonModule, RouterLink] 
})
export class DetailTache implements OnInit {

  tache: any;
  commentaires: any[] = [];
  pieces_jointes: any[] = [];
  fichier_selectionne: File | null = null;

  commentaireData = {
    tache: null as any,
    contenu: ''
  };

  private route = inject(ActivatedRoute);
  private fichierService = inject(FichierService);
  private tacheService = inject(TacheService);
  private commentaireService = inject(CommentaireService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.commentaireData.tache = id;
    this.loadFichiers(id);
    this.loadTache(id);
    this.loadCommentaires(id);
  }

  

  loadTache(id: number) {
    this.tacheService.getTache(id).subscribe({
      next: (response: any) => {
        this.tache = response;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur récupération tâche', err)
    });
  }

  loadCommentaires(id: number) {
    this.commentaireService.getCommentaires(id).subscribe({
      next: (response: any) => {
        if (response && response.results && Array.isArray(response.results)) {
          this.commentaires = response.results;
        } else if (Array.isArray(response)) {
          this.commentaires = response;
        } else {
          this.commentaires = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur récupération commentaires', err)
    });
  }

  ajouterCommentaire() {
    if (!this.commentaireData.contenu.trim()) {
      return;
    }

    this.commentaireService
      .creerCommentaire(this.commentaireData.tache, this.commentaireData)
      .subscribe({
        next: (nouveauCommentaire: any) => {
          this.commentaireData.contenu = '';
          if (nouveauCommentaire) {
            this.commentaires.unshift(nouveauCommentaire);
          } else {
            this.loadCommentaires(this.commentaireData.tache);
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur lors de l'ajout du commentaire :", err)
      });
  }

  loadFichiers(tacheId: number) {
    this.fichierService.getFichiers(tacheId).subscribe({
      next: (response: any) => {
        if (response && response.results && Array.isArray(response.results)) {
          this.pieces_jointes = response.results;
        } else if (Array.isArray(response)) {
          this.pieces_jointes = response;
        } else {
          this.pieces_jointes = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur récupération fichiers', err)
    });
  }

  surFichierSelectionne(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fichier_selectionne = event.target.files[0];
      this.cdr.detectChanges();
    }
  }

  gererActionFichier(fileInputHidden: HTMLInputElement) {
    if (!this.fichier_selectionne) {
      fileInputHidden.click();
    } else {
      this.televerseFichier();
    }
  }

  televerseFichier() {
    if (!this.fichier_selectionne) {
      return;
    }

    const formData = new FormData();
    formData.append('tache', this.commentaireData.tache.toString());
    formData.append('fichier', this.fichier_selectionne);

    this.fichierService.televerseFichier(this.commentaireData.tache, formData).subscribe({
      next: () => {
        this.annulerSelection();
        this.loadFichiers(this.commentaireData.tache);
      },
      error: (err) => console.error('Erreur téléversement', err)
    });
  }

  annulerSelection() {
    this.fichier_selectionne = null;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.cdr.detectChanges();
  }

  supprimerFichier(id: number) {
    this.fichierService.supprimerFichier(id).subscribe({
      next: () => {
        this.loadFichiers(this.commentaireData.tache);
      },
      error: (err) => console.error('Erreur suppression fichier', err)
    });
  }


  supprimerTache() {

  this.tacheService
  .supprimerTache(this.tache.id)
  .subscribe({

    next: () => {

      this.router.navigate([
        '/taches'
      ]);
    }

  });
}
}
