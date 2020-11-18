import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './modules/product/list-products/products.component';
import { AddProductComponent } from './modules/product/add-product/add-product.component';
import { ViewProductComponent } from './modules/product/view-product/view-product.component';
import { EditProductComponent } from './modules/product/edit-product/edit-product.component';
import { UsersComponent } from './modules/user/list-users/users.component';
import { CustProductsComponent } from './modules/customer/cust-products/cust-products.component';
import { ViewCustProductComponent } from './modules/customer/cust-product-view/cust-product-view.component';
import { CartComponent } from './modules/customer/cart/cart.component';
import { ViewUserComponent } from './modules/user/view-user/view-user.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { AddUserComponent } from './modules/user/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ProductsComponent,
    AddProductComponent,
    ViewProductComponent,
    EditProductComponent,
    UsersComponent,
    CustProductsComponent,
    ViewCustProductComponent,
    CartComponent,
    ViewUserComponent,
    EditUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
