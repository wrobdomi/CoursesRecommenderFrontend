import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { RecommendedCoursesComponent } from '../components/recommended-courses/recommended-courses.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'courses', component: SidenavComponent, canActivate: [AuthGuard]},
  {path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard]},
  {path: 'recommendations', component: RecommendedCoursesComponent, canActivate: [AuthGuard] },
  {path: 'details', component: CourseDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ApproutingModule {

}
