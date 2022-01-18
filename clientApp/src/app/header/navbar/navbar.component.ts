import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { GeneralService } from 'src/app/general.service';
import { personData } from '../../interfece';
import { environment } from 'src/environments/environment';
import { DocumentApiService } from 'src/app/document-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appURL : string = environment.appURL
  public loggedIn : boolean = false;
  public userData : personData = {
    username : "",
    first_name : "",
    last_name : ""
  }
  public documents : any[] = []

  constructor(private auth : AuthService, private general : GeneralService, private router : Router, private document : DocumentApiService) {
    this.auth.checkUser()
  }

  ngOnInit(): void {
    this.auth.loggedIn$.subscribe((logged : boolean)=>{
      this.loggedIn = logged;
    })

    this.auth.user$.subscribe((data : personData)=>{
      this.userData = data;
    })

    this.document.getDocumentList().toPromise()
    .then((res : any)=>{
      this.documents = res;
      console.log(res)
    })
  }

  logoutHandler() : void {
    this.auth.logout();
    this.general.createMessage('warning','Logged Out!')
    this.router.navigate(['/'])
  }

  docClick(docId : number) {
    this.router.navigate(['/document',docId])
  }
}
