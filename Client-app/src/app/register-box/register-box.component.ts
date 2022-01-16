import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register-box',
  templateUrl: './register-box.component.html',
  styleUrls: ['./register-box.component.css']
})
export class RegisterBoxComponent implements OnInit {

  constructor(private login: LoginService, private message: NzMessageService) { }
  public loggedIn : boolean = false;
  username : string = '';
  password : string = '';
  first : string = '';
  last : string = '';
  isVisible : boolean = false;
  isConfirmLoading = false;

  ngOnInit(): void {

    this.login._loggedIn.subscribe((res : boolean)=>{
      this.loggedIn = res;
    });
  }

  submitHandler(): void {
    this.isConfirmLoading = true;
    if (!this.username.length || !this.password.length || !this.first.length || !this.last.length) {
      this.createMessage('error','All fields required!')
      this.isConfirmLoading = false;
      this.isVisible = true;
      return
    }

    this.login.register(this.username, this.password, this.first, this.last).toPromise()
    .then((res : any)=>{
      this.createMessage('success','Registration Successful!')
      this.isConfirmLoading = false;
      this.isVisible = false;
    })
    .catch((res : any)=>{
      this.createMessage('error','Registration Unsuccessful!')
      this.isConfirmLoading = false;
      this.isVisible = true;
    })
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
