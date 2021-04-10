import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Auth } from './auth.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/account.service';

export interface AuthResponseData {
  email: string;
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = new BehaviorSubject<Auth | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private accountService: AccountService
    ) { }

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

        this.accountService.getAccount(resData.email, resData.token)
            .subscribe(resAccData => {
                this.handleAuthentication(resData.email, resAccData.token, +resAccData.expiresIn)
        });
      })
    )
  }

  autoLogin() {
    const authData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('authData') || '{}');
    if (Object.keys(authData).length === 0) {
        return;
    }

    const loadedAuth = new Auth(
        authData.email,
        authData._token,
        new Date(authData._tokenExpirationDate)
    );

    if (loadedAuth.token) {
        this.accountService.getAccount(loadedAuth.email, loadedAuth.token)
            .subscribe(resData => {
                this.handleAuthentication(loadedAuth.email, resData.token, +resData.expiresIn)
        });

        this.auth.next(loadedAuth);
        const expirationDuration =
        new Date(authData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.auth.next(null);
    this.accountService.account.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('authData');
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
    const auth = new Auth(
        email,
        token, 
        expirationDate
    );
    this.auth.next(auth);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('authData', JSON.stringify(auth));
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
