import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './modules/customer/cart/cart.component';
import { ViewCustProductComponent } from './modules/customer/cust-product-view/cust-product-view.component';
import { CustProductsComponent } from './modules/customer/cust-products/cust-products.component';
import { AddProductComponent } from './modules/product/add-product/add-product.component';
import { EditProductComponent } from './modules/product/edit-product/edit-product.component';
import { ProductsComponent } from './modules/product/list-products/products.component';
import { ViewProductComponent } from './modules/product/view-product/view-product.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { UsersComponent } from './modules/user/list-users/users.component';
import { ViewUserComponent } from './modules/user/view-user/view-user.component';
import { RegistrationComponent } from './registration/registration.component';

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
  { path: 'user/:id', pathMatch: 'full', component: ViewUserComponent, canActivate: [AuthGuard]},
  { path: 'editUser/:id', pathMatch: 'full', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'cart', pathMatch: 'full', component: CartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
