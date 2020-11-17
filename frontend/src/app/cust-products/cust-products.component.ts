import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { LoginService } from '../login/login.service';
import { LoginResponse } from '../login/model/login.response.model';
import { AddToCart } from '../products/model/add-cart.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cust-products',
  templateUrl: './cust-products.component.html',
  styleUrls: ['./cust-products.component.css']
})
export class CustProductsComponent implements OnInit {

  error: string;
  public products: [];
  dtOptions: any = {};

  successMessage: string;
  constructor(private service: ProductService, private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.service.listProducts()
      .subscribe(
        (productListResponse: []) => {
          console.log(productListResponse);
          this.products = productListResponse;
        },
        (productListResponse) => {
          console.log(productListResponse);
          this.error = productListResponse.error.message;
        });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
  }

  addToCart(productId: string) {

    let loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));
    const addToCart = new AddToCart();
    addToCart.productId = productId;
    addToCart.userId = loginResponse.result._id;
    this.service.addToCart(addToCart)
      .subscribe(
        (response: []) => {
          console.log(response);
          alert('Product Added to cart.');
        },
        (response) => {
          console.log(response);
          this.error = response.error.message;
        });
  }
}
