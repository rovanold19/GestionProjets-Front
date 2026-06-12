import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environnement } from '../../../environnements/environnement.developpement';


@Injectable({
  providedIn: 'root'
})

export class FichierService {

  apiUrl ='https://rovanold.pythonanywhere.com/api/files';

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