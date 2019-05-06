import { Injectable } from '@angular/core';
import { ConfigsService } from '../configurations/configs.service';
import { AuthService } from './auth.service';
import { HttpService } from '../http/http.service';
import { Subject, of } from 'rxjs';

export interface product {
  name : string;
  articleNumber : string;
  producerArticleNumber : string;
  description : string;
  productInfo : string;
  storageQuantity : number;
  inPrice : number;
  outPrice : number;
  outPriceCampaign : number;
  brand : string;
  productGroups : string[];
  campaign : string;
}



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = this.configService.config.productUrl;
  productsIsFetched : boolean = false;
  reFetchProducts : Date = new Date();
  products : product[];
  fetchRate : number = 60; // time between making api calls to retrieve products
  myObservable = of(this.products);
  constructor(private configService : ConfigsService, private auth : AuthService, private gwrApiService : HttpService) { }

  ngOnInit(){
    
  }

  fetchProducts(){
    if(new Date() >= (this.reFetchProducts)){
      this.productsIsFetched=false;
    if(!this.productsIsFetched){
    this.gwrApiService.Get(this.productUrl).subscribe((data : product[]) => { 
      this.products = data;
      this.productsIsFetched = true;
      var expire : number = (+this.fetchRate) + new Date().getSeconds();
      this.reFetchProducts = new Date(new Date().setSeconds((expire))); // fetch products every minute on function call
      console.log(this.reFetchProducts)
      return this.products;
    })

    }
  }
  return this.products;
  }
  updateProductList(product : product){
    this.products.push(product);
  }

  createProduct(product : product){
    this.gwrApiService.PostAuth(this.productUrl, product).subscribe((data : product) => {this.updateProductList(data)});
  }

}
