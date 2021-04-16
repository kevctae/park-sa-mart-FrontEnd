import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from '../../../core/models/account.model'

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  account$: Subscription = new Subscription;

  constructor(
    private router: Router,
    private accontService: AccountService,
  ) { }

  ngOnInit(): void {
    this.initializeAccount();
  }

  initializeAccount() {
    this.account$ = this.accontService.account.subscribe(account => {
      this.account = account;
    });
  }

  routeWallet() {
    this.router.navigate(['/wallet'], {skipLocationChange: true});
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }

}