import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";
import {map, catchError, shareReplay} from 'rxjs/operators';
import getVideoId from 'get-video-id';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //
  static languageService:any;

  // apiUrl:string="https://jitsi.idl.kz/api/";
  // static apiImage:string="https://jitsi.idl.kz/uploads/";
  // static downloadUrl:string = "https://jitsi.idl.kz/download/";
  //
  // apiUrl:string="http://kaztrade.backend/api/";
  // static apiImage:string="http://kaztrade.backend/uploads/";
  // static downloadUrl:string = "http://kaztrade.backend/download/";

  apiUrl:string="http://sub.qaztradeacademy.kz/api/";
   static apiImage:string="http://sub.qaztradeacademy.kz/uploads/";
  static downloadUrl:string = "http://sub.qaztradeacademy.kz/download/";

  constructor(private http: HttpClient,private  translocoService:TranslocoService) {
    ApiServiceService.languageService = translocoService;
  }

  getSlider():Observable<Slider|null>{
    return this.http.get<Slider|null>(this.apiUrl + "sliders").pipe(map((response:any) =>
       Object.keys(response).length > 0 ? new Slider(response) : null

    ));
  }

  getFrontend(){
    return   this.http.get(this.apiUrl + "frontend").pipe(
      map((data:any)=>{
        data["slider"] = new Slider(data["slider"]);

        data["project"] = new Project(data["project"]);
        data["company"] = new Project(data["company"]);
       data['courses'] = data["courses"].map(function (course: any): Course {
          return new Course(course);
        });
        data['news'] = data["news"].map(function (news: any): News {
          return new News(news);
        });
          data["address"] = data["address"].map((address:any)=>{return new Address(address)});
          data["phones"] = data["phones"].map((phone:any)=>{return new Phone(phone)});
          return data;
      }), shareReplay(100)
    );
  }

  getProject():Observable<Project|null>{
    return this.http.get<Project|null>(this.apiUrl + "projects").pipe(map((response:any) =>
      Object.keys(response).length > 0 ? new Project(response) : null

    ));
  }

  getCompany(){
    return this.http.get(this.apiUrl + "company").pipe(map((response:any) =>
      Object.keys(response).length > 0 ? new Project(response) : null
    ));
  }

  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl + "courses").pipe(map((data: any) => {
      return data.map(function (course: any): Course {
        return new Course(course);
      });
    }));
  }

  getNews():Observable<News[]>{
    return this.http.get<Course[]>(this.apiUrl + "news").pipe(map((data: any) => {
      return data.map(function (news: any): News {
        return new News(news);
      });
    }));
  }

  getAllNews(page:number = 1):Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http.get<any>(this.apiUrl + "all-news",{params: params}).pipe(map((data: any) => {
      let hotNews = data[0];
      let newestNews = data[1];
      let allNews = data[2].data;
      let settings = {current_page:data[2].current_page, last_page:data[2].last_page};
         hotNews = new News(hotNews);
      let arrNews = newestNews.map((item:any)=>new News(item));
      let allNewsArr = allNews.map((item:any)=>new News(item));
         return [hotNews,arrNews,allNewsArr,settings];
    }), shareReplay(1000));
  }

  getSingleNews(alias:string|null):Observable<any>{
    return this.http.get<any>(this.apiUrl + "single-news/"+alias).pipe(map((data: any) => {
      let hotNews = data[0];
      let newestNews = data[1];
      hotNews = new News(hotNews);
      let arrNews = newestNews.map((item:any)=>new News(item));
      return [hotNews,arrNews];
    }),shareReplay(1000));
  }

  getSingleCourse(alias:string|null):Observable<any>{
    return this.http.get<any>(this.apiUrl + "single-course/"+alias).pipe(map((data: any) => {
      let course = data.map((item:any)=>new Course(item));
      return course;
    }));
  }


  getAllCourses(author_id:any = [],category_id:any = null,language_id:any = null,page:number=1,search:string="" ):Observable<any>{
    let params = new HttpParams();
    let allCourses = [];
    let current_page = 1;
    let last_page = 1;

    params = params.append("page",page);
    params = params.append("search",search);
    if(author_id){params = params.append("author_id",author_id);}
    if(category_id){params = params.append("category_id",category_id);}
    if(language_id){params = params.append("language_id",language_id);}
    return this.http.get<any>(this.apiUrl + "allCourses",{params: params}).pipe(map((data: any) => {
      current_page = data.current_page;
      last_page = data.last_page;
      let courses = data.data;
      allCourses = courses.map((item:any)=>new Course(item));
      return [allCourses,{"current_page":current_page,"last_page":last_page}];
    }),shareReplay(1000));
  }

  getCourse(alias:any){
    return this.http.get<any>(this.apiUrl + "single-course/" + alias).pipe(map((data: any) => {
      return new Course(data);
    }),shareReplay(1000));
  }

  getLesson(alias:any){
    return this.http.get<any>(this.apiUrl + "single-lesson/" + alias).pipe(map((data: any) => {
      let lesson = new Lesson(data[0]);
      let lessons = data[1].map((item:any)=>{return new Lesson(item)})
      data[2].map((item:any)=>{item.quiz = new Quiz(item.quiz)});
      return [lesson,lessons,data[2]];
    }),shareReplay(1000));
  }

  getQuiz(id:any){
    return this.http.get<any>(this.apiUrl + "getQuiz/" + id).pipe(map((data: any) => {
      let quizzes = data;
      quizzes.lesson = new Lesson(quizzes.lesson);
      return quizzes;
    }));
  }

  getUserQuiz(){
    return this.http.get<any>(this.apiUrl + "auth/quizzes").pipe(
       map((item:any)=>{
        for(let obj in item){
          item[obj].map((iObj:any)=>{
            iObj.lesson_quiz.quiz = new Quiz(iObj.lesson_quiz.quiz);
            iObj.lesson_quiz.lesson = new Lesson(iObj.lesson_quiz.lesson);
          })
        }
        return item;
      })

    )
  }

  addLesson(lesson_id:any,status:number = 0){
    return this.http.post(this.apiUrl + "auth/addLessons",{"lesson_id":lesson_id,"status":status});
  }


  getUserCourses(page:number = 1){
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http.get(this.apiUrl + "auth/userCourse",{params: params}).pipe(
      map((data:any) =>{
        let course = data.data.map((item:any)=>{
          return new Course(item);
        })
        return [course,data.current_page,data.last_page]
    })


    )
  }

  getAllCategoryCourse():Observable<any>{
    let courseCategory = [];
    return this.http.get<any>(this.apiUrl + "course-category").pipe(map((data: any) => {
      courseCategory = data.map(function (course: any): CourseCategory {
        return new CourseCategory(course);
      });
      return courseCategory;
    }));
  }

  getAllAuthors():Observable<any>{
    let authors = [];
    return this.http.get<any>(this.apiUrl + "author").pipe(map((data: any) => {
      authors = data.map(function (author: any): Author {
        return new Author(author);
      });
      return authors;
    }));
  }

  getLanguages():Observable<any>{
    let languages = [];
    return this.http.get<any>(this.apiUrl + "language").pipe(map((data: any) => {
      languages = data.map(function (language: any): Author {
        return new Language(language);
      });
      return languages
    }));
  }


  getUserCourse(){
    return this.http.get(this.apiUrl + "auth/myCourses");
  }

  addCourse(course_id:any){
     this.http.post(this.apiUrl + "auth/addCourse",{"course_id":course_id}).subscribe();
  }

  getCourseLesson(course_id:any){
    return this.http.post(this.apiUrl + "auth/userLessons",{"course_id":course_id});
  }

  sendEmail(data:object){
    return this.http.post(this.apiUrl + "send-email", data);
  }

  passExam(data:object){
    return this.http.post(this.apiUrl + "pass-exam", data);
  }

  chageProfile(data:any){
    return this.http.post(this.apiUrl + "auth/changeProfile",data)
  }

  register(data:any){
    return this.http.post(this.apiUrl + "register",data)
  }

  getContacts(){
    return this.http.get(this.apiUrl + "socials").pipe(map((data:any)=>{
      data[1] = data[1].map((address:any)=>{return new Address(address)});
      data[3] = data[3].map((phone:any)=>{return new Phone(phone)});

      return data;
    }));
  }

  getStats(){
    return this.http.get(this.apiUrl + "stats");
  }



  static getImage(image:string|null){
    if(image == null){
      return "https://images.squarespace-cdn.com/content/v1/52d62550e4b09a1f1b0861f1/1601589219654-9WEKGL2A5A2OO8X0PART/curriculum.png"
    }
    return this.apiImage + image;
  }
  static getTranslation(data:any,string:string){
      let no_translation = "";
      this.languageService.selectTranslate("no_translation").subscribe((value:string) => no_translation = value);
      let lang = this.languageService.getActiveLang();
      if(data[string + lang]){
        return data[string + lang]
      }
      else{
        return no_translation;
      }
  }
}


