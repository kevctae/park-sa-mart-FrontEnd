import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: AuthComponent,
            }
        ]),
    ]
})
export class AuthModule {}