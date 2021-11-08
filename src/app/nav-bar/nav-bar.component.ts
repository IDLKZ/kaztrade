import { Component, OnInit } from '@angular/core';
import {AuthStateService} from "../auth-state.service";
import {TokenJWTService} from "../token-jwt.service";
import {AuthService} from "../auth.service";
import {Route, Router} from "@angular/router";
import {TranslocoService} from "@ngneat/transloco";
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn?:boolean;
  user:any;
  languages:any;
  language:any;
  socials:any;

  constructor(private tokenService: TokenJWTService,private AuthService : AuthService,private router:Router,private translocoService:TranslocoService,private apiService:ApiServiceService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    this.language = this.translocoService.getActiveLang();
    this.languages = this.translocoService.getAvailableLangs();
    this.apiService.getContacts().subscribe(
      data=>{this.socials = data;},
      error => {console.log(error)}
    )
  }

  setActiveLanguage(lang:string){
    localStorage.setItem("lang",lang);
    this.translocoService.setActiveLang(lang);
    this.translocoService.setDefaultLang(lang);
    this.language = lang;
    location.reload();

  }







}
