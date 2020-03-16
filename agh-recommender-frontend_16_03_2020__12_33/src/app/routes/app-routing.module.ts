import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { RecommendedCoursesComponent } from '../components/recommended-courses/recommended-courses.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'courses', component: SidenavComponent},
  {path: 'recommendations', component: RecommendedCoursesComponent },
  {path: 'details', component: CourseDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ApproutingModule {

}
