import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginError = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // console.log(form.value.email);
    // console.log(form.value.password);
    this.isLoading = true;

    this.authService.login(form.value.email, form.value.password).subscribe(
      (resp) => {
        this.isLoading = false;
        this.router.navigate(['/recommendations']);
      },
      error => {
          this.loginError = 'Login error ocurred !';
      }
    );
  }

}
