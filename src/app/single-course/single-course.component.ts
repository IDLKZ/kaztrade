import { Component, OnInit } from '@angular/core';
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService, Course, News} from "../api-service.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {

  course:Course = {};
  user_courses!:any;
  lessons!:any;

  constructor( private router: Router, private routingEvent:RoutingEventService,private apiService:ApiServiceService,private route: ActivatedRoute,

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.apiService.getCourse(this.route.snapshot.paramMap.get('alias')).subscribe(
      data=>{this.course = data;
        this.apiService.getCourseLesson(data.id).subscribe(
          data=>{this.lessons = data;},
          error=>{console.log(error)},
        )
      },
           error=>{this.router.navigateByUrl("/404");}
    )
    this.apiService.getUserCourse().subscribe(
      data=>{this.user_courses = data;},
      error=>{console.log(error)},
    )

  }

  addCourse(){
    this.apiService.addCourse(this.course.id);
    this.ngOnInit();
  }



  navigate  = (alias:[string,any]) => {
    this.routingEvent.navigate(alias);
  }

}
