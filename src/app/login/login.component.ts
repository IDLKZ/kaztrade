import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, User} from "../auth.service";
import {AuthStateService} from "../auth-state.service";
import {TokenJWTService} from "../token-jwt.service";
import {Route, Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm =  new FormGroup(
    {
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.min(6)])
    }
  )

  constructor(public AuthService:AuthService,public AuthState:AuthStateService,public jwtToken:TokenJWTService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

  }

  submit(){
    if(this.loginForm.valid){
      let data = this.loginForm.getRawValue();
      this.AuthService.login(data).subscribe(
        data=>{
          this.jwtToken.handleData(data["access_token"]);
        },
        error => {
          this.toastr.error('Неправильная почта или пароль!', 'Упс');
        },
        () => {
          this.AuthState.setAuthState(true);
          this.loginForm.reset()
          this.router.navigate(['cabinet']);
        }
      )
    }

  }



}
