import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RatingModel } from '../models/rating.model';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveRatings(ratings: RatingModel[]) {
    return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
           return this.http.post<RatingModel[]>(
             'http://localhost:8080/ratings',
              {
                ratings
              },
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


  saveSingleRating(rating: RatingModel) {
    return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
           rating.userId = user.userId;
           const ratings = [rating];
           return this.http.post<RatingModel[]>(
             'http://localhost:8080/ratings',
              {
                ratings
              },
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
