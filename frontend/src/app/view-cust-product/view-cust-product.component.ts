import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products/model/product.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-view-cust-product',
  templateUrl: './view-cust-product.component.html',
  styleUrls: ['./view-cust-product.component.css']
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
}
