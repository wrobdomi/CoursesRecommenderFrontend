import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseModel } from 'src/app/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  categorySubscription: Subscription;
  chosenCategory = '';

  allCourses: CourseModel[] = [];
  coursesToDisplay: CourseModel[] = [];


  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.categorySubscription = this.coursesService.category.subscribe(
      res => {
        console.log('Category from service is ' + res);
        this.chosenCategory = res;
      }
    );

    this.coursesService.getCourses().subscribe(
      res => {
        this.allCourses = res;
        this.coursesToDisplay = this.allCourses
          .filter(course => course.category === this.chosenCategory);
        console.log('Courses to display are:');
        console.log(this.coursesToDisplay);
      }
    );

  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

  onSetCategory(category: string) {
    this.coursesService.setCategory(category);
    this.coursesToDisplay = this.allCourses
            .filter(course => course.category === this.chosenCategory);
    console.log('Courses to display are:');
    console.log(this.coursesToDisplay);
  }

  onRecommendedChosen() {
    this.router.navigate(['/recommendations']);
  }



}
