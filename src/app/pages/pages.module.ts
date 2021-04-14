import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { TopUpComponent } from './wallet/top-up/top-up.component';
<<<<<<< HEAD
import { AmountComponent } from './wallet/top-up/amount/amount.component';
=======
import { EditCarComponent } from './account/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
>>>>>>> main

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    WalletComponent,
    AccountComponent,
    TopUpComponent,
<<<<<<< HEAD
    AmountComponent
=======
    EditCarComponent,
    EditAccountComponent,
>>>>>>> main
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
  ],
})
export class PagesModule { }
