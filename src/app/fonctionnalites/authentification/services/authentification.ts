import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'http://127.0.0.1:8000/api/authentification';

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