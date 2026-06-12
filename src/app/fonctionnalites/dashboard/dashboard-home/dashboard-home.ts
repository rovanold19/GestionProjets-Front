import { Component } from '@angular/core';
import { NavbarComponent } from '../../../layouts/navbar/navbar';
import { Sidebar } from "../../../layouts/sidebar/sidebar";

@Component({
  selector: 'app-dashboard-home',
  imports: [NavbarComponent, Sidebar],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {

}
