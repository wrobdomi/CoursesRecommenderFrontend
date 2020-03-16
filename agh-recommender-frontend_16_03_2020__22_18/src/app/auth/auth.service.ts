import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSignUp } from '../models/usersignup.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signup(emailValue: string, passwordValue: string) {

    return this.http.post<UserSignUp>('http://localhost:8080/users',
    {
      email: emailValue,
      password: passwordValue
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });

  }

  login(emailValue: string, passwordValue: string) {

    return this.http.post('http://localhost:8080/login',
    {
      email: emailValue,
      password: passwordValue
    },
    {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
      observe: 'response'
    }).pipe(tap( res => {
      const user = new User(res.headers.get('userId'), res.headers.get('authorization'));
      this.user.next(user);
    }));

  }

}
