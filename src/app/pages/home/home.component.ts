import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  account$: Subscription = new Subscription;

  constructor(private accountService: AccountService) { }
  

  ngOnInit(): void {
    this.initializeAccount();
  }

  initializeAccount() {
    this.account$ = this.account$ = this.accountService.account.subscribe(account => {
      console.log(account?.email);
      this.account = account;
    })
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }
}
