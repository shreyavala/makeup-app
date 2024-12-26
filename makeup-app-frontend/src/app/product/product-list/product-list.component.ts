import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[] = [];
  filteredProducts:Product[] = [];
  sortOrder:string="";

  constructor(private productService:ProductService, private cartService: CartService, private snackBar: MatSnackBar) {}

  // when? as soon as component renders, display product list
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=> {
      this.products = data;
      this.filteredProducts = data;
  });
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

  // when user searches for a product (filtering)
  applyFilter(event:Event): void{
    let searchValue = (event.target as HTMLInputElement).value; // read value from entire input field
    searchValue= searchValue.trim();
    searchValue = searchValue.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.product_name.toLowerCase().includes(searchValue) || product.product_brand.toLowerCase().includes(searchValue)
    )

    this.applySort(this.sortOrder);

  }

  // when user wants to sort products
  applySort(sortValue: string): void{
    this.sortOrder = sortValue;
    if(this.sortOrder === 'low-to-high'){
      this.filteredProducts = this.filteredProducts.sort((a,b)=> a.product_price - b.product_price);
    }
    else if(this.sortOrder === 'high-to-low'){
      this.filteredProducts = this.filteredProducts.sort((a,b)=> b.product_price - a.product_price);
    }
  }




}
