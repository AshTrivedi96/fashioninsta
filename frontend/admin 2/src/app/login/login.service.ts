import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from './model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  backendUrl = '/api/admin/';
  constructor(private http: HttpClient) { }
  private currentUserNameStore = new BehaviorSubject<string>("");

  public currentUserName$ = this.currentUserNameStore.asObservable();

  // Setter to update UserName
  setCurrentUserName(userName: string) {
    this.currentUserNameStore.next(userName);
  }
  login(login: Login) {
      console.log(this.backendUrl + 'login')
    return this.http.post(this.backendUrl + 'login', login);
  }
}
