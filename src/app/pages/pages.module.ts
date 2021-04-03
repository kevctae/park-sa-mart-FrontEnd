import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { TopUpComponent } from './wallet/top-up/top-up.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    WalletComponent,
    AccountComponent,
    TopUpComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
