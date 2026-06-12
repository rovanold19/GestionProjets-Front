import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = 'https://rovanold.pythonanywhere.com/api';

  constructor(
    private http: HttpClient
  ) { }

}