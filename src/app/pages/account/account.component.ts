import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  account$: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeAccount();
  }

  initializeAccount() {
    this.account$ = this.account$ = this.accountService.account.subscribe(account => {
      this.account = account;
    })
  }

  signOut() {
    this.authService.logout();
  }

  routeEditCar() {
    this.router.navigate(['/account/edit-car'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }
  
}
