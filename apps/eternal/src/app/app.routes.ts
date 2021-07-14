import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { UserLoaderGuard } from './core/user-loader.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [UserLoaderGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      { path: 'home', redirectTo: '' },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then((m) => m.SecurityModule)
      },
      {
        path: 'holidays',
        loadChildren: () => import('./holidays/holidays.module').then((m) => m.HolidaysModule)
      }
    ]
  }
];
