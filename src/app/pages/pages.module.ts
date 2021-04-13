import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { EditCarComponent } from './account/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    WalletComponent,
    AccountComponent,
    EditCarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
  ],
})
export class PagesModule { }
