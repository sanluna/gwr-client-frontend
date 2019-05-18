import { Component, OnInit } from '@angular/core';
import { productGroup, ProductService } from '../../../product.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.css']
})
export class AddEditGroupComponent implements OnInit {

  checkedProductGroups: productGroup[] = [];
  productGroupArrayForm: FormGroup;
  productGroupFormArray: FormArray;

  constructor(private productService: ProductService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.productGroupArrayForm = fb.group({
      productGroups: fb.array([])
    });
    this.productGroupFormArray = <FormArray>this.productGroupArrayForm.get('productGroups');
  }
  ngOnInit() {
    if (localStorage.getItem('markedItems')) {
      this.checkedProductGroups = JSON.parse(localStorage.getItem('markedItems'));

      const productGroupArrayForm = <FormArray>this.productGroupArrayForm.get('productGroups');
      this.checkedProductGroups.forEach(productGroup => {
        productGroupArrayForm.push(this.fb.group({
          id: [productGroup.id],
          created: [productGroup.created],
          createdBy: [productGroup.createdBy],
          lastModified: [productGroup.lastModified],
          lastModifiedBy: [productGroup.lastModifiedBy],
          groupName: [productGroup.groupName],
        }))
      });
      this.productGroupFormArray = productGroupArrayForm;
    }
    else {
      this.addNewProductGroup();
    }
  }

  addNewProductGroup() {
    this.productGroupFormArray.push(this.fb.group({
      id: null,
      createdBy: this.authService.getUserDetails(),
      active: true,
      hidden: false,
      groupName: '',
    }));
  }

  updateAndSave() {
    const updateProductGroups: productGroup[] = this.productGroupFormArray.value;
    updateProductGroups.forEach((productGroup: productGroup) => {
      this.productService.updateAndCreateProductGroup(productGroup);
    });
    this.router.navigate(['/productGroups']);
  }
  cancelEditor() {
    this.router.navigate(['/productGroups']);
  }
}
