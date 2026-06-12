import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environnement } from '../../../environnements/environnement.developpement';


@Injectable({
  providedIn: 'root'
})

export class ProjetService {

  apiUrl =`${environnement.apiUrl}/projets`;

  constructor(
    private http: HttpClient
  ) { }

  getProjets() {

    return this.http.get(
      `${this.apiUrl}/`
    );
  }

  getProjet(id: number) {

    return this.http.get(
      `${this.apiUrl}/${id}/`
    );
  }

  creerProjet(data: any) {

    return this.http.post(
      `${this.apiUrl}/`,
      data
    );
  }

  modifierProjet(
    id: number,
    data: any
    ) {

    return this.http.patch(
      `${this.apiUrl}/${id}/`,
      data
    );
  }

  supprimerProjet(
    id: number
    ) {

    return this.http.delete(
      `${this.apiUrl}/${id}/`
    );
  }
}