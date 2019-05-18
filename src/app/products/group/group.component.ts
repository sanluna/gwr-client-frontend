import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { ProductService, productGroup } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  productGroups: productGroup[];
  productGroupsChecked: productGroup[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productGroups = this.productService.fetchProductGroups();
    console.log(this.productGroups);
    localStorage.removeItem('markedItems');
  }

  markProductGroup(productGroup, id) {
    var found = false;
    for (var i = 0; i < this.productGroupsChecked.length; i++) {
      if (this.productGroupsChecked[i].id == productGroup.id) {
        found = true;
        this.productGroupsChecked.splice(i, 1);
        document.getElementById('LCPG' + id).innerHTML = "unmarked";
        return;
      }
    }

    if (!found) {
      this.productGroupsChecked.push(productGroup);
    }
    document.getElementById('LCPG' + id).innerHTML = "marked";
    console.log(id)
  }

  deleteProductGroup() {
    for (var i = 0; i < this.productGroupsChecked.length; i++) {
      this.productService.deleteProductGroup(this.productGroupsChecked[i]);
      console.log("deleting : " + this.productGroupsChecked[i]);
    }
    this.router.navigate(['/productGroups']);
  }

  editProductGroup() {
    if (this.productGroupsChecked.length > 0) {
      localStorage.setItem('markedItems', JSON.stringify(this.productGroupsChecked));
      this.router.navigate(['/addeditgroups'])
    }
  }
  addNewProductGroup() {
    localStorage.removeItem('markedItems');
    this.router.navigate(['/addeditgroups'])
  }
}
