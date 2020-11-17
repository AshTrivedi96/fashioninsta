import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { LoginResponse } from '../login/model/login.response.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductService, private loginService: LoginService
    ) { }

cart: [];
error: string;

  ngOnInit(): void {
    let loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));

    this.service.viewCart(loginResponse.result._id)
    .subscribe(
      (response: []) => {
        console.log(response);
        this.cart = response;
      },
      (response) => {
        console.log(response);
        this.error = response.error.message;
      });
    ;
  }

}
