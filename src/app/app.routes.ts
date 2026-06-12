import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './fonctionnalites/authentification/login/login';
import { DashboardHome } from './fonctionnalites/dashboard/dashboard-home/dashboard-home';
import { ProjetsModule } from './fonctionnalites/projets/projets-module';
import { TachesModule } from './fonctionnalites/taches/taches-module';
import { NotificationsModule } from './fonctionnalites/notifications/notifications-module';
import { authGuard } from './guards/authentification-guard';
import { ModifierProjet } from './fonctionnalites/projets/pages/modifier-projet/modifier-projet';
import { Register } from './fonctionnalites/authentification/register/register';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./fonctionnalites/authentification/login/login')
      .then(m => m.LoginComponent)
  },

  {
    path: 'projets',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./fonctionnalites/projets/projets-module')
      .then(m => m.ProjetsModule)
  },
  {
    path: 'projets/modifier/:id',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./fonctionnalites/projets/projets-module')
      .then(m => m.ProjetsModule)
  },

  {
  path:'register',
  loadComponent: () =>
      import('./fonctionnalites/authentification/register/register')
      .then(m => m.Register)
  },

  {
    path: 'taches',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./fonctionnalites/taches/taches-module')
      .then(m => m.TachesModule)
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./fonctionnalites/dashboard/dashboard-module')
      .then(m => m.DashboardModule)
  },

  {
  path: 'notifications',

  canActivate: [authGuard],

  loadChildren: () =>
    import('./fonctionnalites/notifications/notifications-module')
    .then(m => m.NotificationsModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }