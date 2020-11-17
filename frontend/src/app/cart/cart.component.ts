import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginResponse } from '../login/model/login.response.model';
import { Product } from '../products/model/product.model';
import { ProductService } from '../products/product.service';
import { Cart } from './model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductService, private loginService: LoginService, private router: Router
    , private activatedRoute: ActivatedRoute ) { }

cartProducts: Cart[];
successMessage: string;
error: string;

  ngOnInit(): void {
    let loginResponse: LoginResponse = JSON.parse(localStorage.getItem('auth'));

    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    console.log('view cart called')
    this.service.viewCart(loginResponse.result._id)
    .subscribe(
      (response: []) => {
        console.log(response);
        this.cartProducts = response;
        for(let cart of this.cartProducts) {
          this.service.getProduct(cart['productId'])
          .subscribe(
            (response: Product) => {
              console.log(response);
              cart.name = response.name;
              cart.category = response.category;
              cart.description = response.description;
              cart.gender = response.gender;
              cart.images = response.images;
              cart.price = response.price;
              cart.sku = response.sku;
            },
            (response) => {
              console.log(response);
              this.error = response.error.message;
            });
                  }
      });
    
  }

  removeFromCart(id: string) {
    console.log(id);
    if(confirm('Do you want to remove this product?')) {
    this.service.removeFromCart(id)
    .subscribe(
      (response: any) => {
        console.log(response);
        alert('Product removed from cart;')
        location.reload();
        //this.router.navigate(['/cart'], {queryParams: {'successMessage': 'Product removed from cart.'}});
        //window.location.reload();
      });
    }
  }
    
}
