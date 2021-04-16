import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  initializeAccount() {
    this.account$ =  this.accountService.account.subscribe(account => {
      this.account = account;
    })
  }

  initializeCar() {
    this.cars$ = this.carService.getCar().subscribe(cars => {
      this.cars = cars;
    }, () => {
      this.cars = [{
        platecity: '',
        platenum: '',
        brand: '',
        model: ''
      }]
    });
  }

  signOut() {
    this.authService.logout();
  }

  routeEditCar() {
    this.router.navigate(['/account/edit-car'], { skipLocationChange: true });
  }

  routeEditAccount() {
    this.router.navigate(['/account/edit-account'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }
  
}
