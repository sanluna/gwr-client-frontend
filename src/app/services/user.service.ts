import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ConfigsService } from '../configurations/configs.service';
import { Router } from '@angular/router';

export interface User{
  username : string;
  password : string;
  roles : string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private gwrHttpClient : HttpService, private configs : ConfigsService, private router : Router) { }
  createUser(user, pass){
    let body: User = 
      {
        username: user,
        password: pass,
        roles: 'admin,frontend'
      }
    this.gwrHttpClient.Post(this.configs.getConfigs().memberUrl, body)
    .subscribe(data => {
      this.router.navigate(['/login']);
    })
    ;
  }

}
