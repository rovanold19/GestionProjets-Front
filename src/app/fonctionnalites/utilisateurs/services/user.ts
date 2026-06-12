import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl =
  'https://rovanold.pythonanywhere.com/api/utilisateurs';

  constructor(
    private http: HttpClient
  ) {}

  getUsers() {

    return this.http.get(
      `${this.apiUrl}/liste/`
    );
  }

  inscription(data:any){

    return this.http.post(
      `${this.apiUrl}/inscription/`,
      data
    );

  }

}