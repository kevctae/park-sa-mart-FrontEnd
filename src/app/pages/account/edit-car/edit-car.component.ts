import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeAccount() {
    this.router.navigate(['/account'], { skipLocationChange: true });
  }
}
