import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Auth } from "../../services/auth";

@Component({
    selector:'app-header',
    imports: [RouterLink],
    templateUrl:'./header.html',
    styleUrl:'./header.css'
})
export class Header{


    authService = inject(Auth);
    router = inject(Router);

    isLogged = this.authService.isLoged;

    onLogout(){
        this.authService.logout();
        this.router.navigateByUrl('');

    }



}