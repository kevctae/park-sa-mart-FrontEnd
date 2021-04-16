import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Car } from '../models/car.model';
import { Space } from '../models/space.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  getCurrentParkingSession() {
    if (!!this.authService.auth) {
      return this.http.post<{
        email: string,
        token: string,
        expiresIn: string,
        parking_id: string,
        entry_datetime: string,
        building: string,
        floor: string,
        parking_platenum: string,
        parking_platecity: string,
        entry_picture: string,
        brand: string,
        model: string,
        parking_cost: string,
        payment_status: boolean,
      }>(
        'http://somchai09.trueddns.com:43322/currentparkingsession',
        {
            email: this.authService.auth.email,
            token: this.authService.auth.token,
        }
    ).pipe(
        catchError(this.handleError),
    );
    } else {
      return throwError('Not authenticated');
    }
  }

  getAvailableSpace() {
    return this.http.get<Space[]>(
      'http://somchai09.trueddns.com:43322/getavailableparkingspace',
    ).pipe(
      catchError(this.handleError),
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // if (!errorRes.error || !errorRes.error.error) {
    //     return throwError(errorMessage);
    // }
    switch (errorRes.error.message) {
        case 'NO_CURRENT_PARKING_SESSION_FOUND':
            errorMessage = 'no current parking session is found ';
            break;
    }
    return throwError(errorMessage);
  }
}
