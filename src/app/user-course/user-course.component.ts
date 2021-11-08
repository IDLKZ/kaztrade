import { Component, OnInit } from '@angular/core';
import {ApiServiceService, Course} from "../api-service.service";
import {ToastrService} from "ngx-toastr";
import {RoutingEventService} from "../routing-event.service";

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.scss']
})
export class UserCourseComponent implements OnInit {

  current_page:number = 1;
  last_page:number = 1;
  courses?:Array<Course>

  constructor(private apiService:ApiServiceService, private toastr:ToastrService,private routingEvent:RoutingEventService) { }

  ngOnInit(): void {
    this.apiService.getUserCourses().subscribe(
      data=>{
        this.courses = data[0];
        this.current_page = data[1];
        this.last_page = data[2];
      },
      errors=>{
        this.toastr.error("Упс, что-то пошло не так");
        console.log(errors);
      }
    )
  }

  paginate(){
    this.current_page +=1;
    this.apiService.getUserCourses(this.current_page).subscribe(
      data=>{
        this.courses?.push(...data[0]);
        this.current_page = data[1];
        this.last_page = data[2];
      },
      errors=>{
        this.toastr.error("Упс, что-то пошло не так");
        console.log(errors);
      }
    )
  }

  navigate  = (alias:[string,any]) => {
    this.routingEvent.navigate(alias);
  }

}
