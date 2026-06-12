import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjetService } from '../services/projet';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";
import { MembreService } from '../services/membre';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../utilisateurs/services/user';


@Component({
  selector: 'app-project-detail',
  templateUrl: './detail-projet.html',
  styleUrl: './detail-projet.css',
  standalone: true,
  imports: [Sidebar, NavbarComponent, CommonModule, FormsModule, RouterLink] 
})
export class DetailProjet implements OnInit {
  projet: any;
  nouveauMembre = {id_user: null, role: 'MEMBRE'};
  listeUtilisateurs: any[] = [];
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private membreService: MembreService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.chargerUtilisateurs();
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam); 
      this.chargerProjet(id);
    } else {
      console.error("Impossible de récupérer l'ID du projet depuis l'URL. Vérifiez votre fichier de routage Angular.");
    }
  }

  chargerProjet(id: number): void {
    this.projetService.getProjet(id).subscribe({
      next: (response: any) => {
        console.log('Détails du projet reçus du Backend :', response);
        this.projet = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du projet :', error);
      }
    });
  }

  ajouterMembre() {

  this.membreService
    .ajouterMembre(
      this.projet.id,
      this.nouveauMembre
    )
    .subscribe({

      next: () => {

        alert(
          'Membre ajouté'
        );

        this.chargerProjet(this.projet.id);

      },

      error: (err:any) => {

        console.error(err);

      }

    });
  }

  enleverMembre(
  userId: number
  ) {

  if (
    !confirm(
      'Retirer ce membre ?'
    )
  ) {
    return;
  }

  this.membreService
    .enleverMembre(
      this.projet.id,
      userId
    )
    .subscribe({

      next: () => {

        this.chargerProjet(this.projet.id);

      }

    });

}

supprimerProjet() {

  if (
    !confirm(
      'Voulez-vous vraiment supprimer ce projet ?'
    )
  ) {
    return;
  }

  this.projetService
      .supprimerProjet(
        this.projet.id
      )
      .subscribe({

        next: () => {

          alert(
            'Projet supprimé'
          );

          this.router.navigate(
            ['/projets']
          );

        },

        error: (err) => {

          console.error(err);

        }

      });

}

chargerUtilisateurs() {

  this.userService
      .getUsers()
      .subscribe({

        next: (res: any) => {

          console.log('UTILISATEURS', res);

          this.listeUtilisateurs = res.results;
          console.log(this.listeUtilisateurs);
        },

        error: (err) => {

          alert(err.error.message);

        }

      });

}

}
