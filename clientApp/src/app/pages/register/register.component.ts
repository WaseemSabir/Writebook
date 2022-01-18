import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private login: AuthService, private router : Router, private general : GeneralService) { }
  public loggedIn : boolean = false;
  username : string = '';
  password : string = '';
  first : string = '';
  last : string = '';
  isConfirmLoading = false;
  checkbox : boolean = true;

  ngOnInit(): void {
    this.login._loggedIn.subscribe((res : boolean)=>{
      this.loggedIn = res;
    });
  }

  submitHandler(): void {
    this.isConfirmLoading = true;
    if (!this.username.length || !this.password.length || !this.first.length || !this.last.length) {
      this.general.createMessage('error','All fields required!')
      this.isConfirmLoading = false;
      return
    }

    this.login.register(this.username, this.password, this.first, this.last).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','Registration Successful!')
      this.isConfirmLoading = false;
      this.router.navigate(['/documents'])
    })
    .catch((res : any)=>{
      this.general.createMessage('error','Registration Unsuccessful!')
      this.isConfirmLoading = false;
    })
  }
}
