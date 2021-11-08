import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socials:any;
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getContacts().subscribe(
      data=>{this.socials = data},
      error=>{console.log(error)},
    )
  }

}
