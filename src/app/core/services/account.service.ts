import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Account } from '../models/account.model'

export interface AccountResponseData {
  fname: string;
  lname: string;
  wallet?: number;
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
    private http: HttpClient,
  ) { }

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

  payNow(email: string | null, token: string | null, parking_id: number | undefined) {
    return this.http.post<{
      payment_datetime: string,
      amount: number,
      method: string,
      wallet: number,
    }>('http://somchai09.trueddns.com:43322/memberpaynow',
      {
        email: email,
        token: token,
        parking_id: parking_id,
      }
    ).pipe(catchError(this.handleError));
  }

  topUp(email: string | null, token: string | null, money_to_add: number | undefined) {
    return this.http.post<{
      email: string,
      wallet: number,
      token: string,
      expiresIn: string,
    }>('http://somchai09.trueddns.com:43322/topupwallet',
      {
        email: email,
        token: token,
        money_to_add: money_to_add,
      }
    ).pipe(catchError(this.handleError));
  }

  handleAccount(
    fname: string, 
    lname: string,
    email: string,
    wallet: number | undefined,
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
    //   return throwError(errorMessage);
    // }
    switch (errorRes.error.message) {
      case 'INVALID_EMAIL':
        errorMessage = 'The email does not exist';
        break;
      case 'PARKING_FEE_IS_PAID':
        errorMessage = 'The parking record with requested parking_id is already paid the usert';
        break;
      case 'WALLET_MONEY_NOT_SUFFICIENT':
        errorMessage = 'The amount of money in the user’s wallet is not sufficient for the parking fee';
        break;
      case 'MONEY_SHOULD_ONLY_CONTAIN_NUMBER':
        errorMessage = 'The money_to_add field in the request payload should contain only number';
        break;
    }
    return throwError(errorMessage);
  }
}
