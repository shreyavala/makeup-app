import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) { }

  // get all cart items
  getCartItems(): Observable<Product[]> {
    return this.http.get<{ cart: Product[] }>(this.apiUrl).pipe(
      map((response: { cart: Product[] }) => {
        console.log(response); // Log the response for debugging
        return response.cart;
      })
    );
  }

  // add a product to the cart
  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // clear the cart
  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  // delete a product from the cart
  deleteFromCart(product: Product): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${product.product_id}`);
  }
}
