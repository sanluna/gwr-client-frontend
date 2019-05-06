import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigsService, token } from '../configurations/configs.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private configService : ConfigsService, private httpclient : HttpClient) {
  }

  Get(url){
    return this.httpclient.get(url, {headers : this.baseHeaders()});
  }
  GetAuth(url){
    return this.httpclient.get(url, {headers : this.authHeaders()});
  }

  Post(url, body){
    return this.httpclient.post(url, body, {headers : this.baseHeaders()});
  }
  PostAuth(url, body){
    return this.httpclient.post(url, body, {headers : this.authHeaders()});
  }

  PostLogin(url, body){
    return this.httpclient.post(url,body, {headers:new HttpHeaders (
      {'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'application/json',
    })})
  }

  authHeaders(){
    if(this.configService.getToken()){
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'tenantId':this.configService.getConfigs().tenant,
      'Authorization':'bearer ' + this.configService.getToken().access_token
    })
  }
  }
  baseHeaders(){
    return new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':'application/json',
    'tenantId':this.configService.getConfigs().tenant
    })
  }

}
