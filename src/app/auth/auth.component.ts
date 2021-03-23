import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.page == Pages.landingPage);
  }

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
}
