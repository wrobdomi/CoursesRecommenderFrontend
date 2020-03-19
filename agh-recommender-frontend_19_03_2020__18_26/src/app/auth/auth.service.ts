import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSignUp } from '../models/usersignup.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  newVistor = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

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


  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }

  emitNewUser() {
    this.newVistor.next(true);
  }

  cancelNewUser() {
    this.newVistor.next(false);
  }

}
