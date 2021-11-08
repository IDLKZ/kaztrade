import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService, Lesson, Quiz} from "../api-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  alias!:string|null;
  lesson!:Lesson;
  lessons!:Array<Lesson>;
  quizzes!:any;
  categoryLessons!:any;
  completedLesson:number = 0;
  isCompleted:boolean = false;


  constructor(private router: Router, private routingEvent:RoutingEventService,private apiService:ApiServiceService,private route: ActivatedRoute,private cdr: ChangeDetectorRef) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.alias = this.route.snapshot.paramMap.get('alias');
    this.apiService.getLesson(this.alias).subscribe(
      data=>{this.lesson = data[0];
        if(Object.keys(this.lesson).length == 0){this.router.navigateByUrl("/404")}
      this.lessons = data[1];
      this.quizzes = data[2];
        this.apiService.addLesson(data[0].id).subscribe(
          data=>{},
          error => {console.log(error)}
        );
        this.apiService.getCourseLesson(data[0].course.id).subscribe(
          data=>{this.categoryLessons = data;
              this.categoryLessons.map((item:any)=>{
                if(item.status == 1){
                  this.completedLesson++;
                }
                if(item.id == this.lesson.id){
                  if (item.status == 1){
                    this.isCompleted = true;
                  }
                }
              })

          },
          error => {}
        )

      },
      error=>{this.router.navigateByUrl("/404");}
    )


  }

  completed(){
    this.apiService.addLesson(this.lesson.id,1).subscribe();
    this.ngOnInit();
  }

  navigate  = (alias:[string,any]) => {
    this.routingEvent.navigate(alias);

  }

}
