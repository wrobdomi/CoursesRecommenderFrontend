import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService} from 'src/app/services/courses.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { Router } from '@angular/router';
import { CourseModel } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['./recommended-courses.component.css']
})
export class RecommendedCoursesComponent implements OnInit, OnDestroy {

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

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService,
    private ratingsService: RatingsService,
    public newUserDialog: MatDialog) { }

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
            this.openNewUserDialog();
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

  openNewUserDialog() {
    const coursesToRate = this.chooseCoursesToRate();
    const dialogRef = this.newUserDialog.open(NewUserDialogComponent, {
      data: { coursesToDisplay: coursesToRate}
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialog has been closed ! Result is ');
      console.log(result);
      this.ratingsService.saveRatings(result).subscribe(userRatings => {
        console.log('Results from ratings save: ');
        console.log(userRatings);
      });
    });
  }

  chooseCoursesToRate(): CourseModel[] {
    const coursesToRate = [];

    const elektroCourses = [];
    const infCourses = [];
    const airCourses = [];
    const biomedCourses = [];
    const mtmCourses = [];

    this.courses.map(c => {
      switch (c.category) {
        case 'Elektrotechnika': {
          elektroCourses.push(c);
          break;
        }
        case 'Automatyka i Robotyka': {
          airCourses.push(c);
          break;
        }
        case 'Inżynieria biomedyczna': {
          biomedCourses.push(c);
          break;
        }
        case 'Informatyka': {
          infCourses.push(c);
          break;
        }
        case 'Mikroelektronika': {
          mtmCourses.push(c);
          break;
        }
      }
    });


    let randomInt = Math.floor(Math.random() * elektroCourses.length);
    coursesToRate.push(elektroCourses[randomInt]);
    randomInt = Math.floor(Math.random() * airCourses.length);
    coursesToRate.push(airCourses[randomInt]);
    randomInt = Math.floor(Math.random() * biomedCourses.length);
    coursesToRate.push(biomedCourses[randomInt]);
    randomInt = Math.floor(Math.random() * infCourses.length);
    coursesToRate.push(infCourses[randomInt]);
    randomInt = Math.floor(Math.random() * mtmCourses.length);
    coursesToRate.push(mtmCourses[randomInt]);

    return coursesToRate;
  }



}
