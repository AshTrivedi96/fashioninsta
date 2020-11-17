import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  error: string;
  public products: [];
  dtOptions: any = {};

  successMessage: string;
  constructor(private service: ProductService, private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if (!this.loginService.isAdmin) {
      this.router.navigate(['custProducts']);
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.successMessage = params['successMessage'];
    });
    this.loadProducts();
  }


  loadProducts() {

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

  deleteProduct(id: string) {
    const response = confirm('Do you really want to delete this product?');
    if (response) {
      this.service.deleteProduct(id)
        .subscribe(
          (response) => {
            console.log(response);
            this.successMessage = 'Product delete successfully.';
            this.loadProducts();
          },
          (response) => {
            console.log(response);
            this.error = response.error.message;
          });
    }
  }
}
