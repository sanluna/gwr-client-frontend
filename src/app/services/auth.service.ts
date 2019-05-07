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

  getUserDetails(name:string, pass:string){
    let body: User = 
      {
        username: name,
        password: pass,
        roles: ''
      }
    return this.login(body)
  }

  login(loginPayload:User) {
    const urlRequest : String = 
      '?client_id=client&'+
      'client_secret=secret&'+
      'grant_type=password&'+
      'scope=read&'+
      'username='+loginPayload.username+
      '&password='+loginPayload.password;
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
    return true;
  }
  return false;
}
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
