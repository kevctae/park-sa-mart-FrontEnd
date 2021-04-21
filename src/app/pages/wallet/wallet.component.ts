import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { PastSession, StatusService } from 'src/app/core/services/status.service';

@Component({
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  account: Account | null = null;
  account$: Subscription = new Subscription;
  pastSessions: PastSession[] | null = null;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private statusService: StatusService,
  ) { }
  

  ngOnInit(): void {
    this.initializeAccount();
    this.initializeRecent();
  }

  initializeAccount() {
    this.account$ = this.account$ = this.accountService.account.subscribe(account => {
      this.account = account;
    })
  }

  initializeRecent() {
    this.statusService.getRecentParkingSession().pipe(take(1))
      .subscribe(pastSessions => {
        this.pastSessions = pastSessions;
      });
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }

  routeTopUp() {
    this.router.navigate(['/wallet/top-up'],  { skipLocationChange: true });
  }

}
