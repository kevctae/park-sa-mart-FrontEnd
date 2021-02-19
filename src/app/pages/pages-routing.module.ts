import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "../core/components/navbar/navbar.component";
import { AccountComponent } from "./account/account.component";
import { HomeComponent } from "./home/home.component";
import { WalletComponent } from "./wallet/wallet.component";

const routes: Routes = [
    {
        path: '',
        component: NavbarComponent,
        children: [
            { 
                path: 'home', 
                component: HomeComponent
            },
            { 
                path: 'wallet', 
                component: WalletComponent
            },
            { 
                path: 'account', 
                component: AccountComponent
            },
        ]
    }
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}