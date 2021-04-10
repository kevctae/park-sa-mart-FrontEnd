import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Account } from '../models/account.model'

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    account = new BehaviorSubject<Account | null>(null);

    constructor(private http: HttpClient) { }

    getAccount(email: string, token: string) {
        this.http.post<Account>(
            'http://localhost:5000/retrieveprofile',
            {
                email: email,
                token: token,
            }
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {
                console.log(resData.email);
                this.account.next(resData);
            })
        ).subscribe();
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        // if (!errorRes.error || !errorRes.error.error) {
        //     return throwError(errorMessage);
        // }
        switch (errorRes.error.message) {
            case 'INVALID_EMAIL':
                errorMessage = 'The email does not exist';
                break;
        }
        return throwError(errorMessage);
    }
}
