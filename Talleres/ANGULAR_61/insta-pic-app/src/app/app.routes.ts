import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { SignUp } from './features/pages/sign-up/sign-up';
import { Home } from './features/pages/home/home';

export const routes: Routes = [
    {
        path:"",
        component:Login
    },
    {
        path:"sign-up",
        component:SignUp
    },
    {
        path:"home",
        component:Home
    },
    {
        path:"**",
        redirectTo:""
    }
];
