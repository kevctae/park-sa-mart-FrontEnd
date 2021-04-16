import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeHome() {
    this.router.navigate(['/home'], { skipLocationChange: true });
  }
  
  routeWallet() {
    this.router.navigate(['/wallet'], { skipLocationChange: true });
  }

  routeAccount() {
    this.router.navigate(['/account'], { skipLocationChange: true });
  }
}
