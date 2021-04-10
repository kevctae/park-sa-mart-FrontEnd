import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from '../models/account.model'

export interface AccountResponseData {
    fname: string;
    lname: string;
    wallet?: string;
    primary_card_no?: string;
    main_payment_method?: string;
    token: string;
    expiresIn: string;
  }

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    account = new BehaviorSubject<Account | null>(null);

    constructor(
        private http: HttpClient,) { }

    getAccount(email: string, token: string) {
        return this.http.post<AccountResponseData>(
            'http://somchai09.trueddns.com:43322/retrieveprofile',
            {
                email: email,
                token: token,
            }
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleAccount(
                    resData.fname,
                    resData.lname,
                    email,
                    resData.wallet,
                    resData.primary_card_no,
                    resData.main_payment_method
                );
            })
        );
    }

    private handleAccount(
        fname: string, 
        lname: string,
        email: string,
        wallet: string | undefined,
        primary_card_no: string | undefined,
        main_payment_method: string | undefined) {
        const new_account: Account = {
            fname: fname,
            lname: lname,
            email: email,
            wallet: wallet,
            primary_card_no: primary_card_no,
            main_payment_method: main_payment_method,
        }

        this.account.next(new_account);
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
