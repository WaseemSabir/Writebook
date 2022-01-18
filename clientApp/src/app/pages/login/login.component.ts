import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { personData } from '../../interfece';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private login: AuthService, private general : GeneralService, private router : Router) { }
  public loggedIn : boolean = false;
  username : string = '';
  password : string = '';
  isConfirmLoading : boolean = false;
  checkbox : boolean = true;
  user : personData = {
    username : "",
    first_name : "",
    last_name : ""
  };

  ngOnInit(): void {
    this.login._loggedIn.subscribe((res : boolean)=>{
      this.loggedIn = res;
    });

    this.login.user$.subscribe((res : personData)=>{
      this.user = res;
    })
  }

  submitHandler(): void {
    this.isConfirmLoading = true;
    if (!this.username.length || !this.password.length) {
      this.general.createMessage('error','Credentials Required!')
      this.isConfirmLoading = false;
      return
    }

    this.login.login(this.username, this.password).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','Login Successful!')
      this.isConfirmLoading = false;
      this.router.navigate(['/documents'])
    })
    .catch((res : any)=>{
      this.general.createMessage('error','Login Unsuccessful!')
      this.isConfirmLoading = false;
    })
  }
}
