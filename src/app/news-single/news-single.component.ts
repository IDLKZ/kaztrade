import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService, News} from "../api-service.service";


@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit {

  constructor( private router: Router, private routingEvent:RoutingEventService,private apiService:ApiServiceService,private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

   singleNews!:any;
   news!:any;
   alias!:string|null;

  ngOnInit(): void {
    this.alias = this.route.snapshot.paramMap.get('alias');
    this.apiService.getSingleNews(this.alias).subscribe(
      data => {this.singleNews = data[0];
      if(Object.keys(this.singleNews).length == 0){this.router.navigateByUrl("/404")}
      this.news=data[1]},
      error => this.router.navigateByUrl("/404"));
  }

  navigate  = (alias:string) => {
    this.routingEvent.navigate(['news', alias]);
  }

}
