import { Component, OnInit } from '@angular/core';
import { ProductService, product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: product[];
  productChecked: product[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.products = this.productService.fetchProducts();
    localStorage.removeItem('markedItems');
  }

  markProduct(product, id) {
    var found = false;
    for (var i = 0; i < this.productChecked.length; i++) {
      if (this.productChecked[i].id == product.id) {
        found = true;
        this.productChecked.splice(i, 1);
        document.getElementById('LC' + id).innerHTML = "unmarked";
        return;
      }
    }

    if (!found) {
      this.productChecked.push(product);
    }
    document.getElementById('LC' + id).innerHTML = "marked";
    console.log(id)
  }

  deleteProducts() {
    for (var i = 0; i < this.productChecked.length; i++) {
      this.productService.deleteProduct(this.productChecked[i]);
      console.log("deleting : " + this.productChecked[i]);
    }
    this.router.navigate(['/product']);

  }

  editProducts() {
    if (this.productChecked.length > 0) {
      localStorage.setItem('markedItems', JSON.stringify(this.productChecked));
      this.router.navigate(['/addeditproducts'])
    }
  }
  addNewProduct() {
    localStorage.removeItem('markedItems');
    this.router.navigate(['/addeditproducts'])
  }

}
