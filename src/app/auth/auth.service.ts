import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Auth } from './auth.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  email: string;
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<Auth | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, fname: string, lname: string) {
    return this.http.post<AuthResponseData>(
        'http://somchai09.trueddns.com:43322/register',
        {
            email: email,
            password: password,
            fname: fname,
            lname: lname,
        }
    ).pipe(
        catchError(this.handleError), 
        tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.token,
              +resData.expiresIn
            );
        })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://somchai09.trueddns.com:43322/login',
      {
        email: email,
        password: password,
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.token,
          +resData.expiresIn
        );
      })
    )
  }

  autoLogin() {
    const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (Object.keys(userData).length === 0) {
        return;
    }

    const loadedUser = new Auth(
        userData.email,
        userData._token,
        new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
        this.user.next(loadedUser);
        console.log(userData._tokenExpirationDate);
        const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }  

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(email: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000);
    const user = new Auth(
        email,
        token, 
        expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    // if (!errorRes.error || !errorRes.error.error) {
    //     return throwError(errorMessage);
    // }
    switch (errorRes.error.message) {
        case 'INVALID_EMAIL_OR_PASSWORD':
            errorMessage = 'Incorrect email or password';
            break;
    }
    return throwError(errorMessage);
  }
}
