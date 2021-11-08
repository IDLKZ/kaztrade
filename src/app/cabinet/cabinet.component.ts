import { Component, OnInit } from '@angular/core';
import {AuthService, User} from "../auth.service";
import {AuthStateService} from "../auth-state.service";
import {TokenJWTService} from "../token-jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  user!:User;


  constructor(private authService:AuthService,private authState:AuthStateService,private jwtToken:TokenJWTService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      data=>{this.user = data;},
      error => {this.logout()}
    )


  }

  logout(){
    this.authService.logout();
    this.authState.setAuthState(false);
    this.jwtToken.removeToken();
    this.router.navigate(["login"]);
  }

}
