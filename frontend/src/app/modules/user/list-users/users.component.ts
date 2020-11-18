import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  error: string;
  public users: [];
  dtOptions: any = {};

  successMessage: string;
  constructor(private service: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.loadUsers();
  }

  loadUsers() {
    this.service.users()
      .subscribe(
        (userList: []) => {
          console.log(userList);
          this.users = userList;
        },
        (userList) => {
          console.log(userList);
          this.error = userList.error.message;
        });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
  }

  deleteUser(id: string) {
    const response = confirm('Do you really want to delete this user?');
    if (response) {
      this.service.deleteUser(id)
        .subscribe(
          (response) => {
            console.log(response);
            this.successMessage = 'User delete successfully.';
            this.loadUsers();
          },
          (response) => {
            console.log(response);
            this.error = response.error.message;
          });
    }
  }
}
