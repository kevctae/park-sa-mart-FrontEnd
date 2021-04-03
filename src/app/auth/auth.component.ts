import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

enum Pages {
  landingPage,
  signIn,
  signUp,
  guest
}

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  page: Pages = Pages.landingPage;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  public get Pages() {
    return Pages; 
 }

  checkPage(page: number) {
    return true;
  }

  goToLandingPage() {
    this.page = Pages.landingPage;
  }

  goToSignIn() {
    this.page = Pages.signIn;
  }

  goToSignUp() {
    this.page = Pages.signUp;
  }

  goToGuest() {
    this.page = Pages.guest;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    switch (this.page) {
      case Pages.signIn:
        this.signIn(form.value.email, form.value.password);
        break;
      case Pages.signUp:
        this.signUp(form.value.email, form.value.password, form.value.fname, form.value.lname);
    }

    form.reset();
  }

  private signIn(email: string, password: string) {
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    authObs = this.authService.login(email, password);
    authObs.subscribe(
      resData => {
          this.isLoading = false;
          this.router.navigate(['/home']);
      },
      errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
      }
    );
  }

  private signUp(email: string, password: string, fname: string, lname: string) {
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    authObs = this.authService.signup(email, password, fname, lname);
    authObs.subscribe(
      resData => {
          this.isLoading = false;
          this.router.navigate(['/home']);
      },
      errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
      }
    );
  }
}
