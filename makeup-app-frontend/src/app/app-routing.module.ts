import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import {CartViewComponent} from './cart/cart-view/cart-view.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',redirectTo:'/products', pathMatch:'full' //home page redirects to products
  },
  {
    path: 'products',component:ProductListComponent
  },
  {
    path: 'cart',component:CartViewComponent
  },
  {
    path: 'products/:product_id',component:ProductDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