export  class Slider{
  id!:string;
  title!:string;
  subtitle!:string;
  button!:string;
  links!:string;
  image!:string;

  constructor(data:any) {
      this.id = data.id;
      this.title = ApiServiceService.getTranslation(data,"title_")
      this.subtitle = ApiServiceService.getTranslation(data,"subtitle_")
      this.button = ApiServiceService.getTranslation(data,"button_")
      this.image = ApiServiceService.getImage(data.image);
      this.links = data.links;
  }
}

export class Project{
  title?:string;
  description?:string;
  constructor(data:any) {
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.description = ApiServiceService.getTranslation(data,"description_");
  }
}

export class Course{
  id?:string;
  author?:Author;
  category?:CourseCategory;
  language?:Language;
  image?:string;
  links?:string;
  alias?:string;
  title?:string;
  subtitle?:string;
  description?:string;
  requirements?:string;
  advantages?:string;
  created_at?:string;
  lessons?:Array<Lesson>;
  lessons_count?:number|null;
  user_count?:number|null;
  constructor(data:any,isMain:boolean = true) {
    this.id = data.id;
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.subtitle = ApiServiceService.getTranslation(data,"subtitle_");
    this.description = ApiServiceService.getTranslation(data,"description_");
    this.requirements = ApiServiceService.getTranslation(data,"requirements_");
    this.advantages = ApiServiceService.getTranslation(data,"advantages_");
    this.image = ApiServiceService.getImage(data.image);
    this.links = data.links;
    this.alias = data.alias;
    this.created_at = data.created_at;
    if(isMain){
      this.lessons = data.lessons.map((item:any)=>{return new Lesson(item)});
      this.author = new Author(data.user);
      this.category = new CourseCategory(data.course_category);
      this.language = new Language(data.language);
      this.lessons_count = data.lessons_count;
      this.user_count = data.users_courses_count;
    }

  }
}


