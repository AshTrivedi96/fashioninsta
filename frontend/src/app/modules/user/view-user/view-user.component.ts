import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Register } from 'src/app/registration/model/registration.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private service: UserService, private activatedRoute: ActivatedRoute) { }

  error: string;
  id: string;
  user = new Register();
  successMessage: string;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.service.userById(this.id)
    .subscribe(
      (userResponse: Register) => {
        console.log(userResponse);
        this.user = userResponse;
      },
      (userResponse) => {
        console.log(userResponse);
        this.error = userResponse.error.message;
      });

  }
}
