import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService : AuthService, private productService : ProductService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
        this.productService.fetchProducts();
    }
  }

}
