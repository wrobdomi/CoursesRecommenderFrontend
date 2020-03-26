import { Injectable } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

  private courseToDisplay: CourseModel;

  constructor(private http: HttpClient) { }

  setCourseModel(actualCourse: CourseModel) {
    this.courseToDisplay = actualCourse;
  }

  getCourseToDispay() {
    return this.courseToDisplay;
  }


  getCourseInfoFromSyllabus(url: string) {
    console.log(url);
    return this.http.get<any>(url,
             {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept-Language': 'application/json',
                'Accept': 'application/vnd.syllabus.agh.edu.pl.v2+json'
              })
    });
  }
}
