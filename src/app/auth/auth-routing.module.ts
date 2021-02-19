import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuestComponent } from "./guest/guest.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
    { 
        path: 'landing-page', 
        component: LandingPageComponent
    },
    { 
        path: 'login', 
        component: LandingPageComponent
    },
    { 
        path: 'sign-up', 
        component: SignUpComponent
    },
    { 
        path: 'guest', 
        component: GuestComponent
    },
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}