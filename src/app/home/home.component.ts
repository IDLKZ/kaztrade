import { Component, OnInit } from '@angular/core';
import {ApiServiceService, Project, Slider} from "../api-service.service";
import {TranslocoService} from "@ngneat/transloco";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    data: Observable<any> | undefined;
   slider:any;
   project:any;
   courses:any;
   news:any;
   socials:any;
   address:any;
   phones:any;
   emails:any;
   course_count:any;
   lesson_count:any;
   user_count:any;
   errors!:Array<String>;
   company?:any;
   stats:any;
  postbox: FormGroup = new FormGroup({
    name:new FormControl("",Validators.required),
    email:new FormControl("",[Validators.required,Validators.email]),
    phone:new FormControl("",[Validators.required]),
    message:new FormControl("",),
  });
  constructor(public http:HttpClient,private apiService:ApiServiceService, private translocoService:TranslocoService, private toastr:ToastrService) {
  }


    ngOnInit() {
    this.data = this.apiService.getFrontend().pipe(shareReplay(1));
    this.data.subscribe(
      data=>{
            this.slider = data["slider"];
            this.project = data["project"];
            this.courses = data["courses"];
            this.news = data["news"];
            this.company = data["company"];
            this.socials = data["socials"];
            this.emails = data["emails"];
            this.address = data["address"];
            this.phones = data["phones"];
            this.user_count = data["users_count"];
            this.lesson_count = data["lesson_count"];
            this.course_count = data["course_count"];
          },
          errors=>{console.log(errors)},
    );
    // this.apiService.getFrontend().subscribe(
    //   data=>{
    //     this.slider = data["slider"];
    //     this.project = data["project"];
    //     this.courses = data["courses"];
    //     this.news = data["news"];
    //     this.company = data["company"];
    //     this.socials = data["socials"];
    //     this.emails = data["emails"];
    //     this.address = data["address"];
    //     this.phones = data["phones"];
    //     this.user_count = data["users_count"];
    //     this.lesson_count = data["lesson_count"];
    //     this.course_count = data["course_count"];
    //   },
    //   errors=>{console.log(errors)},
    // )



    }

    sendEmail(){
      if(this.postbox.valid){
        this.apiService.sendEmail(this.postbox.getRawValue()).subscribe(
          data=>{this.postbox.reset();this.toastr.success("Ваше сообщение успешно отправлено!")},
          error => {console.log(error)}
        )
      }



    }


}
