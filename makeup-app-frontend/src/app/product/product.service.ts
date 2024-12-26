import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + '/products';

  constructor(private http:HttpClient) { }

  // get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map((response: { products: Product[] }) => {
        console.log(response); // Log the response for debugging
        return response.products;
      })
    );
  }

  // get product by id
  getProductById(id: string): Observable<Product> {
    return this.http.get<{ product: Product }>(`${this.apiUrl}/${id}`).pipe(
      map((response: { product: Product }) => {
        console.log(response); // Log the response for debugging
        return response.product;
      })
    );
  }
}
