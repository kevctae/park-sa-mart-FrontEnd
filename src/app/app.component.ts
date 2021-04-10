import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'park-sa-mart-FrontEnd';
  
  constructor(
    private meta: Meta,
    @Inject(DOCUMENT) private dom: any,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.meta.addTags([
      { name: 'apple-mobile-web-app-title', content: 'PARK SA MART' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ], true);

    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'apple-touch-icon');
    this.dom.head.appendChild(link);
    link.setAttribute('href', '../assets/icons/PSM_Icon.png');

    this.authService.autoLogin();
  }
}
