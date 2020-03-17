import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['./recommended-courses.component.css']
})
export class RecommendedCoursesComponent implements OnInit, OnDestroy {

  coursesSubscription: Subscription;
  courses: CourseModel[] = [];

  recentCourses: CourseModel[] = [];
  topRatedCourses: CourseModel[] = [];
  recommondedForYou: CourseModel[] = [];
  becauseYouLiked: CourseModel[] = [];
  likedCourse = 'Podstawy rekomendacji...';

  isLoadingRecent = true;
  isLoadingTop = true;
  isLoadingRecommended = true;
  isLoadingBeacuse = true;

  isNewUserSubscription: Subscription;
  isUserNew = false;

  constructor(private coursesService: CoursesService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.isNewUserSubscription = this.authService.newVistor.subscribe(
      res => {
        this.isUserNew = res;
        console.log('User is new: ' + this.isUserNew);
      }
    );

    this.coursesService.getCourses().subscribe(
        res => {

          this.courses = res;
          console.log(res);

          if (!this.isUserNew) {
            console.log('User is not new - showing recommendations !');
            this.recentCourses = this.courses.slice(0, 3);
            this.isLoadingRecent = false;
            console.log(this.recentCourses);

            this.topRatedCourses = this.courses.slice(3, 6);
            this.isLoadingTop = false;

            this.recommondedForYou = this.courses.slice(6, 9);
            this.isLoadingRecommended = false;

            this.becauseYouLiked = this.courses.slice(9, 12);
            this.isLoadingBeacuse = false;
          }

          if (this.isUserNew) {
            console.log('User is new, showing pop up !');
            console.log('Cancelling new user...');
            this.authService.cancelNewUser();
          }

        }
    );

  }

  ngOnDestroy() {
    this.isNewUserSubscription.unsubscribe();
  }

  onSetCategory(category: string) {
    this.coursesService.setCategory(category);
    this.router.navigate(['/courses']);
  }

}
