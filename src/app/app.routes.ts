import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'tasks',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tasks/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'users',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/users/user.module').then((m) => m.UserModule),
  },
];
