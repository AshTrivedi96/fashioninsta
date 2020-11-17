import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) { }
    public isAuthenticated(): boolean {
        let loginResponse = JSON.parse(localStorage.getItem('auth'));
        if (!loginResponse) {
            this.router.navigate(['login']);
        }
        console.log(moment(loginResponse['expiryTime']));
        console.log(moment());
        console.log(moment().utc().isBefore(moment(loginResponse['expiryTime'])));
        return moment().utc().isBefore(moment(loginResponse['expiryTime']));
    }

}
