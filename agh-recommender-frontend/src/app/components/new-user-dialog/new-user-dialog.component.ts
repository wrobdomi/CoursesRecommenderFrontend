import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RatingModel } from 'src/app/models/rating.model';
import { CourseModel } from 'src/app/models/course.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent implements OnInit {

  coursesToRate: CourseModel[] = [];
  actualCourse: CourseModel;
  newUsersRatings: RatingModel[] = [];
  currentUserId: string;

  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }

  ngOnInit() {
    this.coursesToRate = this.data.coursesToDisplay;
    console.log(this.coursesToRate);
    this.actualCourse = this.coursesToRate.pop();
    this.authService.user.subscribe(user => {
      this.currentUserId = user.userId;
    });
  }

  onRatingReceived(event: any) {
    // console.log(event);
    this.newUsersRatings.push({
      userId: this.currentUserId,
      courseId: this.actualCourse.courseId,
      rating: event
    });
    if (this.coursesToRate.length === 0) {
      this.dialogRef.close(this.newUsersRatings);
    } else {
      this.actualCourse = this.coursesToRate.pop();
    }
  }


}
