import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent implements OnInit {

  attempts:any;

  constructor(private apiService:ApiServiceService) { }
  ngOnInit(): void {
    this.apiService.getUserQuiz().subscribe(
        data=>{this.attempts = Object.values(data);},
      error => {}
    )
  }

}
