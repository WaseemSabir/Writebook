import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  public title : string = "WriteBook";
  public appURL : string = environment.appURL;

  loggedIn : boolean = false;

  constructor (private login : LoginService) {
    this.login.checkUser();
  }
}
