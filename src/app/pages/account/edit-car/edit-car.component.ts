import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';

interface province {
  PROVINCE_ID: number,
  PROVINCE_CODE: string,
  PROVINCE_NAME: string,
  GEO_ID: number,
}

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  cars: Car[] | null = null;
  cars$: Subscription | null = new Subscription;
  provinces: province[] | null = null;

  constructor(
    private router: Router,
    private carService: CarService,
    private authService: AuthService,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {
    this.initializeCar();
    this.initializeProvince();
  }

  routeAccount() {
    this.router.navigate(['/account'], { skipLocationChange: true });
  }

  initializeCar() {
    this.carService.getCar();
    this.cars$ = this.carService.getCar().subscribe(cars => {
      this.cars = cars;
    }, () => {
      this.cars = [{
        platecity: '',
        platenum: '',
        brand: '',
        model: ''
      }]
    })
  }

  initializeProvince() {
    this.http.get('./assets/jsons/provinces.json').subscribe(
      data => {
        this.provinces = data as province[];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  removeCar(car: Car) {
    this.carService.removeCar(car).subscribe(data => {
      this.authService.handleAuthentication(data.email, data.token, +data.expiresIn)
      this.router.navigate(['/account'], { skipLocationChange: true });
    })

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const car: Car = {
      platecity: form.value.platecity,
      platenum: form.value.platenum,
      brand: form.value.brand,
      model: form.value.model,
    }
    this.carService.addCar(car).subscribe(data => {
      this.authService.handleAuthentication(data.email, data.token, +data.expiresIn)
      this.router.navigate(['/account'], { skipLocationChange: true });
    })
  }
}
