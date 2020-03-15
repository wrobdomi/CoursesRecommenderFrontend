import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { RecommendedCoursesComponent } from '../components/recommended-courses/recommended-courses.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'courses', component: SidenavComponent},
  {path: 'recommendations', component: RecommendedCoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ApproutingModule {

}
