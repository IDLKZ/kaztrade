import { Component, OnInit } from '@angular/core';
import {RoutingEventService} from "../routing-event.service";
import {ApiServiceService, Course, CourseCategory, Language,Author} from "../api-service.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses:Array<Course> = [];
  languages:Array<Language> = [];
  categories:Array<CourseCategory> =[];
  search:string="";
  authors:Array<Author> = [];
  current_page:number = 1;
  last_page:number = 1;
  author_id?:number|null;
  languagesID:any[] = [];
  categoryID:any[] = [];
  categoryAll:boolean = true;
  languageAll:boolean = true;

  public  coursesData:any;
  public  languagesData:any;
  public  categoriesData:any;
  public  authorsData:any;

  constructor(private routingEvent:RoutingEventService,private apiService:ApiServiceService) { }

  ngOnInit(): void {
    forkJoin(
      {
        coursesData:this.apiService.getAllCourses(),
        languagesData:this.apiService.getLanguages(),
        categoriesData:this.apiService.getAllCategoryCourse(),
        authorsData:this.apiService.getAllAuthors()
      }
    ).subscribe(({coursesData,languagesData,categoriesData,authorsData})=>{
      this.courses = coursesData[0]; this.current_page = coursesData.current_page; this.last_page = coursesData.last_page;
      this.languages = languagesData;
      this.categories = categoriesData;
      this.authors = authorsData;

    })


    // this.apiService.getAllCourses().subscribe(
    //   data=>{
    //     this.courses = data[0];
    //     this.current_page = data[1].current_page;
    //     this.last_page = data[1].last_page},
    //   error => {console.log(error)}
    // )
    // this.apiService.getLanguages().subscribe(
    //   data=>{this.languages = data},
    //   error => {console.log(error)}
    // )
    // this.apiService.getAllCategoryCourse().subscribe(
    //   data=>{this.categories = data},
    //   error => {console.log(error)}
    // )
    // this.apiService.getAllAuthors().subscribe(
    //   data=>{this.authors = data;},
    //   error => {console.log(error)}
    // )
  }

  navigate  = (alias:[string,any]) => {
    this.routingEvent.navigate(alias);
  }


  loadCourse(){
    this.author_id = this.author_id != 0 ? this.author_id : null;
    let ct = this.categoryID.length != 0 ? this.categoryID : null;
    let lt  = this.languagesID.length != 0 ? this.languagesID : null;
    this.apiService.getAllCourses(
      this.author_id,ct,lt,this.current_page,this.search).subscribe(
      data=>{
        if(this.current_page == 1){
          this.courses = data[0];
        }
        else{
          this.courses.push(...data[0])
        }
        this.current_page = data[1].current_page;
        this.last_page = data[1].last_page},
      error => {console.log(error)}
    )
  }

  searchCourse(value:any){
    this.search = value;
    this.current_page = 1;
    this.loadCourse();
  }
  selectAuthor(value:any){
    if(value != 0){
      this.author_id = value;
    }
    else{
      this.author_id = null
    }
    this.current_page = 1;
    this.loadCourse();
  }

  selectCourse(id:any){
    if(id == 0){
      if(!this.categoryAll){
       this.categoryID = [];
      }
      this.categoryAll = !this.categoryAll;
    }
    else{
      if(this.categoryID.length == 0){
        this.categoryID.push(id);
        this.categoryAll = false;
      }
      else{
        if(this.categoryID.includes(id)){
          this.categoryID.splice(this.categoryID.indexOf(id),1);
        }
        else{
          this.categoryID.push(id);
          this.categoryAll = false;
        }

      }
    }
    this.current_page = 1;
    this.loadCourse();
  }

  selectLanguage(id:any){
    if(id == 0){
      if(!this.languageAll){
        this.languagesID = [];
      }
      this.languageAll = !this.languageAll;
    }
    else{
      if(this.languagesID.length == 0){
        this.languageAll = false;
        this.languagesID.push(id);
      }
      else{
        if(this.languagesID.includes(id)){
          this.languagesID.splice(this.languagesID.indexOf(id),1);
        }
        else{
          this.languageAll = false;
          this.languagesID.push(id);
        }

      }
    }
    this.current_page = 1;
    this.loadCourse();
  }

  paginate(){
    this.current_page +=1;
    this.loadCourse();
  }

}
