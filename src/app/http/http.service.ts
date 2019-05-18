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
    return this.httpclient.get(url, {headers : this.Headers()});
  }
  Post(url, body){
    return this.httpclient.post(url, body, {headers : this.Headers()});
  }
  Put(url, body){
    return this.httpclient.put(url, body, {headers : this.Headers()});
  }
  Delete(url, id){
    return this.httpclient.delete(url + id, {headers : this.Headers()}).subscribe(data => {console.log(data)}, error => {console.log(error)});
  }

  PostLogin(url, body){
    return this.httpclient.post(url,body, {headers:new HttpHeaders (
      {'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'application/json',
    })})
  }

  Headers(){
    if(this.configService.getToken()){
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'tenantId':this.configService.getConfigs().tenant,
      'Authorization':'Bearer ' + this.configService.getToken().access_token
    })
  } else {
    console.log("no Token");
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'tenantId':this.configService.getConfigs().tenant
      })
  }
  }

}
