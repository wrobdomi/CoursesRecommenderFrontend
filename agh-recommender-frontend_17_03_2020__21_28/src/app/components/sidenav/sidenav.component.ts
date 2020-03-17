import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CourseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  categorySubscription: Subscription;
  chosenCategory = '';

  coursesSubcription: Subscription;
  allCourses: CourseModel[] = [];
  coursesToDisplay: CourseModel[] = [];

  baseMinImageUrl = '../../../assets/images/';
  minImageUrlMap = new Map([
    ['Automatyka i Robotyka', 'air_icon.png'],
    ['Elektrotechnika', 'electro_icon.jpg'],
    ['Informatyka', 'inf_icon.png'],
    ['Mikroelektronika', 'micro_icon.png'],
    ['Inżynieria biomedyczna', 'biomed_icon.png']
  ]);
  fullMinUrl = '';


  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.categorySubscription = this.coursesService.category.subscribe(
      res => {
        console.log('Category from service is ' + res);
        this.chosenCategory = res;
        this.fullMinUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.chosenCategory);
        console.log(this.fullMinUrl);
      }
    );

    this.coursesSubcription = this.coursesService.coursesSubject.subscribe(
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
    this.coursesSubcription.unsubscribe();
  }

  onSetCategory(category: string) {
    this.coursesService.setCategory(category);
    this.coursesToDisplay = this.allCourses
            .filter(course => course.category === this.chosenCategory);
    console.log('Courses to display are:');
    console.log(this.coursesToDisplay);
    this.fullMinUrl = this.baseMinImageUrl + this.minImageUrlMap.get(this.chosenCategory);
    console.log(this.fullMinUrl);
  }



}
