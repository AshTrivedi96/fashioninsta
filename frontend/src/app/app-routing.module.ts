import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { UsersComponent } from './users/users.component';
import { CustProductsComponent } from './cust-products/cust-products.component';
import { ViewCustProductComponent } from './view-cust-product/view-cust-product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'register', pathMatch: 'full', component: RegistrationComponent},
  { path: 'products', pathMatch: 'full', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'custProducts', pathMatch: 'full', component: CustProductsComponent, canActivate: [AuthGuard]},
  { path: 'viewProduct/:id', pathMatch: 'full', component: ViewCustProductComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', pathMatch: 'full', component: ViewProductComponent, canActivate: [AuthGuard]},
  { path: 'editProduct/:id', pathMatch: 'full', component: EditProductComponent, canActivate: [AuthGuard]},
  { path: 'addProduct', pathMatch: 'full', component: AddProductComponent, canActivate: [AuthGuard]},
  { path: 'users', pathMatch: 'full', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'cart', pathMatch: 'full', component: CartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
