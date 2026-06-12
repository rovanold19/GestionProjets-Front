import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CommentaireService {

  apiUrl =
  'http://127.0.0.1:8000/api/commentaires';

  constructor(
    private http: HttpClient
  ) { }

  getCommentaires(tacheId: number) {

    return this.http.get(
      `${this.apiUrl}/tache/${tacheId}/`
    );
  }

  creerCommentaire(
    tacheId: number,
    data: any
  ) {

    return this.http.post(
      `${this.apiUrl}/tache/${tacheId}/`,
      data
    );
  }
}