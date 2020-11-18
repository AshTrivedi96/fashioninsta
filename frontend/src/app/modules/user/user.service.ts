import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/registration/model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendUrl = '/api/user/';
  constructor(private http: HttpClient) {
  }

  users() {
    return this.http.get(this.backendUrl);
  }

  deleteUser(id) {
    return this.http.delete(this.backendUrl + id);
  }

  userById(id) {
    return this.http.get(this.backendUrl + id);
  }

  updateUser(user: Register) {
    return this.http.put(this.backendUrl + user._id, user);
  }
}
