import { Injectable } from '@angular/core';
import {ApiServiceService} from "./api-service.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TokenJWTService {
  result?:boolean;
  constructor(private apiService:ApiServiceService,private Auth:AuthService,private router:Router) {}

  private urlAuth={
    login:this.apiService.apiUrl + "auth/login",
    register:this.apiService.apiUrl + "auth/register"
  }

   handleData(token:string){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken():boolean{
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      if(payload){
          this.Auth.profileUser().subscribe(data=>{},error => {
            this.Auth.logout();this.removeToken();this.router.navigateByUrl("login")
          })
          return Object.values(this.urlAuth).indexOf(payload.iss) > -1 ? true : false;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }

  payload(token:string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }


}
