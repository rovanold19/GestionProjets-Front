import {
  Component,
  OnInit
} from '@angular/core';

import { NotificationService } from '../services/notification';
import { Sidebar } from "../../../layouts/sidebar/sidebar";
import { NavbarComponent } from "../../../layouts/navbar/navbar";


@Component({
  selector: 'app-notification-list',

  templateUrl:
  './notification-list.html',

  styleUrls: [
    './notification-list.css'
  ],
  imports: [Sidebar, NavbarComponent]
})

export class NotificationListComponent
implements OnInit {

  notifications: any[] = [];

  constructor(
    private notificationService:
    NotificationService
  ) { }

  ngOnInit(): void {

    this.loadNotifications();
  }

  loadNotifications() {

    this.notificationService
    .getNotifications()
    .subscribe({

      next: (response: any) => {

        this.notifications =
        response;
      },

      error: (error) => {

        console.log(error);
      }

    });
  }

  markAsRead(id: number) {

    this.notificationService
    .markAsRead(id)
    .subscribe({

      next: () => {

        this.loadNotifications();
      }

    });
  }
}