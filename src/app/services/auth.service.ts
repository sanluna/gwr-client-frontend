import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ConfigsService, configs, token } from '../configurations/configs.service';
import { User } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config : configs
  rememberMe : boolean = false;

  constructor(private gwrHttpClient : HttpService, private configService : ConfigsService, private router : Router) { 
    this.config = this.configService.getConfigs();
  }

  getUserDetails(){
    let token : token = this.configService.getToken();
    return token.GWR_username;
  }

  login(name:string, pass:string) {
    const urlRequest : String = 
      '?client_id=client&'+
      'client_secret=secret&'+
      'grant_type=password&'+
      'scope=read&'+
      'username='+name+
      '&password='+pass;
    this.gwrHttpClient.PostLogin(this.config.authUrl + 'oauth/token' + urlRequest,null)
    .subscribe((data : token) => { 
      var expire : number = (+data.expires_in) + new Date().getSeconds();
      data.expires = new Date(new Date().setSeconds((expire-10)));

      localStorage.setItem('token', JSON.stringify(data));
      localStorage.setItem('loggedIn', 'true');
      this.configService.setToken(data);
      this.router.navigate(['']) })
    ;
    
  }

  isLoggedIn(){
    if(localStorage.getItem('token')){
      let token : token = JSON.parse(localStorage.getItem('token'));
    if(new Date() >= (new Date(token.expires))){
      if(this.rememberMe){

      } else {
      this.logOut();
    }
    }
  } else if(JSON.parse(localStorage.getItem('loggedIn'))) {
    this.logOut();
    return;
  }
  return JSON.parse(localStorage.getItem('loggedIn'));
}
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('markedItems');
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/login']);
  }

}
