import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TacheService {

  apiUrl =
  'http://127.0.0.1:8000/api/taches';

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