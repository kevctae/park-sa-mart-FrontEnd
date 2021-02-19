import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GuestComponent } from './guest/guest.component';

@NgModule({
    declarations: [
        LandingPageComponent,
        LogInComponent,
        SignUpComponent,
        GuestComponent,
    ],
    imports: [
        AuthRoutingModule,
    ]
})
export class AuthModule {}