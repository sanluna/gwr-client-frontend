import { Component, OnInit } from '@angular/core';
import { ConfigsService, configs } from '../configurations/configs.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tenant : string;
  config : configs;
  constructor(private configService : ConfigsService, private authService : AuthService) { }

  ngOnInit() {
    this.config = this.configService.getConfigs();
    this.tenant = this.config.tenant;
  }

  login(event){
    event.preventDefault();
    const target = event.target
    const username : string = target.querySelector('#username').value
    const password : string = target.querySelector('#password').value
    this.authService.getUserDetails((this.tenant + ':' + username), password);
  }

}
