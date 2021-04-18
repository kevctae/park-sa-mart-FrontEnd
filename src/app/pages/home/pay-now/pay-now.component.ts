import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/core/models/session.model';
import { AccountService } from 'src/app/core/services/account.service';
import { StatusService } from 'src/app/core/services/status.service';
import { Account } from 'src/app/core/models/account.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styleUrls: ['./pay-now.component.scss']
})
export class PayNowComponent implements OnInit {
  account: Account | null = null;
  account$: Subscription = new Subscription;
  session: Session | null = null;
  session$: Subscription = new Subscription;
  counter: any | null = null;
  timerRef: any;
  currentTime: number | undefined;
  timeDiff: number | undefined;

  constructor(
    private accountService: AccountService,
    private statusService: StatusService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeAccount();
    this.initializeStatus();
    this.currentTime = Date.now();
    
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
        this.timeDiff = Date.now() - new Date(session.entry_datetime).getTime();
      });
  }

  startTimer(startDate: Date) {
    this.timerRef = setInterval(() => {
      
      this.counter = (new Date()).getTime() - startDate.getTime();
    }, 1000);
  }
  
  payFee() {
    
  }

  routeHome() {
    this.router.navigate(['/home'], {skipLocationChange: true});
  }

}
