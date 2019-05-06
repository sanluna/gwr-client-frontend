import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConfigsService } from '../configurations/configs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tenant : string;

  constructor(private auth : AuthService, private configService : ConfigsService) { }

  ngOnInit() {
   this.tenant = this.configService.getConfigs().tenant;
  }

  logout(){
    this.auth.logOut();
  }
  getLogedin(){
    return this.auth.isLoggedIn();
  }
}
