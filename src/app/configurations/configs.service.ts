import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

export interface configs {
  tenant: string;
  memberUrl: string;
  tenantUrl: string;
  authUrl: string;
  productUrl: string;
  productCampaignUrl: string;
  productGroupUrl: string;
  productReviewUrl: string;
}
export interface token {
  GWR_ROLES: string[];
  GWR_id: string;
  GWR_tenant: string;
  GWR_username: string;
  access_token: string;
  expires_in: string;
  expires: Date
}


@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  tenant;
  config: configs;
  frontendConfigServiceUrl = 'http://' + window.location.hostname + '/configurator/configs';
  //frontendConfigServiceUrl = 'http://' + window.location.hostname + ':10000/configs';

  constructor(private injector: Injector) { }
  ngOnInit() {
  }
  getConfigs() {
    return this.config;
  }

  loadData() {
    let http = this.injector.get(HttpClient);
    return new Promise((resolve, reject) => {
      http.get<configs>(this.frontendConfigServiceUrl, { headers: { 'Content-Type': 'application/json', 'tenantId': 'noTenant' } })
        .subscribe(data => {
          this.tenant = data.tenant;
          //this.config = data;
          this.setCorrectUrls(data);
          resolve(true);
        })
    })
  }
  setCorrectUrls(data: configs) {
    this.setURL(data.memberUrl)
    data.memberUrl = 'http://' + window.location.hostname + this.setURL(data.memberUrl);
    data.authUrl = 'http://' + window.location.hostname + this.setURL(data.authUrl);
    data.tenantUrl = 'http://' + window.location.hostname + this.setURL(data.tenantUrl);
    data.productUrl = 'http://' + window.location.hostname + this.setURL(data.productUrl);
    data.productCampaignUrl = 'http://' + window.location.hostname + this.setURL(data.productCampaignUrl);
    data.productGroupUrl = 'http://' + window.location.hostname + this.setURL(data.productGroupUrl);
    data.productReviewUrl = 'http://' + window.location.hostname + this.setURL(data.productReviewUrl);
    this.config = data;
    console.log(data)
  }

  setURL(url: string) {
    var URL = url.substring(7);
    return URL.substring(URL.indexOf('/'));
  }

  setToken(token: token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

}