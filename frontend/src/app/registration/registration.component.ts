import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Register } from './model/registration.model';
import { RegisterResponse } from './model/registration.res.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: RegistrationService, private loginService: LoginService, private router: Router) {
    this.loginService.currentData.subscribe(currentData => this.isAdmin = currentData['isAdmin'])
  }

  register = new Register();
  loginError: string;
  msg: string;
  ngOnInit(): void {
    this.register.gender = '';
  }

  isAdmin = this.loginService.isAdmin;
  onRegister() {
    console.log(this.register);
    this.service.register(this.register)
      .subscribe(
        (registerResponse: RegisterResponse) => {
          this.router.navigate(['login'], { queryParams: { successMessage: 'Account created successfully. You can login now.' } });
        },
        (registerResponse) => {
          console.log(registerResponse);
          this.loginError = registerResponse.error.message;
        });
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onRegister();
    }
  }
}
