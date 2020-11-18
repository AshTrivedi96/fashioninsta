import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/registration/model/registration.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  error: string;
  id: string;
  user = new Register();
  ngOnInit(): void {
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


  onUpdateUser(isValid: boolean) {
    // check form validation
    if (!isValid) {
      return;
    }
    console.log(this.user);
    this.service.updateUser(this.user)
      .subscribe(
        (updateUserResponse) => {
          console.log(updateUserResponse);
          this.router.navigate(['user', this.user._id], { queryParams: { successMessage: 'User updated successfully.' } });
        },
        (updateUserResponse) => {
          console.log(updateUserResponse);
          this.error = updateUserResponse.error.message;
        });
  }

}
