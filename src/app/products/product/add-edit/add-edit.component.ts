import { Component, OnInit } from '@angular/core';
import { product, ProductService } from '../../product.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  checkedProducts: product[] = [];
  productArrayForm: FormGroup;
  productFormArray: FormArray;

  constructor(private productService: ProductService, private fb: FormBuilder, private authService : AuthService, private router : Router) {
    this.productArrayForm = fb.group({
      products: fb.array([])
    });
    this.productFormArray = <FormArray>this.productArrayForm.get('products');
  }
ngOnInit() {
  if (localStorage.getItem('markedItems')) {
    this.checkedProducts = JSON.parse(localStorage.getItem('markedItems'));
    
    const productFormArray = <FormArray>this.productArrayForm.get('products');
    this.checkedProducts.forEach(product => {
      productFormArray.push(this.fb.group({
        id: [product.id],
        created : [product.created],
        createdBy : [product.createdBy],
        lastModified : [product.lastModified],
        lastModifiedBy : [product.lastModifiedBy],
        name: [product.name],
        articleNumber: [product.articleNumber],
        producerArticleNumber: [product.producerArticleNumber],
        description: [product.description],
        productInfo: [product.productInfo],
        storageQuantity: [product.storageQuantity],
        inPrice: [product.inPrice],
        outPrice: [product.outPrice],
        outPriceCampaign: [product.outPriceCampaign],
        brand: [product.brand],
        productGroups : [product.productGroups],
        campaign: [product.campaign]
      }))
    });
    this.productFormArray = productFormArray;
  }
   else {
     this.addNewProduct();
   }
}

addNewProduct(){
  this.productFormArray.push(this.fb.group({
    id: null,
    createdBy : this.authService.getUserDetails(),
    active : true,
    hidden : false,
    name : '',
    articleNumber : '',
    producerArticleNumber : '',
    productInfo : '',
    description : '',
    storageQuantity : '',
    inPrice : '',
    outPrice : '',
    outPriceCampaign : '',
    brand : '',
    productGroups : '',
    campaign : null
  }));
}

updateAndSave() {
  const updateProducts : product[] = this.productFormArray.value;
  
  updateProducts.forEach((product : product) => {
    if(product.id == null){
      this.productService.createProduct(product);
    } else {
    product.productGroups = product.productGroups.toString();
    this.productService.updateAndCreate(product);
    }
    this.router.navigate(['/product'])
  });
}
  cancelEditor(){
    this.router.navigate(['/product']);
  }
}