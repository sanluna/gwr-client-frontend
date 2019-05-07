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
  frontendConfigServiceUrl = 'http://35.205.174.99/api/config/configs';

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
              resolve(true);
          })
  })
  }

  setToken(token : token){
    this.token = token;
  }
  getToken(){
    return this.token;
  }

}