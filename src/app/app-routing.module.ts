import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard, AuthGuardInverted } from './guards/auth.guard'
import { CanActivate } from '@angular/router/src/utils/preactivation';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
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
