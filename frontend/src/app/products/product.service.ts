import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCart } from './model/add-cart.model';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  backendUrl = '/api/admin/product/';
  constructor(private http: HttpClient) { }

  addProduct(product: Product) {
    return this.http.post(this.backendUrl + 'add', product);
  }

  updateProduct(product: Product) {
    return this.http.put(this.backendUrl + 'update/' + product._id, product);
  }

  listProducts() {
    return this.http.get(this.backendUrl + 'list');
  }

  getProduct(id) {
    return this.http.get(this.backendUrl + 'view/' + id );
  }

  deleteProduct(id) {
    return this.http.delete(this.backendUrl + id );
  }

  addToCart(addToCart: AddToCart) {
    return this.http.post(this.backendUrl + 'addToCart', addToCart);
  }

  viewCart(userId: string) {
    return this.http.get(this.backendUrl + 'cart/' + userId);
  }
}
