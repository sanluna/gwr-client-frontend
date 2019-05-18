import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './products/product/product.component';
import { AuthGuard, AuthGuardInverted } from './guards/auth.guard';
import { AddEditComponent } from './products/product/add-edit/add-edit.component';
import { GroupComponent } from './products/group/group.component';
import { AddEditGroupComponent } from './products/group/editor/add-edit-group/add-edit-group.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'addeditproducts',
      component: AddEditComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'addeditgroups',
      component: AddEditGroupComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'productGroups',
      component: GroupComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'product',
      component: ProductComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuardInverted]
    },
    {
      path: 'register',
      component: RegisterComponent,
      canActivate: [AuthGuardInverted]
    },
    {
      path: '',
      component: HomeComponent
    }
])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
