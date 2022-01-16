import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { personData } from '../interfece'

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  constructor(private login: LoginService, private message: NzMessageService) { }
  public loggedIn : boolean = false;
  username : string = '';
  password : string = '';
  isVisible : boolean = false;
  isConfirmLoading : boolean = false;
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
      this.createMessage('error','Credentials Required!')
      this.isConfirmLoading = false;
      this.isVisible = true;
      return
    }

    this.login.login(this.username, this.password).toPromise()
    .then((res : any)=>{
      this.createMessage('success','Login Successful!')
      this.isConfirmLoading = false;
      this.isVisible = false;
      console.log(res)
    })
    .catch((res : any)=>{
      this.createMessage('error','Login Unsuccessful!')
      this.isConfirmLoading = false;
      this.isVisible = true;
    })
  }

  logoutHandler() : void {
    this.login.logout();
    this.createMessage('warning','Logged Out!')
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
