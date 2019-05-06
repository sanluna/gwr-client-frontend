import { Component, OnInit } from '@angular/core';
import { ProductService, product } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : product[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.products = this.productService.fetchProducts();
  }

}
