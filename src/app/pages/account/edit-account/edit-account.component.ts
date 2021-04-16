import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from '../../../core/models/account.model'

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  account$: Subscription = new Subscription;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeAccount();
  }
  
  initializeAccount() {
    this.account$ = this.accountService.account.subscribe(account => {
      this.account = account;
    });
  }

  ngOnDestroy() {
    this.account$.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.value.npassword == '') {
      this.editProfile(
        form.value.email,
        form.value.password,
        form.value.password,
        form.value.fname,
        form.value.lname,
      )
    } else {
      this.editProfile(
        form.value.email,
        form.value.password,
        form.value.npassword,
        form.value.fname,
        form.value.lname,
      )
    }
   
  }
  
  private editProfile(email: string, old_password: string, password: string, fname: string, lname: string) {
    this.authService.editProfile(email, old_password, password, fname, lname)
      .subscribe(
      resData => {
        this.router.navigate(['/account'], { skipLocationChange: true });
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

}
