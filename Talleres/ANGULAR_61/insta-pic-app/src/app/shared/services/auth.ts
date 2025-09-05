import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginRespose, SignUpResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  login(user:User):LoginRespose{

        let userStr = localStorage.getItem(user.username);
        if(userStr && user.password === JSON.parse(userStr).password){
            return {success:true}; 
        }
        return {success:false, message:'Usuario o contraseña incorrectos'};

    }


    onSignUp(user:User):SignUpResponse{

        let userStr = localStorage.getItem(user.username!);
        if(userStr){
            return {success:false, message:'Ya existe el Usuario'}; 
        }
        localStorage.setItem(user.username!, JSON.stringify(user));
        return {success:true, redirectTo:'home'};

    }
  
}
