import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ApproutingModule } from './routes/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { RecommendedCoursesComponent } from './components/recommended-courses/recommended-courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import { NewUserCourseCardComponent } from './components/new-user-course-card/new-user-course-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    CourseCardComponent,
    RecommendedCoursesComponent,
    CourseDetailsComponent,
    NewUserDialogComponent,
    NewUserCourseCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ApproutingModule,
    FlexLayoutModule,
    FormsModule,
    BarRatingModule,
    HttpClientModule
  ],

  entryComponents: [
    NewUserDialogComponent
  ],

  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
