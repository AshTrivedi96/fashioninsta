import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/login/model/login.response.model';
import { AddToCart } from '../../product/model/add-cart.model';
import { Product } from '../../product/model/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-view-cust-product',
  templateUrl: './cust-product-view.component.html',
  styleUrls: ['./cust-product-view.component.css']
})
export class ViewCustProductComponent implements OnInit {

  constructor(private service: ProductService, private activatedRoute: ActivatedRoute) { }

  error: string;
  id: string;
  product = new Product();
  successMessage: string;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.service.getProduct(this.id)
    .subscribe(
      (productResponse: Product) => {
        console.log(productResponse);
        this.product = productResponse;
      },
      (productResponse) => {
        console.log(productResponse);
        this.error = productResponse.error.message;
      });

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
