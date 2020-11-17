import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Login } from './model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  backendUrl = '/api/admin/';
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();
  isAdmin: boolean;
  userName: string;
  userId: string;
  constructor(private http: HttpClient) {

  }

  setUserDetails(user: any) {
    console.log(user)
    if (user) {
      this.isAdmin = user.isAdmin;
      this.userName = user.first_name;
      this.userId = user._id;
      this.data.next(user);
    } else {
      this.isAdmin = false;
      this.userName = '';
      this.userId = '';
    }
  }
  users() {
    return this.http.get(this.backendUrl + 'list');
  }

  login(login: Login) {
    return this.http.post(this.backendUrl + 'login', login);
  }
}
