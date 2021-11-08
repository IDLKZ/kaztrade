import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService} from "../api-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizzes?:any;
  answers:any = {};
  info:any = {};

  constructor( private router: Router, private routingEvent:RoutingEventService,private apiService:ApiServiceService,private route: ActivatedRoute,public fb: FormBuilder,private toastr:ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.getQuiz(id).subscribe(
      data=>{
        this.quizzes = data;
        if(Object.keys(this.quizzes).length == 0){
          this.router.navigateByUrl("/404")
        }
      },
      error=>{console.log(error)},
    )
  }

  passExam(){
    if(Object.keys(this.answers).length == this.quizzes.quiz.questions.length){
      let all = {"info":this.info,"answers":this.answers};
      this.apiService.passExam(all).subscribe(
        data=>{
          this.toastr.success("Успешно пройден экзамен");
          this.router.navigateByUrl("/cabinet/my-quiz");
        },
        error=>{
          this.toastr.error("Упс. что-то пошло не так попробуйте позже")
        },
      )
    }
    else{
      this.toastr.warning("Пожалуйста, ответьте на все вопросы");
    }
  }
  toggleCheck(value:any){

    let result = 0;
    let right_answer = null;
    this.quizzes.quiz.questions.map((item:any)=>{
      if(item.id == value.id){
        if(item.answer == value.answer){
          result = 1;
        }
        right_answer = item.answer;
      }
    });
    this.info = {lesson_quiz:this.quizzes.id};
    this.answers[value.id] = {user_answer:value.answer,lesson_quiz:this.quizzes.id,question_id:value.id,
      right_answer:right_answer,right:result
    };


  }

}
