import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginResponse } from '../login/model/login.response.model';
import { Register } from './model/registration.model';
import { RegisterResponse } from './model/registration.res.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: RegistrationService,private router: Router) {
  }

  register = new Register();
  loginError: string;
  msg: string;
  isAdmin: boolean;
  ngOnInit(): void {
    const loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));
    this.isAdmin = loginResponse.result.isAdmin;
    this.register.gender = '';
  }
  onRegister(isValid: boolean) {
    // check form validation
    if (!isValid) {
      return;
    }
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

}
