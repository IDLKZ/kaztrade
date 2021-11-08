import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingEventService {

  constructor(private router: Router) { }


   navigate  = (alias:[string,string]) => {
    this.router.navigate([alias[0], alias[1]]);
  }
}
