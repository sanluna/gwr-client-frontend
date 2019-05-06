import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigsService } from './configurations/configs.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpService } from './http/http.service';
import { AuthGuard, AuthGuardInverted } from './guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigsService,
    HttpService,
    AuthGuard,
    AuthGuardInverted,
  {
    provide: APP_INITIALIZER,
    useFactory: configProvider,
    deps:[ConfigsService],
    multi: true 
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function configProvider(provider: ConfigsService) {
  return () => provider.loadData();
}