import { Injectable } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { take, exhaustMap, tap, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getNewestCourses(courses: CourseModel[]) {
    return courses.slice(-3);
  }

  getNonPersonalizedRecommendations() {
        return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
           return this.http.get<CourseModel[]>(
             'http://localhost:8080/recommenders/nonperson',
             {
              headers: new HttpHeaders({
                'Authorization': user.authToken,
                'Accept': 'application/json'
              })
            }
          );
      })
    );
  }


  getCollaborativeRecommendation() {
      return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
           return this.http.get<CourseModel[]>(
             'http://localhost:8080/recommenders/collaborative' + '/' + user.userId,
             {
              headers: new HttpHeaders({
                'Authorization': user.authToken,
                'Accept': 'application/json'
              })
            }
          );
      })
    );
  }

}
