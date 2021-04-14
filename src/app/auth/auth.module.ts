import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        redirectTo: 'auth' 
      },
      {
        path: 'auth',
        component: AuthComponent,
      }
    ]),
    FormsModule,
  ]
})
export class AuthModule { }
