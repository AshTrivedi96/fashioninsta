import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  backendUrl = '/api/admin/';
  constructor(private http: HttpClient) { }
  register(register: Register) {
    console.log(register);
    return this.http.post(this.backendUrl + 'register', register);
  }
}
