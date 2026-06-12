import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../environnements/environnement.developpement';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'https://rovanold.pythonanywhere.com/api/authentification';

  constructor(
    private http: HttpClient
  ) { }

  login(data: any) {

    return this.http.post(
      `${this.apiUrl}/login/`,
      data
    );
  }

  register(data: any) {

    return this.http.post(
      `${this.apiUrl}/register/`,
      data
    );
  }

  isAuthenticated(): boolean {

  return !!localStorage.getItem(
    'access'
  );
}


  logout() {

  localStorage.removeItem('access');

  localStorage.removeItem('refresh');
}
}