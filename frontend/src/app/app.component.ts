import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Login } from './login/model/login.model';
import { LoginResponse } from './login/model/login.response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  userName: string;
  title = 'admin';
  isAdmin: boolean;

  ngOnInit(): void {
    let loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));
    if (loginResponse) {
      this.loginService.setUserDetails(loginResponse.result);
    }

    this.loginService.currentData.subscribe(currentData => {
      this.userName = currentData['first_name'];
      this.isAdmin = currentData['isAdmin'];
    });

  }

  logout(): void {
    this.loginService.setUserDetails(null);
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
    this.userName = '';
    this.isAdmin = false;
  }
}
