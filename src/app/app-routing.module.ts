import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./news/news.component";
import {NewsSingleComponent} from "./news-single/news-single.component";
import {CourseComponent} from "./course/course.component";
import {SingleCourseComponent} from "./single-course/single-course.component";
import {ErrorComponent} from "./error/error.component";
import {LessonComponent} from "./lesson/lesson.component";
import {LoginComponent} from "./login/login.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {AuthenticatedGuard} from "./_guards/authenticated.guard";
import {GuestGuard} from "./_guards/guest.guard";
import {ProfileComponent} from "./profile/profile.component";
import {QuizComponent} from "./quiz/quiz.component";
import {UserCourseComponent} from "./user-course/user-course.component";
import {UserQuizComponent} from "./user-quiz/user-quiz.component";
import {SettingComponent} from "./setting/setting.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"news",component:NewsComponent},
  {path:'news/:alias',component: NewsSingleComponent,},
  {path:"course",component:CourseComponent},
  {path:"course-single/:alias",component:SingleCourseComponent,canActivate:[AuthenticatedGuard]},
  {path:"lesson/:alias",component:LessonComponent,canActivate:[AuthenticatedGuard]},
  {path:"quiz/:id",component:QuizComponent,canActivate:[AuthenticatedGuard]},
  //Guest
  {path:"login",component:LoginComponent,canActivate:[GuestGuard]},
  {path:"register",component:RegisterComponent,canActivate:[GuestGuard]},
  //Authenticated
  {path:"cabinet",component:CabinetComponent,
    canActivate:[AuthenticatedGuard],
    canActivateChild:[AuthenticatedGuard],
      children:[
        {path:"profile",component:ProfileComponent},
        {path:"my-course",component:UserCourseComponent},
        {path:"my-quiz",component:UserQuizComponent},
        {path:"setting",component:SettingComponent}
      ]
  },
  {path:"**",component:ErrorComponent}

];
const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};
@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
