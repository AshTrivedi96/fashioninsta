import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private service: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  error: string;
  id: string;
  product = new Product();
  ngOnInit(): void {
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


  onUpdateProduct(isValid: boolean) {
    // check form validation
    if (!isValid) {
      return;
    }
    console.log(this.product);
    this.service.updateProduct(this.product)
      .subscribe(
        (updateProductResponse) => {
          console.log(updateProductResponse);
          this.router.navigate(['product', this.product._id], { queryParams: { successMessage: 'Product updated successfully.' } });
        },
        (updateProductResponse) => {
          console.log(updateProductResponse);
          this.error = updateProductResponse.error.message;
        });
  }

}
