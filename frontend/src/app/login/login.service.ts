import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Login } from './model/login.model';
import { LoginResponse } from './model/login.response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  backendUrl = '/api/user/';
  constructor(private http: HttpClient) {
  }
  @Output() fireIsLoggedIn: EventEmitter<LoginResponse> = new EventEmitter<LoginResponse>();

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  login(login: Login) {
    return this.http.post(this.backendUrl + 'login', login);
  }
}
