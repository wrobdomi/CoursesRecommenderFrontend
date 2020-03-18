import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { take, exhaustMap, tap, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseModel } from '../models/course.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // coursesSubject = new BehaviorSubject<CourseModel[]>([]);

  category = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private authService: AuthService) { }

  setCategory(categoryName: string) {
    this.category.next(categoryName);
  }

  getCourses() {
      // this.http.get<CourseModel[]>('http://localhost:8080/courses')
      // .subscribe(res => {
      //   console.log(res);
      //   this.coursesSubject.next(res);
      // });
      return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
           return this.http.get<CourseModel[]>(
             'http://localhost:8080/courses',
             {
              headers: new HttpHeaders({
                'Authorization': user.authToken,
                'Accept': 'application/json'
              })
            }
          );
      })
    );
    // .subscribe(res => {
    //   // console.log(res[0]);
    //   this.coursesSubject.next(res); });

  }

}
