import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'new-announcement',
        pathMatch: 'full',
      },
      {
        path: 'new-announcement',
        loadComponent: () =>
          import('./pages/new-announcement/new-announcement').then((m) => m.NewAnnouncement),
      },
      {
        path: 'current-announcement',
        loadComponent: () =>
          import('./pages/current-announcement/current-announcement').then((m) => m.CurrentAnnouncement),
      },
      {
        path: 'announcement-log',
        loadComponent: () =>
          import('./pages/announcement-log/announcement-log').then((m) => m.AnnouncementLog),
      },
      {
        path: 'main',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
