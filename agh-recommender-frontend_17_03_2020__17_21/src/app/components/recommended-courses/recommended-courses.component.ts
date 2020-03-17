import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['./recommended-courses.component.css']
})
export class RecommendedCoursesComponent implements OnInit, OnDestroy {

  coursesSubscription: Subscription;
  courses: CourseModel[] = [];

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.coursesService.getCourses();
    this.coursesSubscription = this.coursesService.coursesSubject.subscribe(
        res => {
          // console.log(res);
          this.courses = res;
        }
    );
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  onSetCategory(category: string) {
    this.coursesService.setCategory(category);
    this.router.navigate(['/courses']);
  }

}
