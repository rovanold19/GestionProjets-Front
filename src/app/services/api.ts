import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../environnements/environnement';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = `${environnement.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

}