import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  apiUrl = 'http://127.0.0.1:8000/api/projets';

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