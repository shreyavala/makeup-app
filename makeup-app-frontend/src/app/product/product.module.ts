import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

// import angular material/flex layout components
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatSnackBarModule , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import {RouterModule, Routes} from '@angular/router';




@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule, 
    MatCardModule,
    FlexModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule, 
    RouterModule
  ]
})
export class ProductModule { }
