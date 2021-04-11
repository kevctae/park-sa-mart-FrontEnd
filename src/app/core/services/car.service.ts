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
      }
      return throwError(errorMessage);
  }
}