export class Author{
  id?:string;
  title?:string;
  description?:string;
  image?:string;

  constructor(data:any) {
    this.id = data["id"];
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.description = ApiServiceService.getTranslation(data,"description_");
    this.image = ApiServiceService.getImage(data.image);
  }
}

export class CourseCategory{
  id?:string;
  title?:string;
  image?:string;
  constructor(data:any) {
    this.id = data["id"];
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.image = ApiServiceService.getImage(data.image);
  }
}

export class Language{
  id?:string;
  title?:string;
  constructor(data:any) {
    this.id = data.id;
    this.title = data.title
  }
}


export class NewsCategory{
  id?:string;
  title?:string;
  image?:string;
  alias?:string;
  constructor(data:any) {
    this.id = data["id"];
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.image = ApiServiceService.getImage(data.image);
    this.alias = data["alias"];
  }

}


export class News{
  id?:string;
  author?:{};
  category?:{};
  title?:string;
  subtitle?:string;
  description?:string;
  alias?:string;
  image?:string;
  thumbnail?:string;
  created_at?:string;

  constructor(data:any) {
    this.id = data["id"];
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.subtitle = ApiServiceService.getTranslation(data,"subtitle_");
    this.description = ApiServiceService.getTranslation(data,"description_");
    this.alias = data["alias"];
    this.image = ApiServiceService.getImage(data.image);
    this.thumbnail = ApiServiceService.getImage(data.thumbnail);
    this.author = new Author(data.user);
    this.category = new NewsCategory(data.news_category);
    this.created_at = data["created_at"];
  }
}

export class Lesson{
  id?:string;
  course?:Course
  materials?:Array<Material>
  quizzes?:Array<Quiz>
  image?:string;
  links?:string;
  videoId?: {id:any,service:any};
  alias?:string;
  title?:string;
  subtitle?:string;
  description?:string;
  number?:string;
  created_at?:string;
  constructor(data:any) {
    this.id = data.id;
    data.course ? this.course = new Course(data.course,false) : null;
    data.materials ? this.materials = data.materials.map((item:any) => {return new Material(item)}):null;
    data.quizzes ? this.quizzes = data.quizzes.map((item:any) => {return new Quiz(item)}) :null;
    this.image = ApiServiceService.getImage(data.image);
    this.links = data.links;
    this.videoId = getVideoId(data.links);
    this.alias = data.alias;
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.subtitle = ApiServiceService.getTranslation(data,"subtitle_");
    this.description = ApiServiceService.getTranslation(data,"description_");
    this.number = data.number;
    this.created_at = data.created_at;

  }

}

export class Material{

  id?:string;
  title?:string;
  file?:string;

  constructor(data:any) {
    this.id = data.id;
    this.title =  ApiServiceService.getTranslation(data,"title_");
    this.file = ApiServiceService.downloadUrl + data.file;
  }

}


export class Quiz{
  id?:string;
  title?:string;
  questions?:Array<Question>;
  constructor(data:any) {
    this.id = data.id;
    this.title =  ApiServiceService.getTranslation(data,"title_");
    if(data.questions){
      this.questions = data.questions.map((item:any)=>{
        return new Question(item);
      });
    }
  }
}

export class Question{
  id?:string;
  quiz_id?:string;
  question_ru?:string;
  question_kz?:string;
  question_en?:string;
  A?:string;
  B?:string;
  C?:string;
  D?:string;
  E?:string;
  F?:string;
  G?:string;
  K?:string;
  answer?:string;
  constructor(data:any) {
    this.id = data.id;
    this.quiz_id = data.quiz_id;
    this.question_ru = data.question_ru;
    this.question_kz = data.question_kz;
    this.question_en = data.question_en;
    this.A = data.A;
    this.B = data.B;
    this.C = data.C;
    this.D = data.D;
    this.E = data.E;
    this.F = data.F;
    this.G = data.G;
    this.K = data.K;
    this.answer = data.answer;

  }
}

export class Phone{
  id?:string;
  title?:string;
  phone?:string;

  constructor(data:any) {
    this.id = data.id;
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.phone = data.phone;
  }
}

export class Address{
  id?:string;
  title?:string;
  map?:string;
  constructor(data:any) {
    this.id = data.id;
    this.title = ApiServiceService.getTranslation(data,"title_");
    this.map = data.map;
  }
}
