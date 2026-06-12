import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environnement } from '../../../environnements/environnement.developpement';


@Injectable({
  providedIn: 'root'
})

export class TacheService {

  apiUrl =`${environnement.apiUrl}/taches`;

  constructor(
    private http: HttpClient
  ) { }

  getTaches() {

    return this.http.get(
      `${this.apiUrl}/`
    );
  }

  getTache(id: number) {

    return this.http.get(
      `${this.apiUrl}/${id}/`
    );
  }

  creerTache(data: any) {

    return this.http.post(
      `${this.apiUrl}/`,
      data
    );
  }

  modifierTache(
    id: number,
    data: any
  ) {

    return this.http.patch(
      `${this.apiUrl}/${id}/`,
      data
    );
  }

  supprimerTache(id: number) {

  return this.http.delete(
    `${this.apiUrl}/${id}/`
  );
}
}