import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
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
    this.loginService.getEmitter().subscribe((loginResponseEmitter: LoginResponse) => {
      this.userName = loginResponseEmitter.result.first_name;
      this.isAdmin = loginResponseEmitter.result.isAdmin;
    });
    const loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));
    this.userName = loginResponse.result.first_name;
    this.isAdmin = loginResponse.result.isAdmin;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
    this.userName = '';
    this.isAdmin = false;
  }
}
