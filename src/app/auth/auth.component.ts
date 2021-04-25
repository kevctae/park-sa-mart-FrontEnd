import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { DOCUMENT } from '@angular/common';

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
export class AuthComponent implements OnInit, AfterViewInit {
  page: Pages = Pages.landingPage;
  isLoading = false;
  error: string | null = null;
  closeResult = '';
  @ViewChild('content') el: ElementRef | undefined;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.el != undefined) {
      this.openModal(this.el);
    }
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
        this.router.navigate(['/home'], { skipLocationChange: true });
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
        this.router.navigate(['/home'], { skipLocationChange: true });
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goToUrl(): void {
    document.location.href = 'https://stackoverflow.com';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
