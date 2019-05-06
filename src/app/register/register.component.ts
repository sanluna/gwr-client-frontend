import { Component, OnInit } from '@angular/core';
import { ConfigsService } from '../configurations/configs.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  tenant : String;
  constructor(private configService : ConfigsService, private userservice : UserService) { }

  ngOnInit() {
    this.tenant = this.configService.getConfigs().tenant;
  }

register(event){
  event.preventDefault();
  const target = event.target
  const username : string = target.querySelector('#username').value
  const password : string = target.querySelector('#password').value
  this.userservice.createUser(username, password);
}

}
