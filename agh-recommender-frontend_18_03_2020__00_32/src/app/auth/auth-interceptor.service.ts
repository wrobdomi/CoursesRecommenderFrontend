import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
        console.log('User is ');
        console.log(user.authToken);
        console.log('Hellooo');
        if (user === null) {
          console.log('Here am i');
          return next.handle(req);
        }
        const modifieqReq = req.clone({
          headers: new HttpHeaders().set('Authorization', user.authToken)
        });
        console.log('Here i am');
        return next.handle(req);
      })
    );
  }

}

