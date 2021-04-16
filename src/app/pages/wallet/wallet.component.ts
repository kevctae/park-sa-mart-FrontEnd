import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  account: Account | null = null;
  account$: Subscription = new Subscription;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.initializeAccount();
  }

  initializeAccount() {
    this.account$ = this.account$ = this.accountService.account.subscribe(account => {
      this.account = account;
    })
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }

  routeTopUp() {
    this.router.navigate(['/wallet/top-up'],  { skipLocationChange: true });
  }

}
