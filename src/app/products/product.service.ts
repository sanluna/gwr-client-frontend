import { Injectable } from '@angular/core';
import { ConfigsService } from '../configurations/configs.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../http/http.service';
import { of } from 'rxjs';

export interface product {
  id: string;
  name: string;
  articleNumber: string;
  producerArticleNumber: string;
  description: string;
  productInfo: string;
  storageQuantity: number;
  inPrice: number;
  outPrice: number;
  outPriceCampaign: number;
  brand: string;
  productGroups: string;
  campaign: productCampaign;
  active: boolean;
  hidden: boolean;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
}
export interface productCampaign {
  id: string;
  campaignName: string;
  expireDate: string;
  percentageOff: number;
  sumOff: number;
  buyX: number;
  forY: number;
}
export interface productGroup {
  id: string;
  groupName: string;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = this.configService.config.productUrl;
  productGroupUrl = this.configService.config.productGroupUrl;

  productsIsFetched: boolean = false;
  reFetchProducts: Date = new Date();
  products: product[];

  productGroupsIsFetched: boolean = false;
  reFetchProductGroups: Date = new Date();
  productGroups: productGroup[];

  fetchRate: number = 5; // time between making api calls to retrieve objects

  constructor(private configService: ConfigsService, private auth: AuthService, private gwrApiService: HttpService) { }

  ngOnInit() {

  }

  fetchProducts() {
    if (new Date() >= (this.reFetchProducts)) {
      this.productsIsFetched = false;
      if (!this.productsIsFetched) {
        this.gwrApiService.Get(this.productUrl).subscribe((data: product[]) => {
          this.products = data;
          this.productsIsFetched = true;
          localStorage.setItem('products', JSON.stringify(data));
          var expire: number = (+this.fetchRate) + new Date().getSeconds();
          this.reFetchProducts = new Date(new Date().setSeconds((expire))); // fetch products every minute on function call
          console.log(this.products);
          return JSON.parse(localStorage.getItem('products'));
        })

      }
    }
    return JSON.parse(localStorage.getItem('products'));
  }

  updateProductList(product: product, update: boolean) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == product.id) {
        this.products.splice(i, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
        if (!update) {
          return;
        }
        break;
      }
    }
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  createProduct(product: product) {
    this.gwrApiService.Post(this.productUrl, product).subscribe((data: product) => { this.updateProductList(data, false) });
  }
  updateAndCreate(product: product) {
    this.gwrApiService.Put(this.productUrl, product).subscribe((data: product) => { this.updateProductList(data, true) });
  }
  deleteProduct(product: product) {
    this.gwrApiService.Delete(this.productUrl, product.id);
    this.updateProductList(product, false)
    console.log("deleted : " + product);
  }

  fetchProductGroups() {
    if (!this.productGroupsIsFetched) {
      this.gwrApiService.Get(this.productGroupUrl).subscribe((data: productGroup[]) => {
        this.productGroups = data;
        this.productGroupsIsFetched = true;
        localStorage.setItem('productGroups', JSON.stringify(data));
        var expire: number = (+this.fetchRate) + new Date().getSeconds();
        this.reFetchProductGroups = new Date(new Date().setSeconds((expire))); // fetch products every minute on function call
        console.log(this.productGroups);
        return JSON.parse(localStorage.getItem('productGroups'));
      })

    }
    return JSON.parse(localStorage.getItem('productGroups'));
  }


  updateProductGroupList(productGroup: productGroup, update: boolean) {
    for (var i = 0; i < this.productGroups.length; i++) {
      if (this.productGroups[i].id == productGroup.id) {
        this.productGroups.splice(i, 1);
        localStorage.setItem('productGroups', JSON.stringify(this.productGroups));
        if (!update) {
          return;
        }
        break;
      }
    }
    this.productGroups.push(productGroup);
    localStorage.setItem('productGroups', JSON.stringify(this.productGroups));
  }

  createProductGroup(productGroup: productGroup) {
    this.gwrApiService.Post(this.productGroupUrl, productGroup).subscribe((data: productGroup) => { this.updateProductGroupList(data, false) });
  }
  updateAndCreateProductGroup(productGroup: productGroup) {
    if (productGroup.id == null) {
      this.gwrApiService.Post(this.productGroupUrl, productGroup).subscribe((data: productGroup) => { this.updateProductGroupList(data, false) });
    } else {
      this.gwrApiService.Put(this.productGroupUrl, productGroup).subscribe((data: productGroup) => { this.updateProductGroupList(data, true) });
    }
  }
  deleteProductGroup(productGroup: productGroup) {
    this.gwrApiService.Delete(this.productGroupUrl, productGroup.id);
    this.updateProductGroupList(productGroup, false)
    console.log("deleted : " + productGroup);
  }

}
