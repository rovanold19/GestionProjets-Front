import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class FichierService {

  apiUrl =
  'http://127.0.0.1:8000/api/files';

  constructor(
    private http: HttpClient
  ) { }

  getFichiers(tacheId: number) {

    return this.http.get(
      `${this.apiUrl}/tache/${tacheId}/`
    );
  }

  televerseFichier(
    tacheId: number,
    formData: FormData
  ) {

    return this.http.post(
      `${this.apiUrl}/tache/${tacheId}/`,
      formData
    );
  }

  supprimerFichier(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}/`
    );
  }
}