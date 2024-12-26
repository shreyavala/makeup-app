import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[]=[];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  // when? as soon as component renders, display cart items
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data=> {
      console.log(data);
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
  });
  }

  onDelete(product:Product): void{
    this.cartService.deleteFromCart(product).subscribe(data=>{
      console.log(data);
      this.cartItems = this.cartItems.filter(item=> item.product_id !== product.product_id);
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total=0;
    for(let item of this.cartItems){
      total += item.product_price;
    }
    return total;
  }
}
