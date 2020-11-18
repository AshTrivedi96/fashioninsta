import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/login/model/login.response.model';
import { Product } from '../../product/model/product.model';
import { ProductService } from '../../product/product.service';
import { Cart } from './model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductService, private activatedRoute: ActivatedRoute) { }

  cartProducts: Cart[];
  successMessage: string;
  error: string;
  subTotalAmount = 0;
  deliveryCharges = 40;
  totalAmount = this.deliveryCharges;

  ngOnInit(): void {
    const loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));

    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.service.viewCart(loginResponse.result._id)
      .subscribe(
        (response: []) => {
          console.log(response);
          this.cartProducts = response;
          for (const cart of this.cartProducts) {
            this.service.getProduct(cart.productId)
              .subscribe(
                (productResponse: Product) => {
                  console.log(productResponse);
                  cart.name = productResponse.name;
                  cart.category = productResponse.category;
                  cart.description = productResponse.description;
                  cart.gender = productResponse.gender;
                  cart.images = productResponse.images;
                  cart.price = productResponse.price;
                  cart.sku = productResponse.sku;
                  this.subTotalAmount += productResponse.price;
                  this.totalAmount += productResponse.price;
                },
                (productResponse) => {
                  console.log(productResponse);
                  this.error = productResponse.error.message;
                });
          }
        });

  }

  removeFromCart(id: string) {
    console.log(id);
    if (confirm('Do you want to remove this product?')) {
      this.service.removeFromCart(id)
        .subscribe(
          (response: any) => {
            console.log(response);
            alert('Product removed from the cart.');
            location.reload();
          });
    }
  }

  onCheckout() {
    const loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));
    this.service.removeAllProductsFromCart(loginResponse.result._id)
      .subscribe(
        (response: any) => {
          console.log(response);
          alert('Order placed for ' + this.cartProducts.length + ' products with $' + this.totalAmount + '.')
          location.reload();
        });
  }
}
