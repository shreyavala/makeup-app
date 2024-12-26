import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';

import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product | undefined;

  constructor(private productService:ProductService, private cartService: CartService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }


  // when component renders, display product details
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('product_id');
    if (productId){
      this.productService.getProductById(productId).subscribe(
        data => {
          this.product = data;
        }
      );
    }
  }

  // when user clicks add to cart button
  onAddToCart(product:Product) : void{
    this.cartService.addToCart(product).subscribe(response=> {
      console.log(response);
      this.snackBar.open('Item added to cart', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
