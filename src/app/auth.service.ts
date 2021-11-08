import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiServiceService} from "./api-service.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,private apiService:ApiServiceService) { }



  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiService.apiUrl + 'auth/register', user);
  }

  // Login
  login(user: User): Observable<any> {
    return this.http.post<any>(this.apiService.apiUrl  + 'auth/login', user);
  }

  // Login
  logout(): Observable<any> {

    return this.http.post<any>(this.apiService.apiUrl  + 'auth/logout',{});
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.post(this.apiService.apiUrl + "auth/me",{});
  }
  getUser(): Observable<User> {
    return this.http.post<User>(this.apiService.apiUrl + "auth/me",{}).pipe(map(function (data:any) {
      return new User(data)
    }));
  }

}

// User interface
export class User {
  name!: String;
  email!: String;
  phone!: String;
  description!: String;
  image!:String;
  password!: String;
  password_confirmation!: String

  constructor(data:any) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.email;
    this.description = data.description;
    this.image =  ApiServiceService.getImage(data.image);
  }
}
