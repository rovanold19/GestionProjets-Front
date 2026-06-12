import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnement } from '../../../environnements/environnement.developpement';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl =`${environnement.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  getStats() {
    return this.http.get(
      `${this.apiUrl}/stats/`
    );
  }
}