import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {TranslocoRootModule} from "./transloco-root.module";
import {TranslocoModule} from "@ngneat/transloco";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {FooterComponent} from "./footer/footer.component";
import {NewsComponent} from "./news/news.component";

import {MdbAccordionItemBodyDirective, MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import {NewsSingleComponent} from "./news-single/news-single.component";
import {CourseComponent} from "./course/course.component";
import {SingleCourseComponent} from "./single-course/single-course.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { YouTubePlayerModule } from "@angular/youtube-player";
import {LessonComponent} from "./lesson/lesson.component";
import {TruncateTextPipe} from "./_pipes/truncate-text.pipe";
import {AuthInterceptor} from "./auth.interceptor";
import {LoginComponent} from "./login/login.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {ProfileComponent} from "./profile/profile.component";
import {ToastrModule} from "ngx-toastr";
import {LessonStatusPipe} from "./_pipes/lesson-status.pipe";
import {QuizComponent} from "./quiz/quiz.component";
import {UserCourseComponent} from "./user-course/user-course.component";
import {UserQuizComponent} from "./user-quiz/user-quiz.component";
import {SettingComponent} from "./setting/setting.component";
import {LanguagePipe} from "./_pipes/language.pipe";
import {RegisterComponent} from "./register/register.component";
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {Route, Router} from "@angular/router";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {NgCacheRouteReuseModule} from "ng-cache-route-reuse";
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    NewsComponent,
    NewsSingleComponent,
    SingleCourseComponent,
    CourseComponent,
    LessonComponent,
    FooterComponent,
    TruncateTextPipe,
    LessonStatusPipe,
    LanguagePipe,
    LoginComponent,
    CabinetComponent,
    ProfileComponent,
    QuizComponent,
    UserCourseComponent,
    UserQuizComponent,
    SettingComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    TranslocoRootModule,
    TranslocoModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbRippleModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    YouTubePlayerModule,
    ToastrModule.forRoot(),
    ScrollToModule.forRoot(),
    NgCacheRouteReuseModule
    // TranslocoRoutingTranslateModule.forRoot({defaultLangPrefix: true}),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

  constructor() {
  }



}
