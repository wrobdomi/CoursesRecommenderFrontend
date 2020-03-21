import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CourseModel } from '../../models/course.model';
import { LecturerModel } from '../../models/lecturer.model';
import { CourseDetailsService } from '../../services/course-details.service';
import { RatingsService } from '../../services/ratings.service';
import { RatingModel } from 'src/app/models/rating.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseToDisplay: CourseModel;

  lecturers: LecturerModel[] = [];
  lecturePlan: string;
  laboratoryPlan: string;
  initialRequirements: string;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private courseDetailsService: CourseDetailsService,
    private ratingsService: RatingsService,
    public snackBarNewUser: MatSnackBar
    ) {}

  ngOnInit() {
    this.courseToDisplay = this.courseDetailsService.getCourseToDispay();
    this.courseDetailsService.getCourseInfoFromSyllabus(this.courseToDisplay.syllabusUrl).subscribe(res => {
      console.log(res.syllabus.assignments[0].assignment.module.teachers);
      // this.lecturers = res.syllabus.assignments[0].assignment.module.teachers[0].name;
      const teachersArr = res.syllabus.assignments[0].assignment.module.teachers;

      const lectureText = res.syllabus.assignments[0]
                            .assignment.module.module_activities[0]
                            .module_activity.module_classes[0]
                            .module_class.description;

      const laboratoryText = res.syllabus.assignments[0]
                            .assignment.module.module_activities[0]
                            .module_activity.module_classes[0]
                            .module_class.description;

      const initialRequirementsText = res.syllabus.assignments[0]
                            .assignment.module.prerequisites;

      for (const t of teachersArr) {
        this.lecturers.push(t.teacher);
      }
      this.lecturePlan = lectureText;
      this.laboratoryPlan = laboratoryText;
      this.initialRequirements = initialRequirementsText;

    });
  }

  onRecommendedChosen() {
    this.router.navigate(['/recommendations']);
  }

  onSetCategory(category: string) {
    this.coursesService.setCategory(category);
    this.router.navigate(['/courses']);
  }

  onCourseRating(event: any) {
    console.log('Course id is');
    console.log(this.courseToDisplay.courseId);
    const ratingModel = {
      userId: null,
      courseId: this.courseToDisplay.courseId,
      rating: event
    };
    this.ratingsService.saveSingleRating(ratingModel).subscribe(usersRatings => {
      console.log('Ratings saved.');
      this.snackBarNewUser.open('Twoja ocena została zapisana', 'Dziękuje', {
          duration: 4000
      });
    });
  }

}
