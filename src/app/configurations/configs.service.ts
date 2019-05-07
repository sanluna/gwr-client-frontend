import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({'Content-Type':'application/json'});

export interface configs{
  tenant: string;
  memberUrl : string;
  tenantUrl : string;
  authUrl : string;
  productUrl : string;
}
export interface token{
  roles : string[];
  id: string;
  tenant: string;
  username: string;
  access_token: string;
  expires_in: string;
  expires: Date
  }


@Injectable({
  providedIn: 'root'
})
export class ConfigsService{
  tenant;
  config : configs;
  token : token;
  frontendConfigServiceUrl = 'http://' + window.location.hostname + '/configurator/configs';
  //frontendConfigServiceUrl = 'http://' + window.location.hostname +':10000/configs';

  constructor(private injector: Injector) { }
  ngOnInit(){
  }
  getConfigs(){
    return this.config;
  }

  loadData(){
    let http = this.injector.get(HttpClient);
    return new Promise((resolve, reject) => {
        http.get<configs>(this.frontendConfigServiceUrl, {headers: {'Content-Type':'application/json', 'tenantId':'noTenant'}})
          .subscribe(data => {
            this.tenant = data.tenant;
            this.config = data;
            this.setCorrectUrls(data);
              resolve(true);
          })
  })
  }
  setCorrectUrls(data : configs){
    this.setURL(data.memberUrl)
    data.memberUrl = 'http://' + window.location.hostname + this.setURL(data.memberUrl);
    data.authUrl = 'http://' + window.location.hostname + this.setURL(data.authUrl);
    data.tenantUrl = 'http://' + window.location.hostname + this.setURL(data.tenantUrl);
    data.productUrl = 'http://' + window.location.hostname + this.setURL(data.productUrl);
    this.config = data;
    console.log(data)
  }

  setURL(url : string){
    var URL = url.substring(7);
    return URL.substring(URL.indexOf('/'));
  }

  setToken(token : token){
    this.token = token;
  }
  getToken(){
    return this.token;
  }

}