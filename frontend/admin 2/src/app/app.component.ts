import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  userName: string;
  title = 'admin';

  ngOnInit(): void {
    this.loginService.currentUserName$
      .subscribe(
        userName => {
          this.userName = userName;
        });
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/']);

  }
}
