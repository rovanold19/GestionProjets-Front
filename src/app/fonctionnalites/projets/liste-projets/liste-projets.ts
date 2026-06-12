import { RouterLink } from '@angular/router';
import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import {CommonModule, isPlatformBrowser } from '@angular/common';
import { ProjetService } from '../services/projet';
import { NavbarComponent } from "../../../layouts/navbar/navbar";
import { Sidebar } from "../../../layouts/sidebar/sidebar";


@Component({
  selector: 'app-project-list',

  templateUrl: './liste-projets.html',

  styleUrl: './liste-projets.css',
  imports: [NavbarComponent, Sidebar, RouterLink, CommonModule]
})

export class ListeProjets
implements OnInit {

  projets: any[] = [];
  private projetService = inject(ProjetService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef); 

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadProjets();
    }
  }
 loadProjets() {
    this.projetService.getProjets().subscribe({
      next: (response: any) => {
        console.log('Données reçues de Django :', response);
        if (response && response.results && Array.isArray(response.results)) {
          this.projets = response.results; // Si pagination activée côté Django
        } else if (Array.isArray(response)) {
          this.projets = response;         // Si tableau simple
        } else {
          console.error("Le format renvoyé par l'API n'est pas un tableau", response);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Erreur de récupération :", error);
      }
    });
  }
}