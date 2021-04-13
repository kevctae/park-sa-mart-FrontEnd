import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  cars: Car[] | null = null;
  cars$: Subscription | null = new Subscription;

  constructor(
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.initializeCar();
  }

  routeAccount() {
    this.router.navigate(['/account'], { skipLocationChange: true });
  }

  initializeCar() {
    this.carService.getCar();
    this.cars$ = this.carService.getCar().subscribe(cars => {
      this.cars = cars;
    })
  }
}
