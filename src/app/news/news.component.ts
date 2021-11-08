import { Component, OnInit } from '@angular/core';
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  data:any;
  current_page:number=1;
  last_page:number=1;
  constructor(private routingEvent:RoutingEventService,private apiService:ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getAllNews().subscribe(
      data => { this.data = data;this.current_page = data[3].current_page; this.last_page=data[3].last_page},
      error => console.log('oops', error));
  }

  navigate  = (alias:string) => {
    this.routingEvent.navigate(['news', alias]);
  }

  paginate(){
    this.current_page +=1;
    this.apiService.getAllNews(this.current_page).subscribe(
      data => { this.data[2].push(...data[2]);this.current_page = data[3].current_page; this.last_page=data[3].last_page},
      error => console.log('oops', error));
  }

}
