import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { SignUp } from './features/pages/sign-up/sign-up';
import { Home } from './features/pages/home/home';
import { Upload } from './features/pages/upload/upload';
import { authGuard } from './shared/guards/auth-guard';
import { Find } from './features/pages/find/find';
import { Profile } from './features/pages/profile/profile';

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
        component:Home,
        canActivate:[authGuard]
    },
    {
        path:"upload",
        component:Upload,
        canActivate:[authGuard]
    },
    {
        path:"find",
        component:Find,
        canActivate:[authGuard]
    },
    {
        path:"profile",
        component:Profile,
        canActivate:[authGuard]
    },
    {
        path:"**",
        redirectTo:""
    }
];
