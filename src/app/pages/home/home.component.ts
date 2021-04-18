import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/core/models/account.model';
import { Session } from 'src/app/core/models/session.model';
import { Space } from 'src/app/core/models/space.model';
import { AccountService } from 'src/app/core/services/account.service';
import { StatusService } from 'src/app/core/services/status.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  account$: Subscription = new Subscription;
  session: Session | null = null;
  session$: Subscription = new Subscription;
  spaces: Space[] | null = null;
  space$: Subscription = new Subscription;
  counter: any | null = null;
  timerRef: any;

  constructor(
    private accountService: AccountService,
    private statusService: StatusService,
    private authService: AuthService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.initializeAccount();
    this.initializeStatus();
  }

  initializeAccount() {
    this.account$ = this.accountService.account.subscribe(account => {
      this.account = account;
    })
  }

  initializeStatus() {
    this.session$ = this.statusService.getCurrentParkingSession()
      .subscribe(session => {
        this.authService.handleAuthentication(session.email, session.token, +session.expiresIn);
        this.session = {
          parking_id: session.parking_id,
          entry_datetime: session.entry_datetime,
          building: session.building,
          floor: session.floor,
          parking_platenum: session.parking_platenum,
          parking_platecity: session.parking_platecity,
          entry_picture: session.entry_picture,
          brand: session.brand,
          model: session.model,
          parking_cost: session.parking_cost,
          payment_status: session.payment_status,
        };
        this.startTimer(new Date(session.entry_datetime));
      }, error => {
        this.statusService.getAvailableSpace().subscribe(spaces => {
          this.spaces = spaces;
        });
      })
  }

  startTimer(startDate: Date) {
    this.timerRef = setInterval(() => {
      
      this.counter = (new Date()).getTime() - startDate.getTime();
    }, 1000);
  }

  routePayNow() {
    this.router.navigate(['/home/pay-now'], {skipLocationChange: true});
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
    this.session$.unsubscribe();
    this.space$.unsubscribe();
    clearInterval(this.timerRef);
  }
}
