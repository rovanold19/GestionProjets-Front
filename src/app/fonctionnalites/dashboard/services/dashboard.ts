import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnement } from '../../../environnements/environnement.developpement';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl ='https://rovanold.pythonanywhere.com/api/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getStats() {
    return this.http.get(
      `${this.apiUrl}/stats/`
    );
  }
}