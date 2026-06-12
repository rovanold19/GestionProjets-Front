import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnement } from '../../../environnements/environnement.developpement';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  apiUrl = `${environnement.apiUrl}/projets`;

  constructor(
    private http: HttpClient
  ) {}

  ajouterMembre(
    projetId: number,
    data: any
  ) {
    return this.http.post(
      `${this.apiUrl}/${projetId}/ajouter-membre/`,
      data
    );
  }

  enleverMembre(
    projetId: number,
    userId: number
  ) {
    return this.http.delete(
      `${this.apiUrl}/${projetId}/enlever-membre/${userId}/`
    );
  }

  getMembers(
    projetId: number
  ) {

  return this.http.get(
    `${this.apiUrl}/${projetId}/membres/`
  );

  }
}