import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing-module';

import { NotificationListComponent } from './notification-list/notification-list';


@NgModule({


  imports: [
    CommonModule,
    NotificationListComponent,
    NotificationsRoutingModule
  ]

})

export class NotificationsModule { }