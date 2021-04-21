import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from '../../../../core/models/account.model'

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  amount: number = 0;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  setAmount(amount: number) {
    this.amount = amount
  }
  
  topUp() {
    if (this.amount == 0) {
      return;
    }
    if (!!this.authService.auth) {
      return this.accountService.topUp(
        this.authService.auth.email, 
        this.authService.auth.token, 
        this.amount,
      ).subscribe(data => {
        this.authService.handleAuthentication(data.email, data.token, +data.expiresIn);
        this.accountService.account.pipe(take(1)).subscribe(account => {
          if (!!account) {
            this.accountService.handleAccount(
              account.fname, 
              account.lname, 
              account.email, 
              data.wallet, 
              account.primary_card_no, 
              account.main_payment_method);
          }
        });
        this.router.navigate(['/wallet/top-up'], {skipLocationChange: true});
      })
    } else {
      return throwError('Not authenticated');
    }
  }

  routeTopUp() {
    this.router.navigate(['/wallet/top-up'], {skipLocationChange: true});
  }

}
