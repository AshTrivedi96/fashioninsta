import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private service: ProductService, private router: Router) { }

  product = new Product();
  error: string;

  ngOnInit(): void {
    this.product.gender = '';
    this.product.category = '';
    this.product.images = '';
  }

  onAddProduct(isValid: boolean) {
    // check form validation
    if (!isValid) {
      return;
    }
    console.log(this.product);
    this.service.addProduct(this.product)
      .subscribe(
        (addProductResponse) => {
          console.log(addProductResponse);
          this.router.navigate(['products'], { queryParams: { successMessage: 'Product added successfully.' } });
        },
        (addProductResponse) => {
          console.log(addProductResponse);
          this.error = addProductResponse.error.message;
        });
  }


}
