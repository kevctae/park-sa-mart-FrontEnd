import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars = new BehaviorSubject<Car[] | null>(null);

  constructor(
      private http: HttpClient,
      private authService: AuthService,
  ) { }

  getCar() {
    if (!!this.authService.auth) {
      return this.http.post<Car[]>(
        'http://somchai09.trueddns.com:43322/returncarlist',
        {
            email: this.authService.auth.email,
            token: this.authService.auth.token,
        }
    ).pipe(
        catchError(this.handleError), 
        tap(resData => {
          this.cars.next(resData);
        })
    );
    } else {
      return new Observable<Car[]>();
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      // if (!errorRes.error || !errorRes.error.error) {
      //     return throwError(errorMessage);
      // }
      switch (errorRes.error.message) {
          case 'NO_CAR_OWNED':
              errorMessage = 'The email user owns no car';
              break;
          case 'CAR_OWNED': 
              errorMessage = 'The car is owned'
              break;
      }
      return throwError(errorMessage);
  }

  removeCar(car: Car) {
    if (!!this.authService.auth) {
      return this.http.post<{
        email: string,
        platenum: string,
        platecity: string,
        token: string,
        expiresIn: string,
      }>(
        'http://somchai09.trueddns.com:43322/removecar',
        {
          token: this.authService.auth.token,  
          email: this.authService.auth.email,
          platenum: car.platenum,
          platecity: car.platecity,
        }
    ).pipe(
        catchError(this.handleError)
    );
    } else {
      return throwError('Not authenticated');
    }
  }

  addCar(car: Car) {
    if (!!this.authService.auth) {
      return this.http.post<{
        email: string,
        token: string,
        expiresIn: string,
      }>(
        'http://somchai09.trueddns.com:43322/addcar',
        {
          token: this.authService.auth.token,  
          email: this.authService.auth.email,
          platenum: car.platenum,
          platecity: car.platecity,
          brand: car.brand,
          model: car.model,
        }
    ).pipe(
        catchError(this.handleError)
    );
    } else {
      return throwError('Not authenticated');
    }
  }
}
