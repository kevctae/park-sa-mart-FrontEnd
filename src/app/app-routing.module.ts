import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './core/components/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'event',
    component: NavbarComponent,
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
    data: {
      externalUrl: 'http://www.google.com'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  { 
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
