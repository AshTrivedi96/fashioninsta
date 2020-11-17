import { Component, OnInit } from '@angular/core';
import { Login } from './model/login.model';
import { LoginService } from './login.service';
import { LoginResponse } from './model/login.response.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();
  loginError: string;
  errorMessage: string;
  successMessage: string;
  constructor(private service: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let loginResponse = localStorage.getItem('auth');
    if (loginResponse) {
      this.router.navigate(['products']);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.errorMessage = params['errorMessage'];
      this.successMessage = params['successMessage'];
    });
  }

  onLogin() {
    console.log(this.login);
    this.errorMessage = '';
    this.successMessage = '';
    this.service.login(this.login)
      .subscribe(
        (loginResponse: LoginResponse) => {
          this.service.setUserDetails(loginResponse.result);
          localStorage.setItem('auth', JSON.stringify(loginResponse));

          if (loginResponse.result.isAdmin) {
            this.router.navigate(['products']);
          } else {
            this.router.navigate(['custProducts']);
          }
        },
        (loginResponse: LoginResponse) => {
          console.log(loginResponse);
          this.loginError = 'Incorrect email id and/or password.';
        });
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }
}
