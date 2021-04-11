import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars = new BehaviorSubject<Car[] | null>(null);

  constructor(
      private http: HttpClient,) { }

  getCar(email: string, token: string) {
      return this.http.post<Car[]>(
          'http://somchai09.trueddns.com:43322/returncarlist',
          {
              email: email,
              token: token,
          }
      ).pipe(
          catchError(this.handleError), 
          tap(resData => {
            this.cars.next(resData);
          })
      );
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
