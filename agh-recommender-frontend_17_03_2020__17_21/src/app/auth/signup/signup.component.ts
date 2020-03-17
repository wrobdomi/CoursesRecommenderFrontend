import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  signupError = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.signup(email, password).subscribe(
      resData => {
      // console.log(resData);
      this.authService.login(email, password).subscribe(
        (loginData: any) => {
          // console.log(loginData.headers.get('authorization'));
          // console.log(loginData.headers.get('userId'));
          this.isLoading = false;
          this.router.navigate(['/recommendations']);
        },
        loginError => {
          console.log('Login error');
        });

    }, error => {
      this.signupError = 'Signup error ocurred !';
      console.log(error);
    });

    // form.reset();
  }

}
