import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {TokenJWTService} from "./token-jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
  userAuthState = this.userState.asObservable();


  constructor(public token:TokenJWTService) { }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
