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




@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule, 
    MatCardModule,
    FlexModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ProductModule { }
