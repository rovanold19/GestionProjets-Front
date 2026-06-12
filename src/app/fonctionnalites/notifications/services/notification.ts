import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  apiUrl =
  'https://rovanold.pythonanywhere.com/api/notifications';

  constructor(
    private http: HttpClient
  ) { }

  getNotifications() {

    return this.http.get(
      `${this.apiUrl}/`
    );
  }

  markAsRead(id: number) {

    return this.http.patch(
      `${this.apiUrl}/${id}/read/`,
      {}
    );
  }
}